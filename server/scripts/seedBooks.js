const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
// load environment variables from server/.env so Prisma can read DATABASE_URL
dotenv.config({ path: require('path').resolve(__dirname, '..', '.env') });
const { prisma } = require('../src/prisma');

async function loadBooksArray() {
  const srcPath = path.resolve(__dirname, '..', '..', 'web', 'src', 'data', 'books', 'BooksData.js');
  if (!fs.existsSync(srcPath)) throw new Error('BooksData.js not found at ' + srcPath);

  const raw = fs.readFileSync(srcPath, 'utf8');

  // Replace ES import line(s) and export default so CommonJS can require it
  const replaced = raw
    .replace(/import\s+.*?;\s*/g, 'const QubitBookData = {};\n')
    .replace(/export\s+default\s+books\s*;?/g, 'module.exports = books;');

  const tmpPath = path.resolve(__dirname, '.tmp_books_data.cjs');
  fs.writeFileSync(tmpPath, replaced, 'utf8');

  // require the temp file to get the books array
  const books = require(tmpPath);

  // cleanup
  try { fs.unlinkSync(tmpPath); } catch (e) { /* ignore */ }

  if (!Array.isArray(books)) throw new Error('Books data not an array');
  return books;
}

function slugify(s) {
  if (!s) return null;
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function upsertLanguage(name) {
  if (!name) name = 'Unknown';
  const code = name.toLowerCase().replace(/\s+/g, '_').slice(0, 10);
  let lang = await prisma.language.findUnique({ where: { code } });
  if (!lang) {
    // compute a new language_id because the languages table doesn't auto-increment
    const agg = await prisma.language.aggregate({ _max: { language_id: true } });
    const nextId = (agg._max.language_id || 0) + 1;
    lang = await prisma.language.create({ data: { language_id: nextId, code, english_name: name, native_name: name } });
  }
  return lang;
}

async function findOrCreateAuthor(name) {
  if (!name) name = 'Unknown';
  let a = await prisma.author.findFirst({ where: { author_name: name } });
  if (!a) {
    a = await prisma.author.create({ data: { author_name: name } });
  }
  return a;
}

async function findOrCreatePublisher(name) {
  if (!name) return null;
  let p = await prisma.publisher.findFirst({ where: { publisher_name: name } });
  if (!p) {
    p = await prisma.publisher.create({ data: { publisher_name: name } });
  }
  return p;
}

async function findOrCreateCategory(name, language) {
  if (!name) return null;
  let c = await prisma.category.findFirst({ where: { slug: slugify(name) } });
  if (!c) {
    c = await prisma.category.create({ data: { slug: slugify(name) } });
    // create translation entry
    if (language) {
      await prisma.categoryTranslation.create({ data: { category_id: c.category_id, language_id: language.language_id, name } });
    }
  }
  return c;
}

async function seed() {
  const books = await loadBooksArray();
  console.log('Found', books.length, 'books to import');

  for (const b of books) {
    try {
      const title = b.title || b.name || 'Untitled';
      const slug = b.slug || slugify(title) || null;
      const authorName = b.author || (b.authors && b.authors[0]) || 'Unknown';
      const publisherName = b.publisher || null;
      const languageName = b.language || 'English';

      const language = await upsertLanguage(languageName);
      const author = await findOrCreateAuthor(authorName);
      const publisher = await findOrCreatePublisher(publisherName);
      const category = await findOrCreateCategory(b.category || b.categoryName || null, language);

      // check existing by slug first
      let existing = null;
      if (slug) existing = await prisma.book.findUnique({ where: { slug } }).catch(()=>null);
      if (!existing) {
        // fallback: match by title + author
        existing = await prisma.book.findFirst({ where: { title, author_id: author.author_id } }).catch(()=>null);
      }

      if (existing) {
        // update minimal fields
        await prisma.book.update({ where: { book_id: existing.book_id }, data: {
          subtitle: b.subtitle || existing.subtitle,
          publication_year: b.published ? parseInt(b.published, 10) || existing.publication_year : existing.publication_year,
          publication_date: b.published ? new Date(b.published) : existing.publication_date,
          edition: b.edition || existing.edition,
          isbn_10: b.isbn || b.isbn10 || existing.isbn_10,
          isbn_13: b.isbn13 || b.isbn || existing.isbn_13,
          summary: b.summary || existing.summary,
          key_highlights: Array.isArray(b.keyPoints) ? b.keyPoints.join('\n') : (b.keyPoints || existing.key_highlights),
          page_count: b.pageCount || existing.page_count,
          cover_image_url: b.imageUrl || existing.cover_image_url,
        }});
        console.log('Updated', title);
        continue;
      }

      // create book
      // validate publication date
      const pubDateRaw = b.published || b.publish_date || null;
      let pubDate = null;
      if (pubDateRaw) {
        const d = new Date(pubDateRaw);
        if (!isNaN(d.getTime())) pubDate = d;
      }

      const created = await prisma.book.create({ data: {
        title,
        subtitle: b.subtitle || null,
        slug: slug,
        author_id: BigInt(author.author_id),
        publisher_id: publisher ? BigInt(publisher.publisher_id) : undefined,
        original_language_id: language.language_id,
        publication_year: b.published ? (parseInt(b.published, 10) || null) : null,
        publication_date: pubDate,
        edition: b.edition || null,
        isbn_10: b.isbn || b.isbn10 || null,
        isbn_13: b.isbn13 || b.isbn || null,
        summary: b.summary || b.description || null,
        key_highlights: Array.isArray(b.keyPoints) ? b.keyPoints.join('\n') : (b.keyPoints || null),
        table_of_contents: null,
        page_count: b.pageCount || null,
        cover_image_url: b.imageUrl || null,
        average_rating: b.rating || null,
        review_count: b.ratingCount || b.review_count || null,
        meta_title: null,
        meta_description: null,
      }});

      // publication detail
      await prisma.bookPublicationDetail.create({ data: {
        book_id: created.book_id,
        isbn_10: b.isbn || null,
        isbn_13: b.isbn || null,
        edition: b.edition || null,
        publication_date: pubDate,
        pages: b.pageCount || null,
        format: b.format || null,
      }});

      // translation (seed same language)
      await prisma.bookTranslation.create({ data: {
        book_id: created.book_id,
        language_id: language.language_id,
        title: title,
        subtitle: b.subtitle || null,
        slug: slug || title,
        summary: b.summary || b.description || null,
      }});

      // categories
      if (category) {
        await prisma.bookCategory.create({ data: { book_id: created.book_id, category_id: category.category_id } }).catch(()=>{});
      }

      console.log('Inserted', title);
    } catch (err) {
      console.error('Error importing book', b?.title || b?.id, err.message || err);
    }
  }

  console.log('Seeding complete');
}

seed()
  .then(() => process.exit(0))
  .catch((err) => { console.error(err); process.exit(1); });
