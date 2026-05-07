"use client";

import HeroSectionSlider from "@/components/homepages/HeroSectionSlider";
import HeroPartOne from "@/components/homepages/HeroPartOne";
import ExploreBooks from "@/components/homepages/ExploreBooks"
import ExploreCollections from "@/components/homepages/ExploreCollections";
import ExploreAuthor from "@/components/homepages/ExploreAuthor";
import ExplorePublications from "@/components/homepages/ExplorePublications";
import ExploreComics from "@/components/homepages/ExploreComics";
import ExploreAcademicBooks from "@/components/homepages/ExploreAcademicBooks";


export default function HomepagesPage() {
  return (
    <main>
      <HeroSectionSlider />
      <HeroPartOne />
      <ExploreBooks />
      <ExploreAcademicBooks />
      <ExploreCollections />
      <ExploreAuthor />
      <ExplorePublications />
      <ExploreComics />
   
    </main>
  );
}