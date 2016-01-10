-- phpMyAdmin SQL Dump
-- version 4.5.0.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 08, 2016 at 10:06 PM
-- Server version: 10.0.17-MariaDB
-- PHP Version: 5.6.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `phaserdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `upgrades_tbl`
--

CREATE TABLE `upgrades_tbl` (
  `userID` varchar(25) NOT NULL,
  `upgrade_Health` varchar(25) NOT NULL,
  `upgrade_Ammo` varchar(25) NOT NULL,
  `upgrade_Damage` varchar(25) NOT NULL,
  `password` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `upgrades_tbl`
--

INSERT INTO `upgrades_tbl` (`userID`, `upgrade_Health`, `upgrade_Ammo`, `upgrade_Damage`, `password`) VALUES
('dan', '3', '2.5', '2', 'test'),
('dan', '2', '2', '1.5', 'tes');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
