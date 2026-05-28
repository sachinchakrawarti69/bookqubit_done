import { ComicsDetailsPage } from "@/features/comic/comicdeatils";
import { getComicsByLanguage } from "@/data/comics/index";
import { cookies } from "next/headers";

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = params;
  
  // Get language from cookies (this works in Server Component)
  const cookieStore = cookies();
  const language = cookieStore.get('language')?.value || 'en';
  
  const comics = getComicsByLanguage(language);
  const comic = comics?.find(c => c.slug === slug);
  
  if (!comic) {
    return {
      title: 'Comic Not Found | BookQubit',
      description: 'The requested comic could not be found.',
    };
  }
  
  return {
    title: `${comic.title} | BookQubit Comics`,
    description: comic.description?.substring(0, 160),
    openGraph: {
      title: comic.title,
      description: comic.description?.substring(0, 160),
      images: [comic.image],
    },
  };
}

// Generate static paths
export async function generateStaticParams() {
  const languages = ['en', 'es', 'fr'];
  const allParams = [];
  
  for (const lang of languages) {
    const comics = getComicsByLanguage(lang);
    if (comics && comics.length > 0) {
      const params = comics.map((comic) => ({
        slug: comic.slug,
      }));
      allParams.push(...params);
    }
  }
  
  // Remove duplicates
  const uniqueParams = Array.from(
    new Map(allParams.map(item => [item.slug, item])).values()
  );
  
  return uniqueParams;
}

// Server Component - passes language to client component via props
export default async function ComicDetailPage() {
  // Get language from cookies on the server
  const cookieStore = cookies();
  const language = cookieStore.get('language')?.value || 'en';
  
  // Pass language as prop to client component
  return <ComicsDetailsPage initialLanguage={language} />;
}

export const revalidate = 3600;