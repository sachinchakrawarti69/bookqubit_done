// src/public_app/features/tags/tagEngine.js
import { TAG_RULES } from "./tagRules";

/**
 * Get auto tags by origin, genre, type
 */
export function getAutoTags(book) {
  if (!book) return [];

  let tags = [];

  // Country/Origin tag
  const originTag = TAG_RULES.origin.find(
    (t) => t.label.toLowerCase() === book.country?.toLowerCase()
  );
  if (originTag) tags.push(originTag);

  // Genre tags
  if (book.genre) {
    const genreTag = TAG_RULES.genre.find(
      (t) => t.label.toLowerCase() === book.genre?.toLowerCase()
    );
    if (genreTag) tags.push(genreTag);
  }

  // Type tag
  if (book.type) {
    const typeTag = TAG_RULES.type.find(
      (t) => t.label.toLowerCase() === book.type?.toLowerCase()
    );
    if (typeTag) tags.push(typeTag);
  }

  return tags;
}

/**
 * Get author-specific tags
 */
export function getAuthorTags(book) {
  if (!book?.author) return [];
  const rule = TAG_RULES.author.find(
    (a) => a.name.toLowerCase() === book.author.toLowerCase()
  );
  return rule ? rule.tags : [];
}
