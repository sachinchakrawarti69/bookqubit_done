const { Router } = require("express");
const { prisma } = require("../prisma");
const { serializeValue } = require("../utils/serialize");

const router = Router();

const bookInclude = {
  author: true,
  publisher: true,
  originalLanguage: true,
  translations: {
    include: {
      language: true,
    },
  },
  publicationDetails: true,
  languages: {
    include: {
      language: true,
    },
  },
  categories: {
    include: {
      category: {
        include: {
          translations: {
            include: {
              language: true,
            },
          },
        },
      },
    },
  },
};

function getPrimaryCategory(book) {
  const category = book.categories?.[0]?.category;
  return category?.slug || category?.translations?.[0]?.name || null;
}

function toClientBook(book) {
  const publicationDetails = book.publicationDetails?.[0] || null;
  const translation = book.translations?.[0] || null;

  return serializeValue({
    id: book.book_id,
    title: translation?.title || book.title,
    subtitle: translation?.subtitle || book.subtitle,
    slug: translation?.slug || book.slug,
    author: book.author?.author_name || null,
    publisher: book.publisher?.publisher_name || null,
    language: book.originalLanguage?.english_name || null,
    languageCode: book.originalLanguage?.code || null,
    description: translation?.summary || book.summary || null,
    keyPoints: translation?.key_highlights || book.key_highlights || null,
    subjects: translation?.subjects_covered || null,
    category: getPrimaryCategory(book),
    isbn: publicationDetails?.isbn_13 || publicationDetails?.isbn_10 || book.isbn_13 || book.isbn_10 || null,
    isbn10: publicationDetails?.isbn_10 || book.isbn_10 || null,
    isbn13: publicationDetails?.isbn_13 || book.isbn_13 || null,
    edition: publicationDetails?.edition || book.edition || null,
    publicationDate: publicationDetails?.publication_date || book.publication_date || null,
    pageCount: publicationDetails?.pages || book.page_count || null,
    coverImage: book.cover_image_url || null,
    averageRating: book.average_rating ?? null,
    ratingCount: book.review_count ?? null,
    metaTitle: translation?.seo_title || book.meta_title || null,
    metaDescription: translation?.seo_description || book.meta_description || null,
    createdAt: book.created_at,
    updatedAt: book.updated_at,
  });
}

router.get("/", async (req, res, next) => {
  try {
    const languageCode = typeof req.query.language === "string" ? req.query.language : null;
    const languageFilter = languageCode
      ? await prisma.language.findUnique({
          where: { code: languageCode },
          select: { language_id: true },
        })
      : null;

    const books = await prisma.book.findMany({
      orderBy: { created_at: "desc" },
      include: bookInclude,
      ...(languageFilter
        ? {
            where: {
              original_language_id: languageFilter.language_id,
            },
          }
        : {}),
    });

    res.json(books.map(toClientBook));
  } catch (error) {
    next(error);
  }
});

router.get("/slug/:slug", async (req, res, next) => {
  try {
    const book = await prisma.book.findFirst({
      where: {
        OR: [
          { slug: req.params.slug },
          {
            translations: {
              some: {
                slug: req.params.slug,
              },
            },
          },
        ],
      },
      include: bookInclude,
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(toClientBook(book));
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = BigInt(req.params.id);

    const book = await prisma.book.findUnique({
      where: { book_id: id },
      include: bookInclude,
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(toClientBook(book));
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body || {};

    if (!body.title || !body.authorId || !body.publisherId || !body.languageId) {
      return res.status(400).json({
        message: "title, authorId, publisherId, and languageId are required",
      });
    }

    const created = await prisma.book.create({
      data: {
        title: body.title,
        subtitle: body.subtitle || null,
        slug: body.slug || null,
        author_id: BigInt(body.authorId),
        publisher_id: BigInt(body.publisherId),
        original_language_id: Number(body.languageId),
        publication_year: body.publicationYear ? Number(body.publicationYear) : null,
        publication_date: body.publicationDate ? new Date(body.publicationDate) : null,
        edition: body.edition || null,
        isbn_10: body.isbn10 || null,
        isbn_13: body.isbn13 || null,
        summary: body.summary || null,
        key_highlights: body.keyHighlights || null,
        table_of_contents: body.tableOfContents || null,
        page_count: body.pageCount ? Number(body.pageCount) : null,
        cover_image_url: body.coverImageUrl || null,
        average_rating: body.averageRating ? body.averageRating : null,
        review_count: body.reviewCount ? Number(body.reviewCount) : null,
        meta_title: body.metaTitle || null,
        meta_description: body.metaDescription || null,
      },
      include: bookInclude,
    });

    res.status(201).json(toClientBook(created));
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const body = req.body || {};

    const updated = await prisma.book.update({
      where: { book_id: BigInt(req.params.id) },
      data: {
        title: body.title,
        subtitle: body.subtitle,
        slug: body.slug,
        publication_year: body.publicationYear === undefined ? undefined : Number(body.publicationYear),
        publication_date: body.publicationDate === undefined ? undefined : new Date(body.publicationDate),
        edition: body.edition,
        isbn_10: body.isbn10,
        isbn_13: body.isbn13,
        summary: body.summary,
        key_highlights: body.keyHighlights,
        table_of_contents: body.tableOfContents,
        page_count: body.pageCount === undefined ? undefined : Number(body.pageCount),
        cover_image_url: body.coverImageUrl,
        average_rating: body.averageRating === undefined ? undefined : body.averageRating,
        review_count: body.reviewCount === undefined ? undefined : Number(body.reviewCount),
        meta_title: body.metaTitle,
        meta_description: body.metaDescription,
      },
      include: bookInclude,
    });

    res.json(toClientBook(updated));
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.book.delete({
      where: { book_id: BigInt(req.params.id) },
    });

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;