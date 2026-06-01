-- CreateTable
CREATE TABLE "languages" (
    "language_id" INTEGER NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "english_name" VARCHAR(100) NOT NULL,
    "native_name" VARCHAR(100) NOT NULL,
    "is_rtl" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("language_id")
);

-- CreateTable
CREATE TABLE "authors" (
    "author_id" BIGSERIAL NOT NULL,
    "author_name" VARCHAR(255) NOT NULL,
    "bio" TEXT,
    "birth_date" DATE,
    "nationality" VARCHAR(100),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "authors_pkey" PRIMARY KEY ("author_id")
);

-- CreateTable
CREATE TABLE "publishers" (
    "publisher_id" BIGSERIAL NOT NULL,
    "publisher_name" VARCHAR(255) NOT NULL,
    "website" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "publishers_pkey" PRIMARY KEY ("publisher_id")
);

-- CreateTable
CREATE TABLE "books" (
    "book_id" BIGSERIAL NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "subtitle" VARCHAR(500),
    "slug" VARCHAR(500),
    "author_id" BIGINT NOT NULL,
    "publisher_id" BIGINT,
    "original_language_id" INTEGER NOT NULL,
    "publication_year" INTEGER,
    "publication_date" DATE,
    "edition" VARCHAR(100),
    "isbn_10" VARCHAR(20),
    "isbn_13" VARCHAR(20),
    "summary" TEXT,
    "key_highlights" TEXT,
    "table_of_contents" TEXT,
    "page_count" INTEGER,
    "cover_image_url" VARCHAR(500),
    "average_rating" DECIMAL(3,2),
    "review_count" INTEGER,
    "meta_title" VARCHAR(255),
    "meta_description" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "books_pkey" PRIMARY KEY ("book_id")
);

-- CreateTable
CREATE TABLE "book_translations" (
    "translation_id" BIGSERIAL NOT NULL,
    "book_id" BIGINT NOT NULL,
    "language_id" INTEGER NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "subtitle" VARCHAR(500),
    "slug" VARCHAR(500) NOT NULL,
    "summary" TEXT,
    "key_highlights" TEXT,
    "subjects_covered" TEXT,
    "seo_title" VARCHAR(255),
    "seo_description" TEXT,
    "seo_keywords" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "book_translations_pkey" PRIMARY KEY ("translation_id")
);

-- CreateTable
CREATE TABLE "book_publication_details" (
    "publication_id" BIGSERIAL NOT NULL,
    "book_id" BIGINT NOT NULL,
    "isbn_10" VARCHAR(20),
    "isbn_13" VARCHAR(20),
    "edition" VARCHAR(100),
    "publication_date" DATE,
    "pages" INTEGER,
    "format" VARCHAR(50),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "book_publication_details_pkey" PRIMARY KEY ("publication_id")
);

-- CreateTable
CREATE TABLE "book_languages" (
    "id" BIGSERIAL NOT NULL,
    "book_id" BIGINT NOT NULL,
    "language_id" INTEGER NOT NULL,

    CONSTRAINT "book_languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "category_id" BIGSERIAL NOT NULL,
    "slug" VARCHAR(255),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "category_translations" (
    "id" BIGSERIAL NOT NULL,
    "category_id" BIGINT NOT NULL,
    "language_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,

    CONSTRAINT "category_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book_categories" (
    "book_id" BIGINT NOT NULL,
    "category_id" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "languages_code_key" ON "languages"("code");

-- CreateIndex
CREATE UNIQUE INDEX "books_slug_key" ON "books"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "book_translations_book_id_language_id_key" ON "book_translations"("book_id", "language_id");

-- CreateIndex
CREATE UNIQUE INDEX "book_translations_slug_key" ON "book_translations"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "book_languages_book_id_language_id_key" ON "book_languages"("book_id", "language_id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "category_translations_category_id_language_id_key" ON "category_translations"("category_id", "language_id");

-- CreateIndex
CREATE UNIQUE INDEX "book_categories_book_id_category_id_key" ON "book_categories"("book_id", "category_id");

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("author_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_publisher_id_fkey" FOREIGN KEY ("publisher_id") REFERENCES "publishers"("publisher_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_original_language_id_fkey" FOREIGN KEY ("original_language_id") REFERENCES "languages"("language_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_translations" ADD CONSTRAINT "book_translations_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("book_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_translations" ADD CONSTRAINT "book_translations_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "languages"("language_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_publication_details" ADD CONSTRAINT "book_publication_details_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("book_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_languages" ADD CONSTRAINT "book_languages_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("book_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_languages" ADD CONSTRAINT "book_languages_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "languages"("language_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_translations" ADD CONSTRAINT "category_translations_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_translations" ADD CONSTRAINT "category_translations_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "languages"("language_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_categories" ADD CONSTRAINT "book_categories_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("book_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_categories" ADD CONSTRAINT "book_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;