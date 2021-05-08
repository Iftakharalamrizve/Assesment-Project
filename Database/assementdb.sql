-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 09, 2021 at 12:38 AM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sanctumtest`
--

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `basic_salary` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `house_rent` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `medical` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tax` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `name`, `email`, `mobile`, `basic_salary`, `house_rent`, `medical`, `tax`, `created_at`, `updated_at`) VALUES
(2, 'iftakhar Alam', 'tesest@gmailc.om', '345345', '3800', '5000', '500', 5, '2021-05-08 13:12:52', '2021-05-08 13:16:22');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_100000_create_password_resets_table', 1),
(2, '2019_08_19_000000_create_failed_jobs_table', 1),
(3, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(4, '2020_09_11_194629_create_table_users', 1),
(5, '2021_05_07_104615_create_table_employees', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\User', 1, 'admin', '733fde362c0e25e7d94cb46284179a5007f931e95a0782e912ca9aae185ebbc7', '[\"*\"]', NULL, '2021-05-07 05:12:59', '2021-05-07 05:12:59'),
(2, 'App\\User', 1, 'admin', 'f704a3872b284d1dc6524033d516ac46fab8c6f20e56d8956c6221b4d3e53c1f', '[\"*\"]', NULL, '2021-05-07 05:13:56', '2021-05-07 05:13:56'),
(3, 'App\\User', 1, 'admin', '2e95d24821d39c2ff19b0735f1df2b08e4f279ea9b9bcbf056e0195656ef3853', '[\"*\"]', NULL, '2021-05-07 19:58:38', '2021-05-07 19:58:38'),
(4, 'App\\User', 1, 'admin', '5014ddab792c5fdf07e970cac3e23775c1e42868df1831faf979b7c5d91db554', '[\"*\"]', NULL, '2021-05-08 02:42:33', '2021-05-08 02:42:33'),
(5, 'App\\User', 1, 'admin', 'c694b777ddff09da269928385be1e9645016563ff6c29c78175dd054cb0e2020', '[\"*\"]', NULL, '2021-05-08 03:16:12', '2021-05-08 03:16:12'),
(6, 'App\\User', 1, 'admin', '89151afe0774668576500da9a9b62288fd6160a9ef1f29e4bf0211d00d796036', '[\"*\"]', NULL, '2021-05-08 03:22:24', '2021-05-08 03:22:24'),
(7, 'App\\User', 1, 'admin', '6c9a52003dd34dddcea7b45139e6ba95d80ea7c353d786de467cfaf16239861e', '[\"*\"]', NULL, '2021-05-08 03:31:57', '2021-05-08 03:31:57'),
(8, 'App\\User', 1, 'admin', '650177d6e13a5b291a32b1f7123dabf2337a8ba5d886d195b0fae54883fc6b5d', '[\"*\"]', NULL, '2021-05-08 03:36:55', '2021-05-08 03:36:55'),
(9, 'App\\User', 1, 'admin', 'e75f70723fbb033b3b4ca5eab3ad194880ddccde0059e4a15601bcf9b773c77e', '[\"*\"]', NULL, '2021-05-08 03:37:41', '2021-05-08 03:37:41'),
(10, 'App\\User', 1, 'admin', '5b0e6006cc05e364da09ae57096bab1087863a0e0f39d0084cc6b9dcdaa80b63', '[\"*\"]', NULL, '2021-05-08 03:48:26', '2021-05-08 03:48:26'),
(11, 'App\\User', 1, 'admin', '48c5b559c81f57113ab7c18579221ff83571b1a78c5d090490b9b03f748c7db8', '[\"*\"]', NULL, '2021-05-08 06:03:03', '2021-05-08 06:03:03'),
(12, 'App\\User', 1, 'admin', 'df6e36ca9a0ef5fe02d261fb66520f8dcea264d492fae8ea3022325f503fa81a', '[\"*\"]', NULL, '2021-05-08 16:16:53', '2021-05-08 16:16:53');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dob` date NOT NULL,
  `invalid_time` datetime DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `mobile`, `email`, `image`, `dob`, `invalid_time`, `password`, `created_at`, `updated_at`) VALUES
(7, 'Iftakhar Alam ', '01234324324', 'iftakhar@test.com', '', '1998-05-04', NULL, '$2y$10$tBBm.thRSxqoiD4MxsBDped54fCkoHi4ZxNYYiI3UeXwKLQlGIG36', '2021-05-08 16:23:37', '2021-05-08 16:23:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_mobile_unique` (`mobile`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
