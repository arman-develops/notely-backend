-- CreateTable
CREATE TABLE "notes" (
    "note_id" TEXT NOT NULL,
    "note_title" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorID" TEXT NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("note_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "notes_note_id_key" ON "notes"("note_id");

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
