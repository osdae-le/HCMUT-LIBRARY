import borrowService from "../services/borrowService"; // Import service

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
    const data = req.body;
    if (!data) {
      return res.status(500).json({ error: "Lỗi thiếu id của sách" });
    }

    const response = await borrowService.handleUpdateBorrow(data);

    return res.status(200).json({ message: response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Lỗi khi gia hạn" });
  }
};
let handleReturnBorrow = async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      return res.status(500).json({ error: "Lỗi thiếu id của sách" });
    }

    const response = await borrowService.handleReturnBorrow(data);

    return res.status(200).json({ message: response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Lỗi khi gia hạn" });
  }
};
module.exports = { handleAddBorrow, handleUpdateBorrow, handleReturnBorrow };
