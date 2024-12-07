-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 03, 2024 at 08:43 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `librarymanagement`
--
-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phoneNum` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `gender`, `address`, `phoneNum`, `status`, `role`, `createdAt`, `updatedAt`) VALUES
(1302073, 'nguyenvana@gmail.com', '1234', 'Nguyen Van A', 'Nam', 'Binh Duong', '54684965', 'Normal', 'Staff', '2024-11-28 15:04:31', '2024-11-28 15:04:31'),
(2318399, 'phuongbinh.conan@gmail.com', '1234', 'Hoang Phuong Binh', 'Nam', 'Dong Nai', '3952587932', 'Normal', 'Student', '2024-11-06 05:40:36', '2024-11-06 05:40:36');

-- --------------------------------------------------------
--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `bookName` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `datePublish` year(4) DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `bookcopy`
--

CREATE TABLE `bookcopies` (
  `id` int(11) NOT NULL,
  `bookId` int(11) NOT NULL,
  `copyNumber` int(11) NOT NULL,
  `status` enum('Available','Borrowed','Damaged','Lost') DEFAULT 'Available',
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Triggers `books`
--
DELIMITER $$
CREATE TRIGGER `afterInsertBook` AFTER INSERT ON `books` FOR EACH ROW BEGIN
  DECLARE i INT DEFAULT 1;
  WHILE i <= NEW.quantity DO
    INSERT INTO `bookcopies` (`bookId`, `copyNumber`, `status`, `createdAt`, `updatedAt`)
    VALUES (NEW.id, i, 'Available', NOW(), NOW());
    SET i = i + 1;
  END WHILE;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `eBorrow`
--

CREATE TABLE `eBorrows` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `bookId` int(11) NOT NULL,
  `bookCopyId` int(11) NOT NULL,
  `renew` int(1)  NOT NULL,
  `borrowDate` datetime NOT NULL DEFAULT current_timestamp(),
  `returnDate` datetime DEFAULT NULL,
  `status` enum('Borrowed','Returned','Overdue') DEFAULT 'Borrowed',
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
--
-- Triggers `book_copies`
--
DELIMITER $$
CREATE TRIGGER `afterInsertEBorrow` 
AFTER INSERT ON `eBorrows` 
FOR EACH ROW 
BEGIN
    UPDATE `bookcopies`
    SET `status` = "Borrowed"
    WHERE `id` = NEW.bookCopyId; -- Tham chiếu đến bản sao sách được mượn
END
$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER `afterUpdateEBorrowStatus`
AFTER UPDATE ON `eBorrows`
FOR EACH ROW
BEGIN
    -- Kiểm tra nếu status được cập nhật thành "Returned"
    IF NEW.status = "Returned" THEN
        -- Cập nhật trạng thái bản sao sách thành "Available"
        UPDATE `bookcopies`
        SET `status` = "Available"
        WHERE `id` = NEW.bookCopyId;
    END IF;
END
$$
DELIMITER ;

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20241026143354-create-user.js'),
('20241026144308-create-user.js'),
('20241128174503-create-book.js'),
('20241128182752-create-book.js');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookcopy`
--
ALTER TABLE `bookcopies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bookId` (`bookId`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `eBorrow`
--
ALTER TABLE `eBorrows`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `bookId` (`bookId`),
  ADD KEY `bookCopyId` (`bookCopyId`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookcopies`
--
ALTER TABLE `bookcopies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=301;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=984;

--
-- AUTO_INCREMENT for table `eBorrow`
--
ALTER TABLE `eBorrows`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2318400;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookcopy`
--
ALTER TABLE `bookcopies`
  ADD CONSTRAINT `bookcopy_ibfk_1` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `eBorrow`
--
ALTER TABLE `eBorrows`
  ADD CONSTRAINT `eBorrow_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `eBorrow_ibfk_2` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `eBorrow_ibfk_3` FOREIGN KEY (`bookCopyId`) REFERENCES `bookcopies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;



--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `bookName`, `author`, `datePublish`, `genre`, `description`, `quantity`, `img`, `status`, `createdAt`, `updatedAt`) VALUES
(973, 'Fundamental of Database systems 7th Edition', 'Elmasri & Navathe', '2015', 'Học tập', 'Cuốn sách này giới thiệu các khái niệm cơ bản cần thiết cho việc thiết kế, sử dụng và triển khai các hệ thống cơ sở dữ liệu và ứng dụng cơ sở dữ liệu. Nội dung nhấn mạnh các nguyên tắc cơ bản của mô hình hóa và thiết kế cơ sở dữ liệu, các ngôn ngữ và mô hình do hệ thống quản lý cơ sở dữ liệu cung cấp và các kỹ thuật triển khai hệ thống cơ sở dữ liệu.', 30, 'https://covers.vitalsource.com/vbid/9780133971224/width/720', 'Available', '2024-12-03 02:37:52', '2024-12-03 19:01:43'),
(974, 'Bài tập vật lý đại cương A1', 'Trần Văn Lượng (CB)', '2024', 'Khoa học ứng dụng', 'Cuốn sách \"Bài tập vật lý đại cương A1\" được biên soạn với mục đích nhằm giúp cho sinh viên củng cố lại các kiến thức đã được học, vận dụng vào để giải quyết các dạng bài tập, qua đó thuận tiện và hiệu quả hơn trong việc ôn tập chuẩn bị cho các kì thi giữa học kì và cuối học kì môn học Vật lý 1 của Trường ĐH Bách Khoa - ĐH Quốc gia TPHCM. Đối tượng sử dụng cuốn sách này là sinh viên các hệ đào tạo ĐH chính quy, thường xuyên và CĐ. Tùy thuộc vào từng hệ đào tạo mà có thể dạy theo các mức độ cơ bản hoặc nâng cao đã được phân loại rõ trong cuốn sách.', 50, 'https://images.vnuhcmpress.edu.vn/Picture/2023/8/9/image-20230809095349521.jpg', 'Available', '2024-12-03 16:22:31', '2024-12-03 16:22:31'),
(975, 'Giáo trình Cấu trúc dữ liệu và giải thuật', 'TS. Phạm Anh Phương', '2023', 'Công Nghệ Thông Tin', 'Qua nhiều năm nghiên cứu và giảng dạy ở các Trường Đại học sư phạm - Đại học Đà Nẵng, Đại học Khoa học - Đại học Huế, Đại học Duy Tân, Đại học Công nghệ Thông tin và Truyền thông Việt-Hàn và một số trường đại học khác ở miền Trung và Tây Nguyên, chúng tôi đã cố gắng đúc kết để biên soạn cuốn sách Giáo trình Cấu trúc dữ liệu và giải thuật nhằm đáp ứng nhu cầu học tập và nghiên cứu của học sinh, sinh viên và những bạn đọc quan tâm đến lĩnh vực lập trình, giúp bạn đọc có một tài liệu tham khảo tốt khi tìm hiểu sâu về lĩnh vực lập trình.', 50, 'https://images.vnuhcmpress.edu.vn/Picture/2024/7/1/image-20240701150234854.jpg', 'Available', '2024-12-03 16:39:02', '2024-12-03 16:39:02'),
(976, 'Giáo trình Nhập môn Internet và Công nghệ Web', 'Nguyễn Hoàng Tú Anh', '2020', 'Công Nghệ Thông Tin', 'Giáo trình Nhập môn Internet và Công nghệ Web là một cuốn sách hướng dẫn cơ bản và toàn diện về internet và công nghệ web, được viết bởi các tác giả giàu kinh nghiệm trong lĩnh vực công nghệ thông tin.', 10, 'https://images.vnuhcmpress.edu.vn/Picture/2023/10/26/image-20231026095835745.jpg', 'Available', '2024-12-03 16:43:49', '2024-12-03 16:43:49'),
(977, 'Xử lý số tín hiệu', 'Hồ Văn Khương', '2023', 'Công Nghệ Thông Tin', 'Với mục tiêu chính là cung cấp kiến thức nền tảng về xử lý số tín hiệu, các ứng dụng thực tế và kỹ năng sử dụng phần mềm tính toán và mô phỏng chuyên dụng MATLAB thì giáo trình này thật sự cần thiết cho sinh viên chuyên ngành Điện - Điện tử - Tự động hóa mà còn có thể được sử dụng làm tài liệu tham khảo cho các độc giả làm việc trong lĩnh vực khác. Giáo trình sẽ cung cấp đa dạng các kiến thức cơ sở liên quan đến xử lý số tín hiệu.', 25, 'https://images.vnuhcmpress.edu.vn/Picture/2023/10/24/image-20231024100356876.jpg', 'Available', '2024-12-03 16:45:57', '2024-12-03 16:45:57'),
(979, 'Máy tính lượng tử: Từ lý thuyết đến ứng dụng', 'Hà Đắc Bình - Hoàng Trang', '2023', 'Công Nghệ Thông Tin', 'Máy tính lượng tử: Từ lý thuyết đến ứng dụng có cấu trúc gồm 5 chương và 330 trang. ', 10, 'https://images.vnuhcmpress.edu.vn/Picture/2024/2/28/image-20240228085953813.jpg', 'Available', '2024-12-03 16:51:43', '2024-12-03 16:51:43'),
(980, 'Giáo trình Thu thập và tiền xử lý dữ liệu', 'Nguyễn Gia Tuấn Anh', '2023', 'Công Nghệ Thông Tin', 'Giáo trình Thu thập và tiền xử lý dữ liệu sẽ cung cấp cho người những kiến thức nền tảng về dữ liệu, các dạng dữ liệu trong thực tế, các phương pháp thu thập, và các kỹ thuật tiền xử lý dữ liệu để có thể xây dựng được một bộ dữ liệu sạch.', 5, 'https://images.vnuhcmpress.edu.vn/Picture/2023/12/13/image-20231213143751059.jpg', 'Available', '2024-12-03 16:58:33', '2024-12-03 16:58:33'),
(981, 'Nhập môn Kỹ thuật Điện tử - Viễn thông', 'TS Lê Đức Hùng', '2023', 'Công Nghệ Thông Tin', 'Cuốn sách Nhập môn Kỹ thuật Điện tử - Viễn thông giới thiệu cho sinh viên ngành Kỹ thuật Điện tử - Viễn thông những định hướng nghề nghiệp trong ngành Điện tử - Viễn thông trước làn sóng cuộc Cách mạng Công nghiệp lần thứ tư, các kỹ năng cần thiết cho sinh viên ngành Điện tử - Viễn thông như kỹ năng làm việc nhóm, kỹ năng giải quyết vấn đề, viết và đọc tài liệu kỹ thuật, tư duy thiết kế, quản lý dự án kỹ thuật và kỹ năng thuyết trình.', 15, 'https://images.vnuhcmpress.edu.vn/Picture/2023/11/20/image-20231120142320612.jpg', 'Available', '2024-12-03 17:00:39', '2024-12-03 17:00:39'),
(982, 'Giáo trình Nhập môn bảo đảm và an ninh thông tin', 'Nguyễn Tấn Cầm', '2022', 'Công Nghệ Thông Tin', 'Trong Giáo trình Nhập môn bảo đảm và an ninh thông tin, Tác giả trình bày các kiến thức cơ bản liên quan đến các phương pháp tấn công và bảo vệ an toàn thông tin.', 5, 'https://images.vnuhcmpress.edu.vn/Picture/2023/10/27/image-20231027095022959.jpg', 'Available', '2024-12-03 17:02:44', '2024-12-03 17:02:44'),
(983, 'Giáo trình Viễn thám', 'Lê Văn Trung', '2017', 'Công Nghệ Thông Tin', 'Để nhanh chóng phát triển công nghệ vũ trụ đáp ứng được các nhu cầu phát triển kinh tế của đất nước, ngày 14/06/2006 Thủ tướng đã phê duyệt “Chiến lược nghiên cứu và ứng dụng công nghệ vũ trụ Việt Nam đến năm 2020”. Bộ Khoa học và Công nghệ đã phối hợp với các bộ, ngành có liên quan xây dựng đề án “Kế hoạch tổng thể về ứng dụng và phát triển công nghệ viễn thám ở Việt Nam”. Ngày 7/5/2013, vệ tinh VNREDSat–1 (Vietnam Natural Resources, Environment and Disaster-monitoring Satellite) đã được phóng thành công, góp phần chủ động cung cấp ảnh vệ tinh phục vụ công tác lý tài nguyên thiên nhiên, bảo vệ môi trường và giảm thiểu thiên tai. ', 10, 'https://images.vnuhcmpress.edu.vn/Picture/2023/2015-06-11-08-39-56_image001.jpg', 'Available', '2024-12-03 17:05:07', '2024-12-03 17:05:07');

--
-- Dumping data for table `eBorrow`
--
INSERT INTO eborrows (id, userId, bookId, bookCopyId, renew, borrowDate, returnDate, status, createdAt, updatedAt)
VALUES
    (22, 1302073, 973, 302, 1,'2024-12-02', '2024-12-07', 'Borrowed', '2024-12-02 11:00:00', '2024-12-07 10:00:00'),
    (23, 1302073, 974, 332, 1,'2024-12-01', '2024-12-05', 'Returned', '2024-12-01 11:00:00', '2024-12-05 14:00:00'),
    (24, 2318399, 975, 382, 0,'2024-12-01', '2024-12-30', 'Borrowed', '2024-12-01 08:00:00', '2024-12-06 14:00:00'),
    (25, 2318399, 976, 432, 1,'2024-12-01', '2024-12-07', 'Borrowed', '2024-12-01 09:00:00', '2024-12-07 10:00:00'),
    (26, 2318399, 977, 442, 1,'2024-12-01', '2024-12-05', 'Overdue', '2024-12-01 12:30:00', '2024-12-05 15:30:00');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
