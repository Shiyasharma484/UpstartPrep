-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 04, 2023 at 05:40 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mpi_database_1`
--

-- --------------------------------------------------------

--
-- Table structure for table `configuration`
--

CREATE TABLE `configuration` (
  `id` bigint(20) NOT NULL,
  `config_key` varchar(255) NOT NULL,
  `config_value` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `configuration`
--

INSERT INTO `configuration` (`id`, `config_key`, `config_value`) VALUES
(1, 'footer_css', '{\n  text-align: center;\n  color: red;\n} '),
(2, 'footer_script', '<html>\n<body>\n\n<h1>My First JavaScript</h1>\n\n<button type=\"button\"\nonclick=\"document.getElementById(\'demo\').innerHTML = Date()\">\nClick me to display Date and Time.</button>\n\n<p id=\"demo\"></p>\n\n</body>\n</html> '),
(3, 'header_html', 'ttFSDFSDFSDFSD'),
(4, 'header_css', '{\n  text-align: center;\n  color: red;\n} '),
(5, 'header_script', '<html>\n<body>\n\n<h1>My First JavaScript</h1>\n\n<button type=\"button\"\nonclick=\"document.getElementById(\'demo\').innerHTML = Date()\">\nClick me to display Date and Time.</button>\n\n<p id=\"demo\"></p>\n\n</body>\n</html> '),
(192, 'aa', '2'),
(193, 'bb', '<html>\n<body>\n\n<h1>My First JavaScript</h1>\n\n<button type=\"button\"\nonclick=\"document.getElementById(\'demo\').innerHTML = Date()\">\nClick me to display Date and Time.</button>\n\n<p id=\"demo\"></p>\n\n</body>\n</html> '),
(236, 'cc111', 'qs112 2ttsdsdsdsd1'),
(241, 'cc5', 'q1s12 t2tsdsdsdsd1'),
(242, 'xticxxkxxet_priority_id', '20'),
(243, 'xtickxxxxet_customer_id', '0<html>\n<body>\n\n<h1>My First JavaScript</h1>\n\n<button type=\"button\"\nonclick=\"document.getElementById(\'demo\').innerHTML = Date()\">\nClick me to display Date and Time.</button>\n\n<p id=\"demo\"></p>\n\n</body>\n</html> '),
(244, 'ss', 'ss');

-- --------------------------------------------------------

--
-- Table structure for table `facebook`
--

CREATE TABLE `facebook` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `client_id` longtext DEFAULT NULL,
  `client_secret` longtext DEFAULT NULL,
  `redirect_uri` longtext DEFAULT NULL,
  `refresh_token` longtext DEFAULT NULL,
  `refresh_token_expires_in` varchar(255) DEFAULT NULL,
  `token` longtext DEFAULT NULL,
  `token_expires_in` varchar(255) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `trash` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `facebook`
--

INSERT INTO `facebook` (`id`, `user_id`, `client_id`, `client_secret`, `redirect_uri`, `refresh_token`, `refresh_token_expires_in`, `token`, `token_expires_in`, `active`, `trash`, `created_at`, `updated_at`) VALUES
(1, 1, '436889701163181', 'bc2e42d8fe38abee0b9aafd6dfe9cbaa', 'https://ajivatech.com/facebook_Api/index.php', NULL, NULL, 'EAAJz4B702RIBABYZCZCPZBf2V6yACsvR1ZBDlX9nxz9WvthAHO9bhviTYpAa8CypglCqCytAavJQX9xUFHWLaCfAZB78vHsNVzCWKaJzydFfBFe5v5xrgc7dEPg2OtowWE6SzzB4NGOZCa1z5l4IQt6GlzA4OZAZAZCmRfZBOc7yKgdZAB7juYQU0Qi7ixKMZAAIXcqKz1qrkX3PkTBUZCqmJydRBrhAPmgDPlr5pQNbVUeWDSXisI0AxlJKl', NULL, 1, 0, '2022-11-25 17:55:08', '2022-12-14 16:06:05'),
(30, 89, NULL, NULL, 'https://ajivatech.com/facebook_Api/index.php', NULL, NULL, 'EAAGNWU9xoK0BAB1XpM3nBLmHeW6BhCp0JOZB6mAE9kNpiCAtRR9SkxuL9WYoHVSvcLWo7LMwoJFgYw979GZCVO5ZAy3ckE45dK1F8UvqCmTR4luMQnOnzbnTwrihEnFTjW2almaIrqPfmp1T6DYRsMpcZBiVkpRZA5ELaXrZBgZCAZDZD', '5180847', 1, 0, '2022-12-07 11:42:49', '2022-12-14 17:12:26');

-- --------------------------------------------------------

--
-- Table structure for table `global_variables`
--

CREATE TABLE `global_variables` (
  `id` bigint(20) NOT NULL,
  `variable_name` varchar(50) NOT NULL,
  `parent` bigint(20) DEFAULT NULL,
  `values` varchar(50) NOT NULL COMMENT 'id of varaiable from respective table',
  `active` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `global_variables`
--

INSERT INTO `global_variables` (`id`, `variable_name`, `parent`, `values`, `active`) VALUES
(1, 'SUPER ADMIN', 0, '1', 1),
(10, 'MODULES', NULL, '3', 1),
(11, 'SETTINGS', 10, '1', 1),
(12, 'DASHBOARD', 10, '2', 1),
(14, 'CLIENTS', 10, '4', 1),
(15, 'POSTS', 10, '5', 1),
(21, 'SOCIAL_ACCOUNTS', 10, '6', 1);

-- --------------------------------------------------------

--
-- Table structure for table `instagram`
--

CREATE TABLE `instagram` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `client_id` longtext DEFAULT NULL,
  `client_secret` longtext DEFAULT NULL,
  `profile_id` varchar(255) DEFAULT NULL,
  `redirect_uri` longtext DEFAULT NULL,
  `refresh_token` longtext DEFAULT NULL,
  `refresh_token_expires_in` varchar(255) DEFAULT NULL,
  `token` longtext DEFAULT NULL,
  `token_expires_in` varchar(255) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `trash` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `instagram`
--

INSERT INTO `instagram` (`id`, `user_id`, `client_id`, `client_secret`, `profile_id`, `redirect_uri`, `refresh_token`, `refresh_token_expires_in`, `token`, `token_expires_in`, `active`, `trash`, `created_at`, `updated_at`) VALUES
(1, 1, '1149159652641744', '1ae6f58f9c71ddc8b2d63ab870107332', '17841409725289936', 'https://ajivatech.com/instagram/index.php', NULL, NULL, 'IGQVJWX1hmYmhJd25JQ2JLbkdLNjlGVEZAvOGM4Ml9LaHJDczkyRjNhRk1rTklYenh2M2ppcmlxN0ZADUDFzX0t1U2RvMjF3ekJQRFFnV0FKLWRXdW1MZAVg3X21lTUVLUDhtNzdHaHhXZAWJzamt2MmdVNjA2NUw4R2xMR2ZAB', NULL, 1, 0, '2022-11-25 17:55:08', '2022-12-07 19:40:19'),
(6, 89, NULL, NULL, '17841409725289936', NULL, NULL, NULL, 'IGQVJXNXB0S2F3elNZAbFZAWektWd0dhVGlab3ZAyZAzNBRjdSejlxTnF3UjBTdDZA5b1ZAmY2doemphcHQ4TXZABU3d1ZA1Q2UEhLenFVY2p1MmFKdXVDRWJaX1AtZATBUTnYwa2xJNklXZAEtITjRRUDl0b28tZA2t5bld0dkJqNzh3', NULL, 1, 0, '2022-12-07 11:42:49', '2022-12-07 19:41:26');

-- --------------------------------------------------------

--
-- Table structure for table `linkedin`
--

CREATE TABLE `linkedin` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `client_id` longtext DEFAULT NULL,
  `client_secret` longtext DEFAULT NULL,
  `redirect_uri` longtext DEFAULT NULL,
  `profile_id` varchar(255) DEFAULT NULL,
  `refresh_token` longtext DEFAULT NULL,
  `refresh_token_expires_in` varchar(255) DEFAULT NULL,
  `token` longtext DEFAULT NULL,
  `token_expires_in` varchar(255) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `trash` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `linkedin`
--

INSERT INTO `linkedin` (`id`, `user_id`, `client_id`, `client_secret`, `redirect_uri`, `profile_id`, `refresh_token`, `refresh_token_expires_in`, `token`, `token_expires_in`, `active`, `trash`, `created_at`, `updated_at`) VALUES
(1, 1, '77byp1fm8bb1wt', 'n7kELheixQ70mAD1', 'https://localhost:3000/admin/ecommerce/linkedin', 'h8ypr09Far', 'AQXUKy7y29wg1kL8Jrmd4qFnXWSMXWdCt0ydF9He1ruAc4rHMatD3fEUxd16-TQht6TnoY0JsyqwuAUvRqyNDUpnAJkiWB2aIX4AfTKqiOL6lndw4g5Iab7FSGNga1uzgcyx_fPmvSUSsgXTuIeThc_fJe8V-zNGl1ewT1MRg5-i7tL-C-mXEaZbqPwoJ84ozxSq4xNKv6oiGUIXy_mcakHMPErKo2XfNbYU1L4rx5q5EC38wSG3p4qhyU_pzHq3I5OwBbOOux0PgZdlsJWd2DMsRmY7SzV1AdcJipZMBwnI7MtRn_Bg3dFkRz0Ul6M4JR4VITmQ8MglfHA0Z2FMJfvytWP9cA', '31535999', 'AQWudEuKVqU0tNiXmkugBw3UFWcH4F--ojaCRwQ_jgvJCXDkDFVddMH_CWXpIaGSMe2OMvqYMoz8DTckodsj2aoSCkRZa_tWX8TJngakCuqFkpBlWRK0KyivPki5vNOEo3o5msk7HVjeF3_Kb1PeBGBmFRaFcrgznCA2Ta2sffAAJqRVB-_jLih3MarTIzTPqiVHZq1JJJs6MG9RRSOr-0flGqG0bgFPHCjF0vNAQ_nEJt8hO5anHqxQTHXiDzpq8nXTTZhkFxPU7K5WS1_RYD3TSdEv01gRQUZKTgxemm5e9YnWCW7A_x9yDGYnPmCy7GKPofL4-GWuzYD3boHVBW9xSJ1p8Q', '5183999', 1, 0, '2022-11-25 17:55:08', '2022-12-13 15:18:22'),
(2, 89, NULL, NULL, NULL, 'h8ypr09Far', 'AQXUKy7y29wg1kL8Jrmd4qFnXWSMXWdCt0ydF9He1ruAc4rHMatD3fEUxd16-TQht6TnoY0JsyqwuAUvRqyNDUpnAJkiWB2aIX4AfTKqiOL6lndw4g5Iab7FSGNga1uzgcyx_fPmvSUSsgXTuIeThc_fJe8V-zNGl1ewT1MRg5-i7tL-C-mXEaZbqPwoJ84ozxSq4xNKv6oiGUIXy_mcakHMPErKo2XfNbYU1L4rx5q5EC38wSG3p4qhyU_pzHq3I5OwBbOOux0PgZdlsJWd2DMsRmY7SzV1AdcJipZMBwnI7MtRn_Bg3dFkRz0Ul6M4JR4VITmQ8MglfHA0Z2FMJfvytWP9cA', '31535999', 'AQU3os0R88DSn7mPruvkYHMJpM_1piXLbhzdFH8zGbk9qoTSe09TnG4vHkIFK2QjlCQmXjEanwU68MEPLGmDofIQ3bYlIW1Eqpj3oHlkjAsBilQK8pEopZwe-GBhWRnzS9xCaWJixQTOXR3YHgeFSrzk8YeB0qoZjKNFyVekeraVGALhM-UM8cRR4XNLaW0ufTCiLhvNg10oroPcTQkpl1CetCNtsrO8cfjuVwe7ycn3YBOrheDp56HBdVxPva0Fflq2HUXdeIp58ze_8lMS92dOlZJyhSolA2axSwXuc0mpr59pTFPoEcmF10skw9z-7b91Zvx4oxNImgl2liQqKjZWU3fWvg', '5183999', 1, 0, '2022-12-07 11:42:49', '2022-12-13 15:17:46');

-- --------------------------------------------------------

--
-- Table structure for table `modules`
--

CREATE TABLE `modules` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  `slug` varchar(50) NOT NULL,
  `active` tinyint(1) DEFAULT 0,
  `trash` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `modules`
--

INSERT INTO `modules` (`id`, `name`, `parent_id`, `slug`, `active`, `trash`, `created_at`, `updated_at`) VALUES
(1, 'SETTINGS', NULL, 'settings', 1, 0, '2021-10-25 08:16:10', '2022-07-18 06:49:43'),
(2, 'DASHBOARD', NULL, 'dashboard', 1, 0, '2022-01-11 19:50:16', '2022-11-18 09:54:16'),
(3, 'MODULES', NULL, 'modules', 1, 0, '2021-10-25 08:17:12', '2022-11-18 09:54:27'),
(4, 'CLIENTS', NULL, 'clients', 1, 0, '2022-01-11 18:44:18', '2022-11-18 09:54:23'),
(5, 'POSTS', NULL, 'posts', 1, 0, '2021-10-25 08:17:40', '2022-11-18 09:54:48'),
(6, 'SOCIAL_ACCOUNTS', NULL, 'social_accounts', 1, 0, '2021-10-25 08:17:12', '2022-11-24 13:18:16');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `medium` varchar(255) DEFAULT NULL COMMENT 'facebook, instagram',
  `title` varchar(255) NOT NULL,
  `description` longtext DEFAULT NULL,
  `images` longtext DEFAULT NULL,
  `facebook_received_data` longtext DEFAULT NULL,
  `linkedin_received_data` longtext DEFAULT NULL,
  `instagram_received_data` longtext DEFAULT NULL,
  `twitter_received_data` longtext DEFAULT NULL,
  `active` tinyint(1) DEFAULT 0,
  `trash` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `medium`, `title`, `description`, `images`, `facebook_received_data`, `linkedin_received_data`, `instagram_received_data`, `twitter_received_data`, `active`, `trash`, `created_at`, `updated_at`) VALUES
(126, 89, 'linkedin', 'demo', 'facddddde11111bwwwwook qqq post deep link hkhjhk!', NULL, NULL, '{\"id\":\"urn:li:share:7008828860259577856\"}', NULL, NULL, 0, 0, '2022-12-13 14:36:47', '2022-12-14 16:23:38'),
(127, 89, 'linkedin', 'demo', 'facddd    dde11111bwwwwook qqq post deep link hkhjhk!', NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-12-13 14:36:52', '2022-12-13 14:36:52'),
(128, 89, 'linkedin', 'demo', 'facddd    dde11111bw  wwwook qqq post deep link hkhjhk!', NULL, NULL, '{\"id\":\"urn:li:share:7008439733416554497\"}', NULL, NULL, 0, 0, '2022-12-13 14:37:22', '2022-12-13 14:37:23'),
(129, 89, 'linkedin', 'demo', 'facddd    dde11111bw  wwwook qqq post deep link hkhjhk!', 'dfdsf/dfs cdfsd f f ff/dfdsf.jpg', NULL, '{\"id\":\"urn:li:share:7008445221759795200\"}', NULL, NULL, 0, 0, '2022-12-13 14:59:10', '2022-12-13 14:59:12'),
(130, 89, 'linkedin', 'demo', 'facddd    dde11111bw  wwwook qqq post deep link hkhjhk!', 'dfdsf/dfs cdfsd f f ff/dfdsf.jpg', NULL, NULL, NULL, NULL, 0, 0, '2022-12-13 15:01:19', '2022-12-13 15:01:19'),
(131, 89, NULL, 'demo', 'facddd    dde11111bw  wwwook qqq post deep link hkhjhk!', 'dfdsf/dfs cdfsd f f ff/dfdsf.jpg', NULL, NULL, NULL, NULL, 0, 0, '2022-12-13 15:02:19', '2022-12-13 15:02:19'),
(132, 89, NULL, 'demo', 'facddd    dde11111bw  wwwook qqq post deep link hkhjhk!', 'dfdsf/dfs cdfsd f f ff/dfdsf.jpg', NULL, NULL, NULL, NULL, 0, 0, '2022-12-13 15:03:24', '2022-12-13 15:03:24'),
(133, 89, NULL, 'demo', 'facddd    dde11111bw  wwwook qqq post deep link hkhjhk!', 'dfdsf/dfs cdfsd f f ff/dfdsf.jpg', NULL, NULL, NULL, NULL, 0, 0, '2022-12-13 15:04:01', '2022-12-13 15:04:01'),
(134, 89, NULL, 'demo', 'facddd    dde11111bw  wwwook qqq post deep link hkhjhk!', 'dfdsf/dfs cdfsd f f ff/dfdsf.jpg', NULL, NULL, NULL, NULL, 0, 0, '2022-12-13 15:16:18', '2022-12-13 15:16:18'),
(135, 89, NULL, 'demo', 'facddd    dde11111bw  wwwook qqq post deep link hkhjhk!', 'dfdsf/dfs cdfsd f f ff/dfdsf.jpg', NULL, NULL, NULL, NULL, 0, 0, '2022-12-13 15:17:56', '2022-12-13 15:17:56'),
(136, 89, NULL, 'demo', 'facddd    dde11111bw  wwwook qqq post deep link hkhjhk!', 'dfdsf/dfs cdfsd f f ff/dfdsf.jpg', NULL, NULL, NULL, NULL, 0, 0, '2022-12-13 15:18:27', '2022-12-13 15:18:27'),
(137, 89, NULL, 'demo', 'facddd    dde11111bw  wwwook qqq post deep link hkhjhk!', 'dfdsf/dfs cdfsd f f ff/dfdsf.jpg', NULL, NULL, NULL, NULL, 0, 0, '2022-12-13 15:20:55', '2022-12-13 15:20:55'),
(138, 89, NULL, 'demo', 'facddd    dde11111bw  wwwook qqq post deep link hkhjhk!', 'dfdsf/dfs cdfsd f f ff/dfdsf.jpg', NULL, NULL, NULL, NULL, 0, 0, '2022-12-13 15:21:21', '2022-12-13 15:21:21'),
(139, 89, NULL, 'demo', 'facddd    dde11111bw  wwwook qqq post deep link hkhjhk!', 'dfdsf/dfs cdfsd f f ff/dfdsf.jpg', NULL, NULL, NULL, NULL, 0, 0, '2022-12-13 15:22:04', '2022-12-13 15:22:04'),
(140, 89, NULL, 'demo', 'facddd    dde11111bw  wwwook qqq post deep link hkhjhk!', 'dfdsf/dfs cdfsd f f ff/dfdsf.jpg', NULL, NULL, NULL, NULL, 0, 0, '2022-12-13 15:23:07', '2022-12-13 15:23:07'),
(141, 89, NULL, 'demo', 'facddd    dde11111bw  wwwook qqq post deep link hkhjhk!', 'dfdsf/dfs cdfsd f f ff/dfdsf.jpg', NULL, NULL, NULL, NULL, 0, 0, '2022-12-13 15:42:01', '2022-12-13 15:42:01'),
(142, 89, NULL, 'demo', 'facddd    dde11111bw  wwwook qqq post deep link hkhjhk!', 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', NULL, NULL, NULL, NULL, 0, 0, '2022-12-13 15:43:32', '2022-12-13 15:43:32'),
(143, 89, NULL, 'demo', 'facddd    dde11111bw  wwwook qqq post deep link hkhjhk!', 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', NULL, NULL, NULL, NULL, 0, 0, '2022-12-13 15:44:31', '2022-12-13 15:44:31'),
(144, 89, NULL, 'demo', 'facddd    dde11111bw  wwwook qqq post deep link hkhjhk!', 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', NULL, NULL, NULL, NULL, 0, 0, '2022-12-13 15:45:08', '2022-12-13 15:45:08'),
(145, 89, NULL, 'demo', 'facddd    dde11111bw  wwwook qqq post deep link hkhjhk!', 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', NULL, NULL, NULL, NULL, 0, 0, '2022-12-13 15:45:27', '2022-12-13 15:45:27'),
(146, 89, NULL, 'demo', '11111bw  wwwook qqq post deep link hkhjhk!', 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', NULL, NULL, NULL, NULL, 0, 0, '2022-12-13 15:47:00', '2022-12-13 15:47:00'),
(147, 89, NULL, 'demo', '11111bw  wwwooewwrwerewrewrewrwerwerwerwek qqq post deep link hkhjhk!', 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', NULL, NULL, NULL, NULL, 0, 0, '2022-12-13 15:48:48', '2022-12-13 15:48:48'),
(148, 89, NULL, 'demo', '11111bw  wwwooewwrwerewrewrewrwerwerwerwek qqq post deep link hkhjhk!', 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', NULL, NULL, NULL, NULL, 0, 0, '2022-12-13 15:56:47', '2022-12-13 15:56:47'),
(149, 89, NULL, 'demo', '11111bw  wwwoo2w2w222w2w2w2wewwrwerewrewrewrwerwerwerwek qqq post deep link hkhjhk!', 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', NULL, NULL, NULL, NULL, 0, 0, '2022-12-13 16:07:41', '2022-12-13 16:07:41'),
(150, 89, NULL, 'demo', '11111bw  wwwoo2w2w222w2w2 w2wewwrwerewrewrewrwerwerwerwek qqq po st deep link hkhjhk!', 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', NULL, '\"urn:li:image:C4D10AQGJWDLLC2ndlw\"', NULL, NULL, 0, 0, '2022-12-13 16:45:46', '2022-12-13 16:45:49'),
(151, 89, NULL, 'demo', '11111bw  wwwoo2w2w222w2w2 w2wewwrwerewrewrewrwerwerwerwek qqq po st de sssssssssssssssssssssssssssep link hkhjhk!', NULL, NULL, '{\"id\":\"urn:li:share:7008472133035028481\"}', NULL, NULL, 0, 0, '2022-12-13 16:46:07', '2022-12-13 16:46:08'),
(152, 89, NULL, 'demo', '11111bw  wwwoo2w2w222w2w2 w2wewwrwerewrewrewrwerwerwerwek qqq p1212121o st deep link hkhjhk!', 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', NULL, '\"urn:li:image:C4D10AQH4zQYujxeuWg\"', NULL, NULL, 0, 0, '2022-12-13 16:56:03', '2022-12-13 16:56:06'),
(153, 89, NULL, 'demo', '11111bw  wwwoo2232321321321321321321321w2w222w2w2 w2wewwrwerewrewrewrwerwerwerwek qqq p1212121o st deep link hkhjhk!', 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', NULL, '\"urn:li:image:C4D10AQEM0u2UdIIWLA\"', NULL, NULL, 0, 0, '2022-12-13 16:56:44', '2022-12-13 16:56:46'),
(154, 89, NULL, 'demo', '11111bw  wwwoo2232321321321321 3 3 321321321w2w222w2w2 w2wewwrwerewrewrewrwerwerwerwek qqq p1212121o st deep link hkhjhk!', 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', NULL, NULL, NULL, NULL, 0, 0, '2022-12-13 16:59:47', '2022-12-13 16:59:47'),
(155, 89, NULL, 'demo', '11111bw  wwwoo22aaaaaaaaaa21321321w2w222w2w2 w2wewwrwerewrewrewrwerwerwerwek qqq p1212121o st deep link hkhjhk!', 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', NULL, NULL, NULL, NULL, 0, 0, '2022-12-13 17:01:59', '2022-12-13 17:01:59'),
(156, 89, NULL, 'demo', '11111bw  wwwoo22aaaaaaaaaa21321321w2w222w2w2 w2wewwrwerewrewrewrwerwerwerwek qqq p1212121o st deep link hkhjhk!', 'data:image/jpeg;base64,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', NULL, NULL, NULL, NULL, 0, 0, '2022-12-13 17:02:40', '2022-12-13 17:02:40'),
(157, 89, NULL, 'demo', '11111bw  wwwoo22aaaaaaxxxxxaaaa21321321w2w222w2w2 w2wewwrwerewrewrewrwerwerwerwek qqq p1212121o st deep link hkhjhk!', 'data:image/jpeg;base64,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', NULL, '\"success\"', NULL, NULL, 0, 0, '2022-12-13 17:03:40', '2022-12-13 17:03:43'),
(158, 89, NULL, 'demo', '1ddddddo22aaaaaaxxxxxaaaa21321321w2w222w2w2 w2wewwrwerewrewrewrwerwerwerwek qqq p1212121o st deep link hkhjhk!', 'data:image/jpeg;base64,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', NULL, '\"success\"', NULL, NULL, 0, 0, '2022-12-13 17:05:17', '2022-12-13 17:05:20'),
(159, 89, NULL, 'demo', '13333333333333xxxxxaaaa21321321w2w222w2w2 w2wewwrwerewrewrewrwerwerwerwek qqq p1212121o st deep link hkhjhk!', 'data:image/jpeg;base64,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', NULL, '\"urn:li:share:7008477248932462596\"', NULL, NULL, 0, 0, '2022-12-13 17:06:25', '2022-12-13 17:06:28'),
(160, 89, NULL, 'demo', '11111bw  wwwoo22aaaaaaaaa rr rr rr rr a21321321w2w222w2w2 w2wewwrwerewrewrewrwerwerwerwek qqq p1212121o st deep link hkhjhk!', 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', NULL, NULL, NULL, NULL, 1, 0, '2022-12-13 18:16:23', '2022-12-13 18:16:23'),
(161, 89, NULL, 'demo', '11111bw  wwwoo22aaaaaaaaa rr rr rr rr a21321321w2w222w2w2 w2wewwrw rr rr rr erewrewrewrwerwerwerwek qqq p1212121o st deep link hkhjhk!', 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', NULL, '\"urn:li:share:7008495282816495616\"', NULL, NULL, 1, 0, '2022-12-13 18:18:04', '2022-12-13 18:18:07'),
(162, 89, NULL, 'demo', '11111bw  wwwoo22aaaaaaaaa rr rr rr rr a21321321w2w222w2w2 w2wewwrw rr rr rr erewrewrewrwerwerwerwek qqq p1212121o st deep link hkhjhk!', NULL, NULL, '{\"id\":\"urn:li:share:7008495559938355200\"}', NULL, NULL, 1, 0, '2022-12-13 18:19:12', '2022-12-13 18:19:13'),
(163, 89, NULL, 'demo', '11111bw  wwwoo22aaaaaaaaa rr rr rr rr a21321321w2w2 vvvv vvv22w2w2 w2wewwrw rr rr rr erewrewrewrwerwerwerwek qqq p1212121o st deep link hkhjhk!', 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', NULL, '\"urn:li:share:7008500590548807680\"', NULL, NULL, 1, 0, '2022-12-13 18:39:09', '2022-12-13 18:39:13'),
(164, 89, NULL, 'demo', '11111bw  wwwoo22aaaaaaaaaa213213    21w2w222w2w2 w2wewwrwerewrewrewrwerwerwerwek qqq p1212121o st deep link hkhjhk!', 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', NULL, '\"urn:li:share:7008501971879923712\"', NULL, NULL, 0, 0, '2022-12-13 18:44:39', '2022-12-13 18:44:42'),
(165, 89, NULL, 'demo', '4444444444444444444444 44444', NULL, NULL, '{\"id\":\"urn:li:share:7008502951967092736\"}', NULL, NULL, 0, 0, '2022-12-13 18:48:34', '2022-12-13 18:48:36');
INSERT INTO `posts` (`id`, `user_id`, `medium`, `title`, `description`, `images`, `facebook_received_data`, `linkedin_received_data`, `instagram_received_data`, `twitter_received_data`, `active`, `trash`, `created_at`, `updated_at`) VALUES
(166, 89, NULL, 'demo', '111111111111111111111111111111112 w2wewwrwerewrewrewrwerwerwerwek qqq p1212121o st deep link hkhjhk!', 'data:image/jpeg;base64,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', NULL, '\"urn:li:share:7008503470634774528\"', NULL, NULL, 0, 0, '2022-12-13 18:50:36', '2022-12-13 18:50:39'),
(167, 89, NULL, 'demo', '99999911111bw  wwwoo22aaaa dd aaaaaa213213    21w2w222w2w2 w2wewwrwerewrewrewrwerwerwerwek qqq p1212121o st deep link hkhjhk!', NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-12-13 18:55:29', '2022-12-13 18:55:29'),
(168, 89, NULL, 'demo', '99999911111bw  wwwoo22aaaa dd aaaaaa213213    21w2w222w2w2 w2wewwrwerewrewrewrwerwerwerwek qqq p1212121o st deep link hkhjhk!', NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-12-13 18:56:31', '2022-12-13 18:56:31'),
(169, 89, NULL, 'demo', '11111bw  wwwoo22aaaaaaaaaa213213    21w2w222w2w2 w2wewwrwerewrewrewrwerwerwerwek qqq p1212121o st deep link hkhjhk!', 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', NULL, '\"urn:li:share:7008505387003875328\"', NULL, NULL, 0, 0, '2022-12-13 18:58:13', '2022-12-13 18:58:16'),
(170, 89, NULL, 'demo', '3434343434343434343  wwwoo22aaaaaaaaaa213213    21w2w222w2w2 w2wewwrwerewrewrewrwerwerwerwek qqq p1212121o st deep link hkhjhk!', '/uploads/posts/1.png', NULL, NULL, NULL, NULL, 0, 0, '2022-12-13 19:19:55', '2022-12-13 19:19:55'),
(171, 89, NULL, 'demo', '3434343434343434343  wwwoo22aaaaaaaaaa213213    21w2w222w2w2 w2wewwrwerewrewrewrwerwerwerwek qqq p1212121o st deep link hkhjhk!', '/uploads/posts/1.png', NULL, NULL, NULL, NULL, 0, 0, '2022-12-13 19:20:50', '2022-12-13 19:20:50'),
(172, 89, NULL, 'demo', '3434343434343434343  wwwoo22aaaaaaaaaa213213    21w2w222w2w2 w2wewwrwerewrewrewrwerwerwerwek qqq p1212121o st deep link hkhjhk!', '/uploads/posts/1.png', NULL, NULL, NULL, NULL, 0, 0, '2022-12-13 19:21:35', '2022-12-13 19:21:35'),
(173, 89, NULL, 'demo', '3434343434343434343  wwwoo22aaaaaaaaaa213213    21w2w222w2w2 w2wewwrwerewrewrewrwerwerwerwek qqq p1212121o st deep link hkhjhk!', '/uploads/posts/1.png', NULL, '\"urn:li:share:7008519182979903488\"', NULL, NULL, 0, 0, '2022-12-13 19:53:02', '2022-12-13 19:53:05'),
(174, 89, NULL, 'demo', '3434343434343434343  wwwoo22aaaaaaaaaa213213    21w2w222w2w2 w2wewwrwerewrewrewrwerwerwerwek qqq p1212121o st deep link hkhjhk!', '/uploads/posts/188.png', NULL, NULL, NULL, NULL, 0, 0, '2022-12-13 19:53:19', '2022-12-13 19:53:19'),
(175, 89, NULL, 'demo', '3434343434343434343  wwwoo22aaaaaaaaaa213213    21w2w222w2w2 w2wewwrwerewrewrewrwerwerwerwek qqq p1212121o st deep link hkhjhk!', '/uploads/posts/1.png', NULL, '\"urn:li:share:7008519333282738176\"', NULL, NULL, 0, 0, '2022-12-13 19:53:38', '2022-12-13 19:53:41'),
(176, 89, NULL, 'demo', '3434343434343434343  wwwoo22aaaaaaaaaa213213    21w2w222w2w2 w2wewwrwerewrewrewrwerwerwerwek qqq p1212121o st deep link hkhjhk!', '/uploads/posts/1.png', NULL, '\"urn:li:share:7008519588724289536\"', NULL, NULL, 0, 0, '2022-12-13 19:54:39', '2022-12-13 19:54:42'),
(177, 89, NULL, 'demo', '3434343434343434343  wwwoo22aaaaaaaaaa213213    21w2w222w2w2 w2wewwrwerew 44brewrewrwerwerwerwek qqq p1212121o st deep link hkhjhk!', '/uploads/posts/1.png', NULL, NULL, NULL, NULL, 0, 0, '2022-12-14 09:34:27', '2022-12-14 09:34:27'),
(178, 89, NULL, 'demo', '3434343434343434343  wwwoo22aa33 333 333 333  3333 3333aaaaaaaa213213    21w2w222w2w2 w2wewwrwerew 44brewrewrwerwerwerwek qqq p1212121o st deep link hkhjhk!', 'https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', NULL, NULL, NULL, NULL, 0, 0, '2022-12-14 14:27:55', '2022-12-14 14:27:55'),
(179, 89, NULL, 'demo', '3434343434343434343  wwwoo22aa33 333 333 333  3333 3333aaaaaaaa213213    21w2w222w2w2 w2wewwrwerew 44brewrewrwerwerwerwek qqq p1212121o st deep link hkhjhk!', 'https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', NULL, NULL, NULL, NULL, 0, 0, '2022-12-14 14:32:22', '2022-12-14 14:32:22'),
(180, 89, NULL, 'demo', '3434343434343434343  wwwoo22aa33 333 333 333  3333aaaaaaaa213213    21w2w222w2w2 w2wewwrwerew 44brewrewrwerwerwerwek qqq p1212121o st deep link hkhjhk!', '/uploads/posts/1.png', NULL, NULL, NULL, NULL, 0, 0, '2022-12-14 14:32:52', '2022-12-14 14:32:52'),
(181, 89, NULL, 'demo', '3434343434343434343  wwwoo22aa33 333 333 333  3333aaaaaaaa213213    21w2w222w2w2 w2wewwrwerew 44brewrewrwerwerwerwek qqq p1212121o st deep link hkhjhk!', '/uploads/posts/1.png', NULL, '\"urn:li:share:7008801212661673984\"', NULL, NULL, 0, 0, '2022-12-14 14:33:43', '2022-12-14 14:33:46'),
(182, 89, NULL, 'demo', '3434343434343434343  wwwoo22aa33 333 333 333  3333aaaaaaaa213213    21w2w222w2w2 w2wewwrwerew 44brewrewrwerwerwerwek qqq p12121 ddd ddd 21o st deep link hkhjhk!', NULL, NULL, '{\"id\":\"urn:li:share:7008803675296940033\"}', NULL, NULL, 0, 0, '2022-12-14 14:43:32', '2022-12-14 14:43:33'),
(183, 89, NULL, 'demo', 'photo demo', '/uploads/posts/1.png', NULL, '\"urn:li:share:7008803890657681408\"', NULL, NULL, 0, 0, '2022-12-14 14:44:21', '2022-12-14 14:44:24'),
(184, 89, NULL, 'demo', 'photo demo 11', '/uploads/posts/1.png', NULL, '\"urn:li:share:7008805148391030784\"', NULL, NULL, 0, 0, '2022-12-14 14:49:21', '2022-12-14 14:49:24'),
(185, 89, NULL, 'demo', 'photo demo 11', '/uploads/posts/1.png', NULL, '\"urn:li:share:7008805636314394624\"', NULL, NULL, 0, 0, '2022-12-14 14:51:17', '2022-12-14 14:51:21'),
(186, 89, NULL, 'demo', 'photo demo 1222221', '/uploads/posts/1.png', NULL, NULL, NULL, NULL, 0, 0, '2022-12-14 14:54:29', '2022-12-14 14:54:29'),
(187, 89, NULL, 'demo', 'photo demo 1222221', '/uploads/posts/1.png', NULL, NULL, NULL, NULL, 0, 0, '2022-12-14 14:55:43', '2022-12-14 14:55:43'),
(188, 89, NULL, 'demo', 'photo demo 1222221', '/uploads/posts/1.png', NULL, NULL, NULL, NULL, 0, 0, '2022-12-14 14:56:21', '2022-12-14 14:56:21'),
(189, 89, NULL, 'demo', 'photo demo 1222221', '/uploads/posts/1.png', NULL, '\"urn:li:share:7008807345635880960\"', NULL, NULL, 0, 0, '2022-12-14 14:58:05', '2022-12-14 14:58:08'),
(190, 89, NULL, 'demo', 'photo dd dd d d d d d d d  dd demo 1222221', '/uploads/posts/1.png', NULL, '\"urn:li:share:7008807902333317123\"', NULL, NULL, 0, 0, '2022-12-14 15:00:18', '2022-12-14 15:00:21'),
(191, 89, NULL, 'demo', 'photo dd dd d d d1111 1111 d d d d  dd demo 1222221', '/uploads/posts/1.png', NULL, '\"urn:li:share:7008810909468930049\"', NULL, NULL, 0, 0, '2022-12-14 15:12:15', '2022-12-14 15:12:18'),
(192, 89, NULL, 'demo', 'photo dd dd d d d1111 1111 d d d d  dd demo 1222221', '/uploads/posts/1.png', NULL, '\"urn:li:share:7008811602284032000\"', NULL, NULL, 0, 0, '2022-12-14 15:14:55', '2022-12-14 15:15:03'),
(193, 89, NULL, 'demo', 'photo dd dd11111 d d d1111 1111 d d d d  dd demo 1222221', '/uploads/posts/1.png', NULL, '\"urn:li:share:7008812838676754432\"', NULL, NULL, 0, 0, '2022-12-14 15:19:54', '2022-12-14 15:19:58'),
(194, 89, NULL, 'demo', '44444444444444444444 1 d d d d  dd demo 1222221', '/uploads/posts/1.png', NULL, '\"urn:li:share:7008815989429538817\"', NULL, NULL, 0, 0, '2022-12-14 15:32:26', '2022-12-14 15:32:29'),
(195, 89, NULL, 'demo', '222222222222222222 1 d d d d  dd demo 1222221', '/uploads/posts/1.png', NULL, '\"urn:li:share:7008816235815571457\"', NULL, NULL, 0, 0, '2022-12-14 15:33:23', '2022-12-14 15:33:28'),
(196, 89, NULL, 'demo', '222222222222222222 1 d d d d  dd demo 1222221', '/uploads/posts/1.png', NULL, '\"urn:li:share:7008816482251902976\"', NULL, NULL, 0, 0, '2022-12-14 15:34:23', '2022-12-14 15:34:27'),
(197, 89, NULL, 'demo', '222222222222222222 1 d d d d  dd demo 1222221', '/uploads/posts/1.png', NULL, '\"urn:li:share:7008817567947452417\"', NULL, NULL, 1, 0, '2022-12-14 15:38:42', '2022-12-14 15:38:45'),
(198, 89, NULL, 'demo', 'facebook post de dd dd ep link hkhjhk!', 'https://1000logos.net/wp-content/uploads/2020/05/Google-Photos-logo-400x400.png', NULL, NULL, NULL, NULL, 0, 0, '2022-12-14 16:21:35', '2022-12-14 16:21:35'),
(199, 89, NULL, 'demo', 'facebook post de dd dd ep link hkhjhk!', 'https://1000logos.net/wp-content/uploads/2020/05/Google-Photos-logo-400x400.png', NULL, NULL, NULL, NULL, 0, 0, '2022-12-14 17:16:14', '2022-12-14 17:16:14'),
(200, 89, NULL, 'demo', 'facebook post de dd dd ep link hkhjhk!', NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-12-14 17:18:06', '2022-12-14 17:18:06'),
(201, 89, NULL, 'demo', 'facebook post de dd dd ep link hkhjhk!', 'https://1000logos.net/wp-content/uploads/2020/05/Google-Photos-logo-400x400.png', NULL, NULL, NULL, NULL, 0, 0, '2022-12-14 17:35:03', '2022-12-14 17:35:03'),
(202, 89, NULL, 'demo', '{\"text\":\"Tweeting a DMdd deepdd lidddddddd t t ddddncddcck!\",\"direct_message_deep_link\":\"https://twitter.com/messages/compose?recipient_id=1593424514246791168\"}', NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-12-14 17:40:00', '2022-12-14 17:40:00'),
(203, 89, NULL, 'demo', '{\"text\":\"Tweeting a DMdd deepdd lidddddddd t t ddddncddcck!\",\"direct_message_deep_link\":\"https://twitter.com/messages/compose?recipient_id=1593424514246791168\"}', NULL, NULL, NULL, NULL, '{\"data\":{\"id\":\"1603085343586078721\",\"text\":\"Tweeting a DMdd deepdd lidddddddd t t ddddncddcck! https://t.co/rgQChqiy92\"}}', 0, 0, '2022-12-14 17:51:43', '2022-12-14 17:51:44'),
(204, 89, NULL, 'demo', '22222222 c c c c c c c c c2222222222 1 d d d d  dd demo 1222221', '/uploads/posts/1.png', NULL, '\"urn:li:share:7008854082702458880\"', NULL, '{\"data\":{\"id\":\"1603088382703243264\",\"text\":\"22222222 c c c c c c c c c2222222222 1 d d d d  dd demo 1222221\"}}', 1, 0, '2022-12-14 18:03:48', '2022-12-14 18:03:51'),
(205, 89, NULL, 'demo', '222222222222222222  fffff1 d d d d  dd demo 1222221', NULL, NULL, '\"\"', NULL, NULL, 0, 0, '2022-12-16 13:41:33', '2022-12-16 13:41:35'),
(206, 89, NULL, 'demo', 'facdddddebwwwwook qqq post deep link hkhjhk!', NULL, NULL, NULL, NULL, NULL, 0, 0, '2022-12-16 13:49:20', '2022-12-16 13:49:20');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `parent_role` bigint(20) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `active` tinyint(1) DEFAULT 0,
  `trash` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `title`, `parent_role`, `description`, `active`, `trash`, `created_at`, `updated_at`) VALUES
(1, 'super_admin', NULL, 'super_admin', 1, 0, '2021-09-17 06:48:33', '2022-09-02 10:49:02'),
(2, 'client', NULL, 'client', 1, 0, '2021-09-17 06:48:33', '2022-11-24 13:22:06');

-- --------------------------------------------------------

--
-- Table structure for table `role_permission`
--

CREATE TABLE `role_permission` (
  `id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  `module_id` bigint(20) NOT NULL,
  `access` varchar(50) NOT NULL DEFAULT '0,0,0,0',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role_permission`
--

INSERT INTO `role_permission` (`id`, `role_id`, `module_id`, `access`, `created_at`) VALUES
(1, 1, 1, '1,1,1,1', '2022-08-18 10:20:07'),
(2, 1, 2, '1,1,1,1', '2022-08-18 10:20:07'),
(3, 1, 3, '1,1,1,1', '2022-08-18 10:20:07'),
(4, 1, 4, '1,1,1,1', '2022-08-18 10:20:07'),
(5, 1, 5, '1,1,1,1', '2022-08-18 10:20:07'),
(6, 1, 6, '1,1,1,1', '2022-08-18 10:20:07'),
(51, 2, 5, '1,1,1,1', '2022-08-18 10:20:07'),
(52, 2, 6, '1,1,1,1', '2022-08-18 10:20:07');

-- --------------------------------------------------------

--
-- Table structure for table `twitter`
--

CREATE TABLE `twitter` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `client_id` longtext DEFAULT NULL,
  `client_secret` longtext DEFAULT NULL,
  `redirect_uri` longtext DEFAULT NULL,
  `refresh_token` longtext DEFAULT NULL,
  `refresh_token_expires_in` varchar(255) DEFAULT NULL,
  `token` longtext DEFAULT NULL,
  `token_expires_in` varchar(255) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `trash` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `twitter`
--

INSERT INTO `twitter` (`id`, `user_id`, `client_id`, `client_secret`, `redirect_uri`, `refresh_token`, `refresh_token_expires_in`, `token`, `token_expires_in`, `active`, `trash`, `created_at`, `updated_at`) VALUES
(1, 1, 'VlJIcjN5UlBRU21ldllDUUhCTVg6MTpjaQ', '8kxMpeazBOUB3YmUYaO4YAzdI6YHX2wksZTPbCVxJUia9U2S5s', 'https://ajivatech.com/twitter/index.php', NULL, NULL, 'U3hjdnpBUnFNNWxWd3BISjdpUmpFWndhZi1jS0Rua20wWTVkLW9VdTlUUTFTOjE2NzEwNDAyNzU2MzA6MToxOmF0OjE', '7200', 1, 0, '2022-11-25 17:55:08', '2022-12-14 17:51:33'),
(2, 89, NULL, NULL, 'https://ajivatech.com/twitter/index.php', NULL, NULL, 'eXpjRUtuNmYzTVdXWnphUlBzTS1lOTZuRHhmQURuYTBFOWhRZ1N3U0lDNjVTOjE2NzEwNDEzMzkzNTQ6MTowOmF0OjE', '7200', 1, 0, '2022-12-07 11:42:49', '2022-12-14 18:08:59');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `first_Name` varchar(50) NOT NULL,
  `middle_Name` varchar(50) DEFAULT NULL,
  `last_Name` varchar(50) NOT NULL,
  `nick_name` varchar(255) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `phone_verify` int(1) DEFAULT 0,
  `password` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `email_verify` int(1) DEFAULT 0,
  `verification_code` varchar(255) DEFAULT NULL,
  `media_type` varchar(50) DEFAULT NULL COMMENT 'media_type',
  `token_id` varchar(255) DEFAULT NULL,
  `device_id` varchar(255) DEFAULT NULL,
  `access_token` longtext DEFAULT NULL,
  `access_token_expires_in` varchar(255) DEFAULT NULL,
  `refresh_token` longtext DEFAULT NULL,
  `refresh_token_expires_in` varchar(255) DEFAULT NULL,
  `address_line1` varchar(100) DEFAULT NULL,
  `address_line2` varchar(100) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `postal_code` varchar(50) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `date_of_birth` varchar(100) DEFAULT NULL,
  `ipaddress` varchar(20) DEFAULT NULL,
  `slug` varchar(50) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `trash` tinyint(1) NOT NULL DEFAULT 0,
  `description` longtext DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_Name`, `middle_Name`, `last_Name`, `nick_name`, `phone`, `phone_verify`, `password`, `email`, `email_verify`, `verification_code`, `media_type`, `token_id`, `device_id`, `access_token`, `access_token_expires_in`, `refresh_token`, `refresh_token_expires_in`, `address_line1`, `address_line2`, `city`, `state`, `country`, `postal_code`, `image`, `gender`, `date_of_birth`, `ipaddress`, `slug`, `active`, `trash`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Super', NULL, 'Admin', NULL, '9876543210', 0, '$2b$10$6yWabx3gljUQ1PgnpHvATeg0g6smv4Sc92GXXQnYZ8gVi9CyKA9C6', 'superadmin@gmail.com', 0, '054381', NULL, NULL, NULL, 'MjczZTUxOWEtODcyNi00MjY0LTljZDctODc5OGNmNzc2NjdlMmRkZDk5ZmE0NGU1NjhiNGI4MmVmM2MzZjNiZTJmMjI=', 'Fri Feb 03 2023 21:27:51 GMT+0530', '7975949683622a0a3d50f6d5ffbe8ce4', 'Sat Feb 03 2024 20:27:51 GMT+0530', 'address_line1', 'address_line2', 'city', 'state', 'uk', '145662', '/image/demo.jpg', 'male', '2021-11-01', NULL, NULL, 1, 0, NULL, '2021-09-15 07:46:52', '2023-02-03 14:57:51'),
(2, 'Client1', NULL, 'demici', NULL, '1234567890', 0, '$2b$10$6yWabx3gljUQ1PgnpHvATeg0g6smv4Sc92GXXQnYZ8gVi9CyKA9C6', 'client1@gmail.com', 0, '054380', NULL, NULL, NULL, NULL, NULL, '4ffd54ec88c8c65c6d98db7f6ce7e0ff', 'Wed Dec 13 2023 19:51:08 GMT+0530', 'address_line1', 'address_line2', 'city', 'state', 'russia', '145662', '/image/demo.jpg', 'male', '2021-12-13', NULL, NULL, 1, 0, NULL, '2021-11-26 08:26:24', '2022-12-13 14:21:11'),
(3, 'Client2', NULL, 'demici', NULL, '12345678902', 0, '$2b$10$6yWabx3gljUQ1PgnpHvATeg0g6smv4Sc92GXXQnYZ8gVi9CyKA9C6', 'client2@gmail.com', 0, '054380', NULL, NULL, NULL, NULL, NULL, 'c191aa4c6d0d6d71633533028b223c79', 'Sat Nov 25 2023 01:15:44 GMT+0530', 'address_line1', 'address_line2', 'city', 'state', 'russia', '145662', '/image/demo.jpg', 'male', '2021-12-13', NULL, NULL, 1, 0, NULL, '2021-11-26 08:26:24', '2022-11-25 01:04:13'),
(89, 'khush', NULL, 'singh', NULL, '23441332234', 0, '$2b$10$ptHT3LHC2CoNuCvMJNAE7ez.xxM/1/eMwEo.QjJNcY5ASn3bJyOwS', 'khushvirsgl@gmail.com', 0, '717333', NULL, NULL, NULL, 'OWQwOTc1MWEtOTllZS00YjU4LWE3MTEtNWZjOGQzZTAyYzEwMmRkZDk5ZmE0NGU1NjhiNGI4MmVmM2MzZjNiZTJmMjI=', 'Wed Dec 14 2022 22:50:57 GMT+0530', '614d5173c2f177ca8629f42e162d754d', 'Thu Dec 14 2023 21:50:57 GMT+0530', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, '2022-12-07 11:42:49', '2022-12-30 08:51:52');

-- --------------------------------------------------------

--
-- Table structure for table `users_role`
--

CREATE TABLE `users_role` (
  `id` bigint(20) NOT NULL,
  `users_id` bigint(20) NOT NULL,
  `role` bigint(20) NOT NULL COMMENT 'select role id from dashboard',
  `active` tinyint(1) DEFAULT 0,
  `trash` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_role`
--

INSERT INTO `users_role` (`id`, `users_id`, `role`, `active`, `trash`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 0, '2022-03-12 13:09:16', '2022-03-12 13:09:16'),
(2, 2, 2, 1, 0, '2022-03-12 13:09:16', '2022-11-24 13:26:44'),
(3, 3, 2, 1, 0, '2022-03-12 13:09:16', '2022-11-25 01:04:33'),
(87, 89, 2, 1, 0, '2022-12-07 11:42:49', '2022-12-07 11:42:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `configuration`
--
ALTER TABLE `configuration`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `config_key` (`config_key`);

--
-- Indexes for table `facebook`
--
ALTER TABLE `facebook`
  ADD PRIMARY KEY (`id`),
  ADD KEY `facebook_ibfk_1` (`user_id`);

--
-- Indexes for table `global_variables`
--
ALTER TABLE `global_variables`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `instagram`
--
ALTER TABLE `instagram`
  ADD PRIMARY KEY (`id`),
  ADD KEY `facebook_ibfk_1` (`user_id`);

--
-- Indexes for table `linkedin`
--
ALTER TABLE `linkedin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `facebook_ibfk_1` (`user_id`);

--
-- Indexes for table `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_id` (`user_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role_permission`
--
ALTER TABLE `role_permission`
  ADD PRIMARY KEY (`id`),
  ADD KEY `module_id` (`module_id`),
  ADD KEY `users_role_permission_ibfk_1` (`role_id`);

--
-- Indexes for table `twitter`
--
ALTER TABLE `twitter`
  ADD PRIMARY KEY (`id`),
  ADD KEY `facebook_ibfk_1` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- Indexes for table `users_role`
--
ALTER TABLE `users_role`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_id` (`users_id`),
  ADD KEY `role` (`role`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `configuration`
--
ALTER TABLE `configuration`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=245;

--
-- AUTO_INCREMENT for table `facebook`
--
ALTER TABLE `facebook`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `global_variables`
--
ALTER TABLE `global_variables`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `instagram`
--
ALTER TABLE `instagram`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `linkedin`
--
ALTER TABLE `linkedin`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `modules`
--
ALTER TABLE `modules`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=207;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `role_permission`
--
ALTER TABLE `role_permission`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=328;

--
-- AUTO_INCREMENT for table `twitter`
--
ALTER TABLE `twitter`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `users_role`
--
ALTER TABLE `users_role`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `facebook`
--
ALTER TABLE `facebook`
  ADD CONSTRAINT `facebook_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `instagram`
--
ALTER TABLE `instagram`
  ADD CONSTRAINT `instagram_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `linkedin`
--
ALTER TABLE `linkedin`
  ADD CONSTRAINT `linkedin_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `role_permission`
--
ALTER TABLE `role_permission`
  ADD CONSTRAINT `role_permission_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  ADD CONSTRAINT `role_permission_ibfk_2` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`);

--
-- Constraints for table `twitter`
--
ALTER TABLE `twitter`
  ADD CONSTRAINT `twitter_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `users_role`
--
ALTER TABLE `users_role`
  ADD CONSTRAINT `users_role_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `users_role_ibfk_4` FOREIGN KEY (`role`) REFERENCES `role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
