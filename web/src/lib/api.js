export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

export async function fetchJson(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: options.cache || "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function getBookBySlug(slug, language) {
  const query = language ? `?language=${encodeURIComponent(language)}` : "";

  try {
    return await fetchJson(`/books/slug/${encodeURIComponent(slug)}${query}`);
  } catch (error) {
    return null;
  }
}

export async function getBooks(language) {
  const query = language ? `?language=${encodeURIComponent(language)}` : "";

  try {
    return await fetchJson(`/books${query}`);
  } catch (error) {
    return [];
  }
}