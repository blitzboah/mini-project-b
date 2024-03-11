-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 14, 2023 at 07:44 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `miniproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `businfo`
--

CREATE TABLE `businfo` (
  `bus_id` int(11) NOT NULL,
  `bus_owner` int(11) NOT NULL,
  `bus_number` varchar(255) NOT NULL,
  `bus_permit` date NOT NULL,
  `email_sent` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `businfo`
--

INSERT INTO `businfo` (`bus_id`, `bus_owner`, `bus_number`, `bus_permit`, `email_sent`) VALUES
(1, 1, 'MH 03 CM 2795', '2023-12-02', 1),
(2, 2, 'MH 03 CM 2785', '2024-01-17', 1),
(3, 2, 'MH 43 CM 4257', '2024-12-20', 0);

-- --------------------------------------------------------

--
-- Table structure for table `driverinfo`
--

CREATE TABLE `driverinfo` (
  `driver_id` int(11) NOT NULL,
  `driver_owner` int(11) NOT NULL,
  `dri_regnumber` varchar(50) NOT NULL,
  `dri_name` varchar(35) NOT NULL,
  `dri_address` varchar(150) NOT NULL,
  `dri_phonenumber` int(11) NOT NULL,
  `dri_photo` varchar(400) NOT NULL,
  `dri_licensenumber` varchar(30) NOT NULL,
  `dri_licensephoto` varchar(400) NOT NULL,
  `dri_joiningDate` date NOT NULL,
  `dri_licenseExpiry` date NOT NULL,
  `email_sent` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `driverinfo`
--

INSERT INTO `driverinfo` (`driver_id`, `driver_owner`, `dri_regnumber`, `dri_name`, `dri_address`, `dri_phonenumber`, `dri_photo`, `dri_licensenumber`, `dri_licensephoto`, `dri_joiningDate`, `dri_licenseExpiry`, `email_sent`) VALUES
(4, 1, 'BI 123456', 'Rahmat Ul Haq', 'D-30 Kharghar, Mumbai, Maharashtra 416872', 2147483647, 'uploads/—Pngtree—avatar icon profile icon member_5247852.png', 'MH04 20230027864', 'uploads/dl.jpg', '2020-02-08', '2026-07-30', 0),
(5, 2, 'DK 875964', 'Babu Bhaiya', 'D-30 Kharghar, Mumbai, Maharashtra 416872', 2147483647, 'uploads/—Pngtree—avatar icon profile icon member_5247852.png', 'MH07 20230025687', 'uploads/dl.jpg', '2012-11-19', '2023-12-09', 1),
(6, 4, 'HT 123456', 'abc', 'd-30 shah and anchor', 1234567890, 'uploads/—Pngtree—avatar icon profile icon member_5247852.png', 'MH01 20230015494', 'uploads/dl.jpg', '2020-01-21', '2023-12-06', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_email` varchar(35) NOT NULL,
  `user_username` varchar(25) NOT NULL,
  `user_companyname` varchar(50) NOT NULL,
  `user_password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_email`, `user_username`, `user_companyname`, `user_password`) VALUES
(1, 'neelmulik12@gmail.com', 'neel', 'businfo', '202cb962ac59075b964b07152d234b70'),
(2, 'manodrabhumin@gmail.com', 'Bhumin', 'Bus Travels', '202cb962ac59075b964b07152d234b70'),
(4, 'harshambre2004@gmail.com', 'Harsh', 'Harsh Travel Agency', '202cb962ac59075b964b07152d234b70');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `businfo`
--
ALTER TABLE `businfo`
  ADD PRIMARY KEY (`bus_id`),
  ADD UNIQUE KEY `bus_id` (`bus_id`),
  ADD KEY `bus_owner` (`bus_owner`),
  ADD KEY `bus_owner_2` (`bus_owner`);

--
-- Indexes for table `driverinfo`
--
ALTER TABLE `driverinfo`
  ADD PRIMARY KEY (`driver_id`),
  ADD UNIQUE KEY `driver_id` (`driver_id`),
  ADD KEY `dri_owner` (`driver_owner`),
  ADD KEY `driver_owner` (`driver_owner`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD KEY `user_companyname` (`user_companyname`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `businfo`
--
ALTER TABLE `businfo`
  MODIFY `bus_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `driverinfo`
--
ALTER TABLE `driverinfo`
  MODIFY `driver_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `businfo`
--
ALTER TABLE `businfo`
  ADD CONSTRAINT `businfo_ibfk_1` FOREIGN KEY (`bus_owner`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `driverinfo`
--
ALTER TABLE `driverinfo`
  ADD CONSTRAINT `driverinfo_ibfk_1` FOREIGN KEY (`driver_owner`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
