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

let handleUpdateBorrow = (borrowData) => {
  return new Promise(async (resolve, reject) => {
    try {
      for (let i = 0; i < borrowData.length; i++) {
        const eBorrow = await db.eBorrows.findOne({
          where: { id: borrowData[i] }
        })

        if (eBorrow) {
          if (eBorrow.renew == 1) {
            let date = eBorrow.returnDate ? new Date(eBorrow.returnDate) : new Date();
            console.log("Ngày hiện tại:", date);

            // Tăng thêm 14 ngày
            date.setDate(date.getDate() + 14);
            console.log("Ngày sau 14 ngày:", date);

            // Cập nhật lại giá trị returnDate và reset renew về 0
            await eBorrow.update({
              returnDate: date, // Sequelize sẽ tự xử lý định dạng `DATETIME`
              renew: 0,
            });
          }
          else reject("Đã hết lượt gia hạn");
        }
        else {
          reject("Lỗi không tìm thấy bản ghi phù hợp với id");
        }
      }
      resolve("Gia hạn thành công");
    } catch (e) {
      reject(e);
    }
  })
}

module.exports = { handleAddBorrow, handleUpdateBorrow };
