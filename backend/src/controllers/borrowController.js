// borrowController.js
import borrowService from "../services/borrowService";  // Import service

let handleAddBorrow = async (req, res) => {
  try {
    let userId = req.params.id;
    let listBookId = req.body;

    // Gọi hàm handleAddBorrow trong service để thêm sách
    let newborrow = await borrowService.handleAddBorrow(userId, listBookId);

    console.log("Sách được mượn thành công: ", newborrow);

    // Trả về phản hồi thành công
    return res.status(201).json({
      message: "Sách được mượn thành công.",
      borrow: newborrow,
    });
  } catch (error) {
    console.error("Lỗi trong quá trình mượn sách: ", error);

    // Trả về phản hồi lỗi
    return res.status(500).json({
      message: "Thêm bản ghi mượn thất bại.",
      error: error.message,
    });
  }
};


let handleUpdateBorrow = async (req, res) => {
  try {
    const borrowId = req.params.id;
    const { borrowName, author, datePublish, genre, description, quantity, img, status } = req.body;

    const borrowData = {
      borrowName,
      author,
      datePublish,
      genre,
      description,
      quantity,
      img,
      status,
    };

    const updatedborrow = await borrowService.handleUpdateborrow(borrowId, borrowData);

    return res.status(200).json({ message: 'Tình trạng của Electric Borrow đã được cập nhật thành công', borrow: updatedborrow });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Lỗi khi sửa sách' });
  }
};

module.exports = { handleAddBorrow, handleUpdateBorrow };