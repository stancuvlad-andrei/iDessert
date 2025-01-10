-- MySQL dump 10.13  Distrib 8.0.40, for Linux (x86_64)
--
-- Host: localhost    Database: iDessertDB
-- ------------------------------------------------------
-- Server version	8.0.40-0ubuntu0.24.04.1

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
-- Table structure for table `bakeries`
--

DROP TABLE IF EXISTS `bakeries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bakeries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `owner_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_owner` (`owner_id`),
  CONSTRAINT `fk_owner` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bakeries`
--

LOCK TABLES `bakeries` WRITE;
/*!40000 ALTER TABLE `bakeries` DISABLE KEYS */;
INSERT INTO `bakeries` VALUES (1,'Sweet Delights','123 Main Street','Springfield','123-456-7890','info@sweetdelights.com','www.sweetdelights.com',1),(2,'Bake Heaven','456 Elm Street','Rivertown','987-654-3210','contact@bakeheaven.com','www.bakeheaven.com',1),(3,'The Pastry Corner','789 Oak Avenue','Lakeview','555-234-5678','hello@pastrycorner.com',NULL,1),(4,'Golden Crust Bakery','101 Maple Road','Hilltop','444-555-6666','support@goldencrust.com','www.goldencrust.com',1),(7,'Sugar & Spice','321 Pine Street','Greenfield','111-222-3333','info@sugarspice.com','www.sugarspice.com',1),(8,'Cupcake Haven','654 Birch Lane','Maplewood','222-333-4444','contact@cupcakehaven.com','www.cupcakehaven.com',1),(9,'Bread & Butter','987 Cedar Road','Oakville','333-444-5555','hello@breadbutter.com','www.breadbutter.com',1),(10,'The Doughnut Shop','753 Walnut Avenue','Pineville','444-555-6666','support@doughnutshop.com','www.doughnutshop.com',1),(11,'Pie Paradise','159 Cherry Street','Cherryville','555-666-7777','info@pieparadise.com','www.pieparadise.com',1),(12,'Cake Castle','357 Elmwood Drive','Elmwood','666-777-8888','contact@cakecastle.com','www.cakecastle.com',1);
/*!40000 ALTER TABLE `bakeries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bakery_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `bakery_id` (`bakery_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`bakery_id`) REFERENCES `bakeries` (`id`) ON DELETE CASCADE,
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (2,1,1,1,15.00,'2025-01-10 15:12:24');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bakery_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `price` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bakery_id` (`bakery_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`bakery_id`) REFERENCES `bakeries` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,1,'Chocolate Cake','Rich and moist chocolate cake',15.00,3),(3,2,'Croissant','Flaky and buttery French croissant',2.50,28),(4,2,'Bagel','Classic bagel with sesame seeds',1.50,20),(5,3,'New Apple Pie','Traditional apple pie with cinnamon',15.00,9),(6,4,'Sourdough Bread','Rustic sourdough with a crispy crust',5.00,15),(34,11,'Red Velvet Cake','Classic red velvet cake with cream cheese frosting',18.00,8),(35,11,'Cinnamon Roll','Soft and gooey cinnamon rolls with icing',3.50,19),(36,12,'Vanilla Cupcake','Fluffy vanilla cupcake with buttercream frosting',2.00,50),(37,12,'Chocolate Cupcake','Rich chocolate cupcake with chocolate ganache',2.50,40),(38,7,'Whole Wheat Bread','Healthy whole wheat bread',4.00,25),(39,7,'Baguette','Traditional French baguette',3.00,30),(40,8,'Glazed Doughnut','Classic glazed doughnut',1.50,60),(41,8,'Chocolate Doughnut','Chocolate-glazed doughnut with sprinkles',2.00,50),(42,9,'Pumpkin Pie','Seasonal pumpkin pie with whipped cream',12.00,10),(43,9,'Pecan Pie','Sweet and nutty pecan pie',14.00,7),(44,10,'Cheesecake','Creamy New York-style cheesecake',20.00,6),(45,10,'Tiramisu','Classic Italian tiramisu',16.00,10);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revenue`
--

DROP TABLE IF EXISTS `revenue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `revenue` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bakery_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `revenue_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `bakery_id` (`bakery_id`),
  CONSTRAINT `revenue_ibfk_1` FOREIGN KEY (`bakery_id`) REFERENCES `bakeries` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revenue`
--

LOCK TABLES `revenue` WRITE;
/*!40000 ALTER TABLE `revenue` DISABLE KEYS */;
INSERT INTO `revenue` VALUES (2,1,15.00,'2025-01-10 15:12:24');
/*!40000 ALTER TABLE `revenue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bakery_id` int NOT NULL,
  `review` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `sentiment` enum('good','bad') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'good',
  PRIMARY KEY (`id`),
  KEY `bakery_id` (`bakery_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`bakery_id`) REFERENCES `bakeries` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,1,'Amazing chocolate cake, will definitely come back!','good'),(2,1,'The muffins are delightful and fresh every time.','good'),(3,2,'Best croissants in town!','good'),(4,3,'Apple pie was delicious, but a bit pricey.','good'),(5,4,'The sourdough bread is top-notch. Perfect for sandwiches!','good'),(19,11,'The red velvet cake is to die for!','good'),(20,11,'Cinnamon rolls are the best I\'ve ever had.','good'),(21,12,'Cupcakes are always fresh and delicious.','good'),(22,12,'The vanilla cupcake is my favorite!','good'),(23,7,'The whole wheat bread is so healthy and tasty.','good'),(24,7,'Baguettes are perfect for sandwiches.','good'),(25,8,'Glazed doughnuts are my go-to breakfast.','good'),(26,8,'Chocolate doughnuts are heavenly!','good'),(27,9,'Pumpkin pie is a must-try during the fall.','good'),(28,9,'Pecan pie is rich and delicious.','good'),(29,10,'Cheesecake is creamy and perfect.','good'),(30,10,'Tiramisu is the best dessert ever!','good');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('owner','client') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'client',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'gigel','gigel@gmail.com','$2b$10$hIKh.f1qccYptR0/6xKhW.zDMH5EX56A5HDoWp0Do/ehrMDzquy4K','owner'),(2,'vlad','vlad@gmail.com','$2b$10$Vib/S4yuS2L63sufSUxIVuEMsbQ8l.NsoH33vUmmtHnI2DyaOA176','client');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visits`
--

DROP TABLE IF EXISTS `visits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bakery_id` int NOT NULL,
  `visit_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_visits_bakery` (`bakery_id`),
  CONSTRAINT `fk_visits_bakery` FOREIGN KEY (`bakery_id`) REFERENCES `bakeries` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visits`
--

LOCK TABLES `visits` WRITE;
/*!40000 ALTER TABLE `visits` DISABLE KEYS */;
INSERT INTO `visits` VALUES (32,1,'2025-01-10 11:53:59'),(33,1,'2025-01-10 11:54:50'),(34,1,'2025-01-10 11:56:15'),(35,1,'2025-01-10 12:02:11'),(36,1,'2025-01-10 12:20:38'),(37,1,'2025-01-10 12:43:01'),(38,1,'2025-01-10 12:45:31'),(39,1,'2025-01-10 12:47:16'),(40,1,'2025-01-10 12:56:22'),(41,1,'2025-01-10 13:39:24'),(42,1,'2025-01-10 13:47:36'),(43,1,'2025-01-10 13:52:16'),(44,1,'2025-01-10 14:06:20'),(45,1,'2025-01-10 14:09:38'),(46,1,'2025-01-10 14:20:51'),(47,1,'2025-01-10 14:20:53'),(48,1,'2025-01-10 14:47:25'),(49,1,'2025-01-10 15:03:05'),(50,1,'2025-01-10 15:10:49');
/*!40000 ALTER TABLE `visits` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-10 17:20:03
