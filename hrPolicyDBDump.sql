-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: hr
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `Employee_Id` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Employee_Id`),
  UNIQUE KEY `Employee_Id_UNIQUE` (`Employee_Id`),
  UNIQUE KEY `Username_UNIQUE` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'fnkabiru@gmail.com','@testP'),(2,'fkabiru@gmail.com','testP'),(3,'null','null'),(7,'aba@kns.co.ke','null');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employeepolicytest`
--

DROP TABLE IF EXISTS `employeepolicytest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employeepolicytest` (
  `idEmployeePolicyTest` int NOT NULL AUTO_INCREMENT,
  `Policy` varchar(100) NOT NULL,
  `Employee` varchar(50) NOT NULL,
  `PolicytTestData` json DEFAULT NULL,
  PRIMARY KEY (`idEmployeePolicyTest`),
  UNIQUE KEY `idEmployeePolicyTest_UNIQUE` (`idEmployeePolicyTest`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeepolicytest`
--

LOCK TABLES `employeepolicytest` WRITE;
/*!40000 ALTER TABLE `employeepolicytest` DISABLE KEYS */;
/*!40000 ALTER TABLE `employeepolicytest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employeeroles`
--

DROP TABLE IF EXISTS `employeeroles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employeeroles` (
  `idemployeeRoles` int NOT NULL AUTO_INCREMENT,
  `employeeEmail` varchar(50) NOT NULL,
  `Role` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idemployeeRoles`),
  UNIQUE KEY `idemployeeRoles_UNIQUE` (`idemployeeRoles`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeeroles`
--

LOCK TABLES `employeeroles` WRITE;
/*!40000 ALTER TABLE `employeeroles` DISABLE KEYS */;
INSERT INTO `employeeroles` VALUES (1,'fnkabiru@gmail.com','Admin'),(2,'fnkabiru@gmail.com','Employee');
/*!40000 ALTER TABLE `employeeroles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hrpolicies`
--

DROP TABLE IF EXISTS `hrpolicies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hrpolicies` (
  `Policy_Id` int NOT NULL AUTO_INCREMENT,
  `Policy` varchar(100) NOT NULL,
  PRIMARY KEY (`Policy_Id`),
  UNIQUE KEY `Policy_Id_UNIQUE` (`Policy_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hrpolicies`
--

LOCK TABLES `hrpolicies` WRITE;
/*!40000 ALTER TABLE `hrpolicies` DISABLE KEYS */;
INSERT INTO `hrpolicies` VALUES (1,'CUSTOMER SERVICE'),(2,'SERVICE DELIVERY');
/*!40000 ALTER TABLE `hrpolicies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `policyquestions`
--

DROP TABLE IF EXISTS `policyquestions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `policyquestions` (
  `idPolicyQuestions` int NOT NULL AUTO_INCREMENT,
  `Policy` varchar(100) NOT NULL,
  `PolicyQuestions` varchar(255) NOT NULL,
  `IncorrectAnswerObject` json DEFAULT NULL,
  `CorrectAnswer` varchar(150) DEFAULT NULL,
  `isAvailable` int DEFAULT '1',
  PRIMARY KEY (`idPolicyQuestions`),
  UNIQUE KEY `idPolicyQuestions_UNIQUE` (`idPolicyQuestions`),
  UNIQUE KEY `PolicyQuestions_UNIQUE` (`PolicyQuestions`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policyquestions`
--

LOCK TABLES `policyquestions` WRITE;
/*!40000 ALTER TABLE `policyquestions` DISABLE KEYS */;
INSERT INTO `policyquestions` VALUES (9,'SERVICE DELIVERY','What is the companys response time to clients support request','[{\"Incorrect_Answer\": \"Not Specific\"}, {\"Incorrect_Answer\": \"One Hour\"}, {\"Incorrect_Answer\": \"Upon Escalation\"}, {\"Incorrect_Answer\": \"As advised by Customer service\"}]','One Day',1),(10,'CUSTOMER SERVICE','Identify customer satisfaction indicator','[{\"Incorrect_Answer\": \"Keeps escalating\"}, {\"Incorrect_Answer\": \"Pays on time\"}, {\"Incorrect_Answer\": \"No response to services\"}, {\"Incorrect_Answer\": \"Support business\"}]','Confidence on our services',1),(14,'CUSTOMER SERVICE','What are the right time to support clients','[{\"Incorrect_Answer\": \"In the morning only\"}, {\"Incorrect_Answer\": \"Anytime before escalation\"}, {\"Incorrect_Answer\": \"No specific time\"}, {\"Incorrect_Answer\": \"When my supervisor advices to\"}]','Any time 24/7',1),(15,'CUSTOMER SERVICE','What is the right way of addressing violent clients','[{\"Incorrect_Answer\": \"Disregard their violence\"}, {\"Incorrect_Answer\": \"Ignore them always\"}, {\"Incorrect_Answer\": \"Manage them\"}, {\"Incorrect_Answer\": \"Ask them to calm down\"}]','Listen to their concerns and decide on best action',1),(16,'SERVICE DELIVERY','Which one is correct','[{\"Incorrect_Answer\": \"Cost policy\"}, {\"Incorrect_Answer\": \"Resolution Policy\"}, {\"Incorrect_Answer\": \"Insurance Policy\"}]','Time Policy',1);
/*!40000 ALTER TABLE `policyquestions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `idRoles` int NOT NULL AUTO_INCREMENT,
  `RoleDescription` varchar(50) NOT NULL,
  PRIMARY KEY (`idRoles`),
  UNIQUE KEY `idRoles_UNIQUE` (`idRoles`),
  UNIQUE KEY `RoleDescription_UNIQUE` (`RoleDescription`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (3,'Admin'),(2,'Employee'),(1,'HR');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-26 16:36:03
