-- CreateTable
CREATE TABLE "Registered_Offer" (
    "user_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,
    "offer_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_book_id_offer_id_unique" ON "Registered_Offer"("user_id", "book_id");

-- AddForeignKey
ALTER TABLE "Registered_Offer" ADD CONSTRAINT "Registered_Offer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Registered_Offer" ADD CONSTRAINT "Registered_Offer_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Registered_Offer" ADD CONSTRAINT "Registered_Offer_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "Offer"("offer_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
