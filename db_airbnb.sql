-- Adminer 4.8.1 MySQL 8.0.33 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

create database air_bnb;

use air_bnb;

DROP TABLE IF EXISTS `book_room`;
CREATE TABLE `book_room` (
  `br_id` int NOT NULL AUTO_INCREMENT,
  `re_id` int NOT NULL,
  `user_id` int NOT NULL,
  `book_date` date NOT NULL,
  `checkout_date` date NOT NULL,
  `amount_people` int NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`br_id`),
  KEY `re_id` (`re_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `book_room_ibfk_1` FOREIGN KEY (`re_id`) REFERENCES `real_estate` (`re_id`),
  CONSTRAINT `book_room_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `book_room` (`br_id`, `re_id`, `user_id`, `book_date`, `checkout_date`, `amount_people`, `created`) VALUES
(1,	1,	1,	'2023-06-01',	'2023-06-03',	3,	'2023-06-03 06:12:52'),
(2,	2,	2,	'2023-06-02',	'2023-06-03',	4,	'2023-06-03 06:18:50');

DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `cmt_id` int NOT NULL AUTO_INCREMENT,
  `re_id` int NOT NULL,
  `user_id` int NOT NULL,
  `content` varchar(500) DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`cmt_id`),
  KEY `user_id` (`user_id`),
  KEY `re_id` (`re_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`re_id`) REFERENCES `real_estate` (`re_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `location`;
CREATE TABLE `location` (
  `location_id` int NOT NULL AUTO_INCREMENT,
  `location_name` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `location` (`location_id`, `location_name`, `city`, `country`, `image`) VALUES
(1,	'ktx khu B',	'hcm',	'vietnam',	''),
(2,	'ktx khu A',	'hcm',	'vietnam',	''),
(3,	'a',	'thu duc',	'viet nam',	'168571799461738b17d0a-ebd5-4fce-b89e-67adf41993c8fatcat.png');

DROP TABLE IF EXISTS `real_estate`;
CREATE TABLE `real_estate` (
  `re_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(200) NOT NULL,
  `type` enum('rooms','castles','beachfront','iconiccities','desert','omg','adapted','hanoks','amazingpools','lakefront','amazingviews') NOT NULL,
  `images` json NOT NULL,
  `location_id` int NOT NULL,
  `capacity` int NOT NULL,
  `room_amount` int NOT NULL,
  `bed_amount` int NOT NULL,
  `bathroom_amount` int NOT NULL,
  `description` varchar(2000) NOT NULL,
  `price` int NOT NULL,
  `washingmachine` tinyint(1) NOT NULL,
  `iron` tinyint(1) NOT NULL,
  `television` tinyint(1) NOT NULL,
  `airconditioner` tinyint(1) NOT NULL,
  `wifi` tinyint(1) NOT NULL,
  `kitchen` tinyint(1) NOT NULL,
  `parkinglot` tinyint(1) NOT NULL,
  `pool` tinyint(1) NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`re_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `real_estate_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `real_estate` (`re_id`, `user_id`, `name`, `type`, `images`, `location_id`, `capacity`, `room_amount`, `bed_amount`, `bathroom_amount`, `description`, `price`, `washingmachine`, `iron`, `television`, `airconditioner`, `wifi`, `kitchen`, `parkinglot`, `pool`, `created`, `updated`) VALUES
(1,	1,	'the big room',	'rooms',	'\"16855204608460ad5eda0-4820-4b0e-bb3a-52264d0af972V.png\"',	3,	1,	3,	2,	3,	'this is description',	122222,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-24 08:04:05',	NULL),
(2,	1,	'The villa has sea view',	'beachfront',	'\"168492088490215f7a777-b92e-49f4-9328-0dcd605cedb2V.png_1684920884903a0f5913c-01f3-4463-aae7-a1ce1f9d66aefatcat.png\"',	2,	1,	3,	3,	3,	'this is description',	200000,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-24 09:34:45',	NULL),
(3,	1,	'The villa has sea view2',	'beachfront',	'\"16849209054174c97740f-fd4f-471d-94b1-214b4df4692bV.png_16849209054180a245d12-f054-4d39-bfe4-f131797369d4fatcat.png\"',	2,	1,	3,	3,	3,	'this is description',	300000,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-24 09:35:05',	NULL),
(6,	1,	'Rooms so beautiful',	'beachfront',	'\"1684920964809091f98df-d416-4c2f-a3fa-fd9dd5f294cdV.png_16849209648090d47ff9e-efa5-4543-ab2c-21bfb1946a4bfatcat.png\"',	2,	1,	3,	3,	3,	'this is description',	122222,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-24 09:36:05',	NULL),
(7,	1,	'Rooms so beautiful',	'beachfront',	'\"168492096609468cc747a-e7ab-4c36-8853-1669c0eca68aV.png_168492096609456ce976c-9a15-431d-8b05-c7321b982c71fatcat.png\"',	2,	1,	3,	3,	3,	'this is description',	230000,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-24 09:36:06',	NULL),
(8,	1,	'Rooms so beautiful',	'lakefront',	'\"16850950128599a32575e-c099-4262-ae12-5a50dfab0d2bfatcat.png\"',	2,	1,	3,	3,	3,	'this is description',	122222,	1,	1,	1,	1,	1,	1,	1,	0,	'2023-05-24 09:36:08',	NULL),
(9,	1,	'House beautiful',	'beachfront',	'\"16849209852732f15e0fa-e579-4d5f-9074-e7be2a631ea9V.png_16849209852739ee2751a-26a1-4abd-970c-477534d1d944fatcat.png\"',	2,	1,	3,	3,	3,	'this is description',	700000,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-24 09:36:25',	NULL),
(10,	1,	'House beautiful',	'beachfront',	'\"1684920986212ae084b02-a69d-40c0-a3fd-29e254cd06b0V.png_1684920986212703170fe-6700-47ce-8471-12e9587ac483fatcat.png\"',	2,	1,	3,	3,	3,	'this is description',	800000,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-24 09:36:26',	NULL),
(11,	1,	'House beautiful',	'beachfront',	'\"1684920987265f02f8817-cd2e-4eef-bef3-2ba17dcd373eV.png_16849209872660172f79f-1f9b-4661-b8a7-f0ddbf91d8c3fatcat.png\"',	2,	1,	3,	3,	3,	'this is description',	134000,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-24 09:36:27',	NULL),
(12,	1,	'Nhà này đẹp nhất kinh thành',	'adapted',	'\"16850940297188bcb421b-fad3-4bf6-91c3-079aad834bcdV.png\"',	2,	1,	3,	3,	3,	'this is description',	122222,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-25 08:55:48',	NULL),
(13,	1,	'House beautiful',	'beachfront',	'\"1685005550208aaa50537-02be-4817-bd5c-832fb18c34ffV.png_1685005550208f4b2993b-2117-41f6-87b7-66317ca3efddV.png_1685005550209bd04d4c6-fa51-4512-a37e-e5113696af50V.png_16850055502158f6ead3c-ada1-4019-9c37-9b622e62e296V.png\"',	2,	1,	3,	3,	3,	'this is description',	122222,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-25 09:05:50',	NULL),
(14,	1,	'House beautiful',	'beachfront',	'\"168500562679924571974-2f55-4346-8eb0-937231cc86a3V.png_168500562679954d587da-da7f-424f-a9c3-07f441028ddfV.png_1685005626800d8760d0e-7e9a-4034-b04e-6f19ce285e2cV.png_168500562680015f0ddf3-0551-4d57-a7cd-04fb75ab912cV.png_16850056268046230238a-051c-46b7-b665-55d9124a2b7aV.png\"',	2,	1,	3,	3,	3,	'this is description',	122222,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-25 09:07:07',	NULL),
(15,	1,	'jalkfjadf',	'rooms',	'\"168501886069685784830-4cbe-40c2-a7e7-5019a9f261c8V.png\"',	1,	3,	3,	3,	3,	'kànmándfmdn',	400000,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-25 12:47:41',	NULL),
(16,	1,	'nha dep nhat sg',	'rooms',	'\"16850310299693af9ea74-f62f-45f0-bc2a-9fc7df8ae89fV.png_1685031029969f2812d8b-51d5-4d3f-8946-45068dff5b75V.png\"',	1,	4,	3,	3,	3,	'day là mo ta ve ngoi nha do',	738888,	0,	0,	1,	1,	0,	0,	0,	0,	'2023-05-25 15:38:16',	NULL),
(17,	1,	'nhà đẹp tp thủ đức',	'beachfront',	'\"1685094211719a172181e-917c-4b91-8567-6c0234c333eefatcat.png_16850942117390da86cff-27ca-471f-a092-3832e2937296V.png\"',	1,	3,	3,	3,	3,	'nhà đpẹ ở thủ đứuc',	2343423,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-26 09:43:32',	NULL),
(18,	1,	'nhà đẹp mỹ tho',	'amazingviews',	'\"1685095330537917adbd5-0ee4-47f6-9757-210fa01e01e7V.png\"',	1,	3,	4,	4,	4,	'nhà đpẹ mỹ tho view đẹp',	2434324,	1,	1,	1,	1,	1,	1,	1,	0,	'2023-05-26 10:02:11',	NULL),
(19,	1,	'nhà này đẹp lấm',	'amazingpools',	'\"1685463901643a3f2eadc-deff-425a-9910-a65b1d410205V.png\"',	1,	3,	3,	3,	3,	'đây là mô tả nhà đẹp',	3444444,	1,	1,	1,	1,	1,	1,	1,	0,	'2023-05-30 16:25:02',	NULL),
(20,	1,	'fàầ',	'amazingviews',	'\"\"',	1,	3,	3,	3,	3,	'hàhdjff',	3243424,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-30 16:27:25',	NULL),
(21,	1,	'jkahfahf',	'amazingviews',	'\"\"',	1,	3,	3,	3,	3,	'fdffdf',	23434324,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-31 06:01:44',	NULL),
(22,	1,	'jkahfahf',	'amazingviews',	'\"\"',	1,	3,	3,	3,	3,	'fdffdf',	23434324,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-31 06:02:13',	NULL),
(23,	1,	'jkahfahf',	'amazingviews',	'\"\"',	1,	3,	3,	3,	3,	'fdffdf',	23434324,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-31 06:02:25',	NULL),
(24,	1,	'aaa',	'omg',	'\"\"',	1,	3,	3,	3,	3,	'ttttt',	23424324,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-31 06:09:01',	NULL),
(25,	1,	't',	'rooms',	'\"\"',	1,	3,	3,	3,	3,	't',	1434243,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-31 06:17:25',	NULL),
(26,	1,	'House beautiful',	'beachfront',	'\"\"',	2,	1,	3,	3,	3,	'this is description',	122222,	1,	1,	1,	1,	1,	1,	1,	0,	'2023-05-31 06:20:22',	NULL),
(27,	1,	'House beautiful',	'beachfront',	'\"1685514511846105b85f8-6638-4a48-9ba6-40cdeb62eb0bV.png\"',	2,	1,	3,	3,	3,	'this is description',	122222,	1,	1,	1,	1,	1,	1,	1,	0,	'2023-05-31 06:28:32',	NULL),
(28,	1,	'a',	'rooms',	'\"1685514889164e7ee8f8d-51b5-4418-8e21-e70f82d7a8e0V.png\"',	1,	3,	3,	3,	3,	'3',	241443,	1,	1,	1,	1,	1,	1,	1,	1,	'2023-05-31 06:34:49',	NULL),
(29,	1,	'hdfhdh',	'rooms',	'\"16857133521941902fdbb-9d79-4dd7-9c89-be7e132f0a1cV.png_1685713352197c760e9cf-35ff-4772-86e3-879d22f8373ffatcat.png\"',	1,	3,	3,	3,	3,	'sfàdfadf',	121212,	1,	1,	1,	1,	1,	1,	1,	0,	'2023-06-02 13:42:32',	NULL),
(30,	1,	'hdfhdhsdff',	'iconiccities',	'\"168571342699064a2f284-1fe2-49b0-8b11-9caec5a3f78fV.png_16857134269903cc3ef07-c20d-4004-a51f-2edcb5d4be11fatcat.png_16857134270058345247a-92cd-437a-ab8b-81ed0cc7ad83fatcat.png_16857134270147044274d-cec1-414d-b894-09b0c3fb8db8V.png\"',	1,	3,	3,	3,	3,	'sfàdfadf',	121212,	1,	1,	1,	1,	1,	1,	1,	0,	'2023-06-02 13:43:47',	NULL);

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cccd` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `phone` varchar(15) NOT NULL,
  `birthday` date DEFAULT NULL,
  `gender` enum('male','female','other') NOT NULL,
  `role` enum('user','admin','business') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `user` (`user_id`, `full_name`, `email`, `password`, `cccd`, `phone`, `birthday`, `gender`, `role`, `created`, `updated`) VALUES
(1,	'admin',	'admin@gmail.com',	'$2b$10$9u370uewFq7GbbJ/mMmZK.ceT0WwDdOJxdwxIw/GHAuLmnSf6IUXK',	'312457081',	'0346128692',	NULL,	'female',	'admin',	'2023-05-24 07:45:45',	NULL),
(2,	'chauvnaloc',	'locchau.220401@gmail.com',	'$2b$10$AErGVHyK0wSDj80ySnVIbuXdaxZ0ralzKwBLMEYh8Ntw2ZoBRPTHW',	'318973',	'0879229072',	NULL,	'male',	'business',	'2023-06-02 14:16:01',	NULL);

-- 2023-06-03 09:21:22
