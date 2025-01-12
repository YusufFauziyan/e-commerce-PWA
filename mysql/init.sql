mysqldump: [Warning] Using a password on the command line interface can be insecure.
-- MySQL dump 10.13  Distrib 8.0.40, for Linux (aarch64)
--
-- Host: localhost    Database: ecommerce_db
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Address`
--

DROP TABLE IF EXISTS `Address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Address` (
  `address_id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `street_address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `postal_code` varchar(20) NOT NULL,
  `default_address` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`address_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Address`
--

LOCK TABLES `Address` WRITE;
/*!40000 ALTER TABLE `Address` DISABLE KEYS */;
INSERT INTO `Address` VALUES ('1d3de4a7-c840-11ef-96a9-0242ac120002','9099029b-00ad-4378-b42b-930f9b09e120','cisaat','Sukabumi','43152',0),('f92df6c8-9066-43aa-80a7-6cba1b23ed42','09f2e73f-9812-4555-8686-adcafd29e46e','string','string','string',0);
/*!40000 ALTER TABLE `Address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cart`
--

DROP TABLE IF EXISTS `Cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cart` (
  `cart_id` char(36) NOT NULL,
  `product_id` char(36) NOT NULL,
  `quantity` int NOT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `user_id` char(36) NOT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `product_id` (`product_id`),
  KEY `Cart_Item_ibfk_1` (`user_id`),
  CONSTRAINT `Cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`),
  CONSTRAINT `Cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `Product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cart`
--

LOCK TABLES `Cart` WRITE;
/*!40000 ALTER TABLE `Cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `Cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Category` (
  `category_id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `Category` VALUES ('123e4567-e89b-12d3-a456-426614174000','Electronics',NULL),('44354bb0-cd27-11ef-a748-0242ac120002','',NULL),('5e991e67-caa4-11ef-818b-0242ac120003','Mobile Device','mobile phone'),('b33ccc9b-ec0a-4547-ae45-4e1781d28cea','Electronic','Lorem ipsum'),('d1caa7d2-2452-45b8-ac10-24b32fb83c56','Otomotif','Lorem ipsum');
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Order`
--

DROP TABLE IF EXISTS `Order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Order` (
  `order_id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `status` enum('Pending','Processing','Shipped','Delivered','Cancelled') NOT NULL DEFAULT 'Pending',
  `total_price` decimal(10,2) DEFAULT NULL,
  `order_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `address_id` char(36) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  KEY `fk_order_address` (`address_id`),
  CONSTRAINT `fk_order_address` FOREIGN KEY (`address_id`) REFERENCES `Address` (`address_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Order`
--

LOCK TABLES `Order` WRITE;
/*!40000 ALTER TABLE `Order` DISABLE KEYS */;
INSERT INTO `Order` VALUES ('7d5200ed-3418-4966-924a-0aea3e9860dc','9099029b-00ad-4378-b42b-930f9b09e120','Pending',NULL,'2025-01-12 07:06:23','1d3de4a7-c840-11ef-96a9-0242ac120002');
/*!40000 ALTER TABLE `Order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Order_Item`
--

DROP TABLE IF EXISTS `Order_Item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Order_Item` (
  `order_item_id` char(36) NOT NULL,
  `order_id` char(36) NOT NULL,
  `product_id` char(36) NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `Order_Item_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `Order` (`order_id`),
  CONSTRAINT `Order_Item_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `Product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Order_Item`
--

LOCK TABLES `Order_Item` WRITE;
/*!40000 ALTER TABLE `Order_Item` DISABLE KEYS */;
INSERT INTO `Order_Item` VALUES ('84a9c82b-a15e-4338-8549-0a15d86918e1','7d5200ed-3418-4966-924a-0aea3e9860dc','ba5068a3-9b5d-43a4-b940-7f5b0f9cb69a',2);
/*!40000 ALTER TABLE `Order_Item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Payment`
--

DROP TABLE IF EXISTS `Payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Payment` (
  `payment_id` char(36) NOT NULL,
  `order_id` char(36) NOT NULL,
  `transaction_id` char(36) DEFAULT NULL,
  `payment_type` varchar(255) DEFAULT NULL,
  `gross_amount` decimal(10,2) DEFAULT NULL,
  `transaction_time` timestamp NULL DEFAULT NULL,
  `settlement_time` timestamp NULL DEFAULT NULL,
  `expiry_time` timestamp NULL DEFAULT NULL,
  `transaction_status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `Payment_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `Order` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payment`
--

LOCK TABLES `Payment` WRITE;
/*!40000 ALTER TABLE `Payment` DISABLE KEYS */;
INSERT INTO `Payment` VALUES ('1c27f2bb-f938-432d-946f-1c3e29f53209','7d5200ed-3418-4966-924a-0aea3e9860dc','e306d2cc-c3c5-4760-a4f8-636eed9a7389','bank_transfer',20000000.00,'2025-01-12 07:06:38','2025-01-12 07:06:44','2025-01-13 07:06:38','settlement');
/*!40000 ALTER TABLE `Payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Product` (
  `product_id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `stock_quantity` int NOT NULL,
  `user_id` char(36) DEFAULT NULL,
  `images` json DEFAULT NULL,
  `discount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `sold_quantity` int NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_id`),
  KEY `Product_ibfk_1` (`user_id`),
  CONSTRAINT `Product_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
INSERT INTO `Product` VALUES ('ba5068a3-9b5d-43a4-b940-7f5b0f9cb69a','Iphone 14','beacukai',10000000.00,53,'09f2e73f-9812-4555-8686-adcafd29e46e','[{\"url\": \"https://res.cloudinary.com/dtowni8oi/image/upload/v1736664479/e-commerece-pwa/yusuf%40gmail.com/neebhtnigqtbso5hktev.png\", \"public_id\": \"e-commerece-pwa/yusuf@gmail.com/neebhtnigqtbso5hktev\"}, {\"url\": \"https://res.cloudinary.com/dtowni8oi/image/upload/v1736664487/e-commerece-pwa/yusuf%40gmail.com/o29iqultspgmohxmhpmo.png\", \"public_id\": \"e-commerece-pwa/yusuf@gmail.com/o29iqultspgmohxmhpmo\"}]',0.00,2,'2025-01-12 06:48:07');
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Product_Category`
--

DROP TABLE IF EXISTS `Product_Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Product_Category` (
  `product_id` char(36) NOT NULL,
  `category_id` char(36) NOT NULL,
  PRIMARY KEY (`product_id`,`category_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `Product_Category_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `Product` (`product_id`) ON DELETE CASCADE,
  CONSTRAINT `Product_Category_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `Category` (`category_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product_Category`
--

LOCK TABLES `Product_Category` WRITE;
/*!40000 ALTER TABLE `Product_Category` DISABLE KEYS */;
INSERT INTO `Product_Category` VALUES ('ba5068a3-9b5d-43a4-b940-7f5b0f9cb69a','5e991e67-caa4-11ef-818b-0242ac120003'),('ba5068a3-9b5d-43a4-b940-7f5b0f9cb69a','b33ccc9b-ec0a-4547-ae45-4e1781d28cea');
/*!40000 ALTER TABLE `Product_Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Review`
--

DROP TABLE IF EXISTS `Review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Review` (
  `review_id` char(36) NOT NULL,
  `product_id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `rating` int NOT NULL,
  `comment` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Review_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `Product` (`product_id`) ON DELETE CASCADE,
  CONSTRAINT `Review_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `Review_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Review`
--

LOCK TABLES `Review` WRITE;
/*!40000 ALTER TABLE `Review` DISABLE KEYS */;
INSERT INTO `Review` VALUES ('a71833c3-39f9-4b53-885e-d3aa9fdeb3f9','ba5068a3-9b5d-43a4-b940-7f5b0f9cb69a','9099029b-00ad-4378-b42b-930f9b09e120',5,'barang ladesh bagus','2025-01-12 07:28:05');
/*!40000 ALTER TABLE `Review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Shipping`
--

DROP TABLE IF EXISTS `Shipping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Shipping` (
  `shipping_id` char(36) NOT NULL,
  `order_id` char(36) NOT NULL,
  `address_id` char(36) NOT NULL,
  `shipping_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `delivery_date` timestamp NULL DEFAULT NULL,
  `tracking_number` varchar(100) DEFAULT NULL,
  `payment_id` char(36) DEFAULT NULL,
  PRIMARY KEY (`shipping_id`),
  KEY `order_id` (`order_id`),
  KEY `address_id` (`address_id`),
  KEY `fk_shipping_payment` (`payment_id`),
  CONSTRAINT `fk_shipping_payment` FOREIGN KEY (`payment_id`) REFERENCES `Payment` (`payment_id`) ON DELETE CASCADE,
  CONSTRAINT `Shipping_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `Order` (`order_id`),
  CONSTRAINT `Shipping_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `Address` (`address_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Shipping`
--

LOCK TABLES `Shipping` WRITE;
/*!40000 ALTER TABLE `Shipping` DISABLE KEYS */;
/*!40000 ALTER TABLE `Shipping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `user_id` char(36) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `role` enum('admin','user','seller') DEFAULT 'user',
  `refresh_token` text,
  `verified_email` tinyint(1) DEFAULT '0',
  `phone_number` varchar(15) DEFAULT NULL,
  `verified_phone_number` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone_number` (`phone_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('09f2e73f-9812-4555-8686-adcafd29e46e','yusuf','yusuf@gmail.com','$2b$10$Ykwp0zZupm6NxTP9LAyxh.DvXrpMRxgHqBtz5Nv8ObHxsFSGSN/bK','2024-12-30 13:17:17','seller','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA5ZjJlNzNmLTk4MTItNDU1NS04Njg2LWFkY2FmZDI5ZTQ2ZSIsImVtYWlsIjoieXVzdWZAZ21haWwuY29tIiwicm9sZSI6InNlbGxlciIsImlhdCI6MTczNjY2NDQ2MywiZXhwIjoxNzM3MjY5MjYzfQ.nmxNuilyR4XGMueVoQOD2CSC1kUYBcBqbQXa9d1Vr-8',0,NULL,0),('170188f0-157b-4945-a87d-18f25d433d60','Yusuf Backup','yusufbackupwa@gmail.com','$2b$10$0yksRLGA3kCp8429GMwQOOv9rKE1LVWJsejQI5UpDM64o5TZd.lQe','2025-01-01 15:44:47','seller','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3MDE4OGYwLTE1N2ItNDk0NS1hODdkLTE4ZjI1ZDQzM2Q2MCIsImVtYWlsIjoieXVzdWZiYWNrdXB3YUBnbWFpbC5jb20iLCJyb2xlIjoic2VsbGVyIiwiaWF0IjoxNzM2MjczNTM1LCJleHAiOjE3MzY4NzgzMzV9.N4t20L15QnzxfiRL8PcSL44BHuMbvIGpNLSyTXYEClk',1,NULL,0),('31bcece8-2398-4092-bee6-d0dbe129eed1','admin','admin@gmail.com','$2b$10$0yksRLGA3kCp8429GMwQOOv9rKE1LVWJsejQI5UpDM64o5TZd.lQe','2024-12-30 14:21:06','admin','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMxYmNlY2U4LTIzOTgtNDA5Mi1iZWU2LWQwZGJlMTI5ZWVkMSIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM1OTI3MDgzLCJleHAiOjE3MzY1MzE4ODN9.9hY94e_cmkHqRTyofB1NEPT_FeUnZP2mNB-ON-hxzuY',0,NULL,0),('9099029b-00ad-4378-b42b-930f9b09e120','yusuf fauziyan','yusuffauziyan@gmail.com','$2b$10$0yksRLGA3kCp8429GMwQOOv9rKE1LVWJsejQI5UpDM64o5TZd.lQe','2025-01-01 07:22:00','user','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkwOTkwMjliLTAwYWQtNDM3OC1iNDJiLTkzMGY5YjA5ZTEyMCIsImVtYWlsIjoieXVzdWZmYXV6aXlhbkBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTczNjY2MTQwNiwiZXhwIjoxNzM3MjY2MjA2fQ.49B_ibkPzTn-j3c20G56PHSgYHuJ0jYDwgP7UHEfcZs',1,'+6289658043193',1),('a892bee1-d92a-453a-9b95-b2a47f41c2a3','test','test@gmail.com','$2b$10$gHoBXwuEIJf.Y12xf1RGAeyEHEVU0dYRTp39ZNShlTENcvBZ2H1g.','2025-01-05 14:45:17','user',NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-12  7:41:11
