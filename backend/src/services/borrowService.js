import db from "../models/index";

let handleAddBorrow = (userId, borrowData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let borrowResults = [];

      if (!userId || borrowData.length === 0) {
        throw new Error("Missing required parameters: userId or bookId");
      }

      for (let i = 0; i < borrowData.length; i++) {
        const availableBookCopy = await db.BookCopy.findOne({
          where: {
            bookId: borrowData[i],
            status: "Available"
          },
          raw: true
        })

        if (!availableBookCopy) {
          throw new Error("No available book copy found for the provided bookId.");
        }
        const borrowDate = new Date();
        const returnDate = new Date();
        returnDate.setDate(borrowDate.getDate() + 14);

        const newBorrow = await db.eBorrows.create({
          userId: userId,
          bookId: borrowData[i],
          bookCopyId: availableBookCopy.id,
          borrowDate: borrowDate, // Ngày hiện tại
          returnDate: returnDate,
          status: "Borrowed"
        });

        await db.BookCopy.update(
          { status: "Borrowed" },
          { where: { id: availableBookCopy.id } }
        );

        borrowResults.push(newBorrow);
      };

      resolve(borrowResults); // Trả về bản ghi sách vừa được thêm
    } catch (error) {
      reject(error); // Trả về lỗi nếu xảy ra vấn đề
    }
  });
};

module.exports = { handleAddBorrow };
