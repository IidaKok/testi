-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`bookseries`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`bookseries` ;

CREATE TABLE IF NOT EXISTS `mydb`.`bookseries` (
  `idbookseries` INT NULL AUTO_INCREMENT,
  `bookseries` VARCHAR(45) NULL,
  `publisher` VARCHAR(45) NULL,
  `description` VARCHAR(255) NULL,
  `classification` VARCHAR(45) NULL,
  PRIMARY KEY (`idbookseries`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`book`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`book` ;

CREATE TABLE IF NOT EXISTS `mydb`.`book` (
  `idbook` INT NOT NULL AUTO_INCREMENT,
  `bookname` VARCHAR(45) NULL,
  `publicationyear` YEAR NULL,
  `description` VARCHAR(255) NULL,
  `idbookseries` INT NOT NULL,
  `seriesnumber` VARCHAR(45) NULL,
  `writer` VARCHAR(45) NULL,
  PRIMARY KEY (`idbook`),
  INDEX `fk_Kirja_kirjasarja1_idx` (`idbookseries` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`picture`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`picture` ;

CREATE TABLE IF NOT EXISTS `mydb`.`picture` (
  `idpicture` INT NULL AUTO_INCREMENT,
  `picturename` VARCHAR(45) NULL,
  `publicationyear` VARCHAR(45) NULL,
  `artist` VARCHAR(45) NULL,
  `style` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `filename` VARCHAR(45) NULL,
  PRIMARY KEY (`idpicture`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`artwork`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`artwork` ;

CREATE TABLE IF NOT EXISTS `mydb`.`artwork` (
  `idbook` INT NOT NULL,
  `idpicture` INT NOT NULL,
  `pagenumber` INT NULL,
  PRIMARY KEY (`idbook`, `idpicture`),
  INDEX `fk_Kuvitus_Book1_idx` (`idbook` ASC) VISIBLE,
  INDEX `fk_Kuvitus_Picture1_idx` (`idpicture` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`user` ;

CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`iduser`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`bookshelf`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`bookshelf` ;

CREATE TABLE IF NOT EXISTS `mydb`.`bookshelf` (
  `idbookshelf` INT NOT NULL,
  `iduser` INT NOT NULL,
  `owner` VARCHAR(45) NULL,
  PRIMARY KEY (`idbookshelf`),
  INDEX `fk_Kirjahylly_Käyttäjä1_idx` (`iduser` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`userseries`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`userseries` ;

CREATE TABLE IF NOT EXISTS `mydb`.`userseries` (
  `idbookseries` INT NOT NULL,
  `idbookshelf` INT NOT NULL,
  PRIMARY KEY (`idbookseries`, `idbookshelf`),
  INDEX `fk_omatsarjat_bookseries1_idx` (`idbookseries` ASC) VISIBLE,
  INDEX `fk_omatsarjat_Kirjahylly1_idx` (`idbookshelf` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`bookcopy`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`bookcopy` ;

CREATE TABLE IF NOT EXISTS `mydb`.`bookcopy` (
  `idbookcopy` INT NOT NULL AUTO_INCREMENT,
  `bookname` VARCHAR(45) NULL,
  `edition` INT NULL,
  `publicationyear` YEAR NULL,
  `idbook` INT NOT NULL,
  `purchaseprice` DECIMAL(6,2) NULL,
  `purchasedate` DATE NULL,
  `condition` INT NULL,
  `description` VARCHAR(45) NULL,
  `solddate` DATE NULL,
  `soldprice` DECIMAL(6,2) NULL,
  `idbookseries` INT NOT NULL,
  `idbookshelf` INT NOT NULL,
  PRIMARY KEY (`idbookcopy`),
  INDEX `fk_kirjakopio_Kirja1_idx` (`idbook` ASC) VISIBLE,
  INDEX `fk_kirjakopio_omatsarjat1_idx` (`idbookseries` ASC, `idbookshelf` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`photo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`photo` ;

CREATE TABLE IF NOT EXISTS `mydb`.`photo` (
  `idphoto` INT NOT NULL AUTO_INCREMENT,
  `photoname` VARCHAR(45) NULL,
  `idbookcopy` INT NOT NULL,
  `pagenumber` INT NULL,
  PRIMARY KEY (`idphoto`),
  INDEX `fk_valokuva_kirjakopio1_idx` (`idbookcopy` ASC) VISIBLE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `mydb`.`bookseries`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`bookseries` (`idbookseries`, `bookseries`, `publisher`, `description`, `classification`) VALUES (1, 'Harry Potter', 'Bloomsbury', 'Harry Potter is a series of fantasy novels by J.K. Rowling about a young orphan boy named Harry who learns he is a wizard and attends a school for magic, where he makes friends and fights against the dark wizard Voldemort.', NULL);
INSERT INTO `mydb`.`bookseries` (`idbookseries`, `bookseries`, `publisher`, `description`, `classification`) VALUES (2, 'Lord of the Rings', 'Allen & Unwin', 'The Lord of the Rings is a fantasy novel series by J.R.R. Tolkien about a hobbit named Frodo who sets out on a perilous quest to destroy a powerful ring and defeat the dark lord Sauron, with the help of a fellowship of companions.', NULL);
INSERT INTO `mydb`.`bookseries` (`idbookseries`, `bookseries`, `publisher`, `description`, `classification`) VALUES (3, 'Game of Thrones', 'Voyager Books', 'Game of Thrones is a fantasy novel series by George R.R. Martin about noble families competing for control of the Iron Throne in the fictional world of Westeros, known for its complex characters, intricate plot lines, and gritty realism.', NULL);
INSERT INTO `mydb`.`bookseries` (`idbookseries`, `bookseries`, `publisher`, `description`, `classification`) VALUES (4, 'Hunger Games', 'Scholastic', 'The Hunger Games is a dystopian novel series by Suzanne Collins where children from different districts are forced to fight to the death in an annual event, and a young girl named Katniss becomes a symbol of rebellion against the tyrannical Capitol.', NULL);
INSERT INTO `mydb`.`bookseries` (`idbookseries`, `bookseries`, `publisher`, `description`, `classification`) VALUES (5, 'Flintstones', 'DC Comics', 'The Flintstones comic books follow the daily lives of the prehistoric Flintstone family and their neighbors in Bedrock, with humor, satire, and nostalgia.', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`book`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`book` (`idbook`, `bookname`, `publicationyear`, `description`, `idbookseries`, `seriesnumber`, `writer`) VALUES (1, 'Flintstones', 2000, 'Kuinka Retusta tuli Äiti', 5, NULL, NULL);
INSERT INTO `mydb`.`book` (`idbook`, `bookname`, `publicationyear`, `description`, `idbookseries`, `seriesnumber`, `writer`) VALUES (8, 'Harry Potter and the Philosopher’s Stone', 1997, NULL, 1, '1', 'J.K. Rowling');
INSERT INTO `mydb`.`book` (`idbook`, `bookname`, `publicationyear`, `description`, `idbookseries`, `seriesnumber`, `writer`) VALUES (9, 'Harry Potter and the Chamber of Secrets', 1998, NULL, 1, '2', 'J.K. Rowling');
INSERT INTO `mydb`.`book` (`idbook`, `bookname`, `publicationyear`, `description`, `idbookseries`, `seriesnumber`, `writer`) VALUES (10, 'Harry Potter and the Prisoner of Azkaban', 1999, NULL, 1, '3', 'J.K. Rowling');
INSERT INTO `mydb`.`book` (`idbook`, `bookname`, `publicationyear`, `description`, `idbookseries`, `seriesnumber`, `writer`) VALUES (11, 'Harry Potter and the Goblet of Fire', 2000, NULL, 1, '4', 'J.K. Rowling');
INSERT INTO `mydb`.`book` (`idbook`, `bookname`, `publicationyear`, `description`, `idbookseries`, `seriesnumber`, `writer`) VALUES (12, 'Harry Potter and the Order of the Phoenix', 2003, NULL, 1, '5', 'J.K. Rowling');
INSERT INTO `mydb`.`book` (`idbook`, `bookname`, `publicationyear`, `description`, `idbookseries`, `seriesnumber`, `writer`) VALUES (13, 'Harry Potter and the Half-Blood Prince', 2005, NULL, 1, '6', 'J.K. Rowling');
INSERT INTO `mydb`.`book` (`idbook`, `bookname`, `publicationyear`, `description`, `idbookseries`, `seriesnumber`, `writer`) VALUES (14, 'Harry Potter and the Deathly Hallows', 2007, NULL, 1, '7', 'J.K. Rowling');
INSERT INTO `mydb`.`book` (`idbook`, `bookname`, `publicationyear`, `description`, `idbookseries`, `seriesnumber`, `writer`) VALUES (15, 'The Fellowship of the Ring (TlotR, #1)', 1954, NULL, 2, '1', 'J.R.R. Tolkien');
INSERT INTO `mydb`.`book` (`idbook`, `bookname`, `publicationyear`, `description`, `idbookseries`, `seriesnumber`, `writer`) VALUES (16, 'The Two Towers (TlotR, #2)', 1954, NULL, 2, '2', 'J.R.R. Tolkien');
INSERT INTO `mydb`.`book` (`idbook`, `bookname`, `publicationyear`, `description`, `idbookseries`, `seriesnumber`, `writer`) VALUES (17, 'The Return of the King (TlotR, #3)', 1955, NULL, 2, '3', 'J.R.R. Tolkien');
INSERT INTO `mydb`.`book` (`idbook`, `bookname`, `publicationyear`, `description`, `idbookseries`, `seriesnumber`, `writer`) VALUES (18, 'A Game of Thrones (ASoIaF, #1)', 1996, NULL, 3, '1', 'George R.R. Martin');
INSERT INTO `mydb`.`book` (`idbook`, `bookname`, `publicationyear`, `description`, `idbookseries`, `seriesnumber`, `writer`) VALUES (19, 'A Clash of Kings (ASoIaF, #2)', 1998, NULL, 3, '2', 'George R.R. Martin');
INSERT INTO `mydb`.`book` (`idbook`, `bookname`, `publicationyear`, `description`, `idbookseries`, `seriesnumber`, `writer`) VALUES (20, ' 	A Storm of Swords (ASoIaF,#3) ', 2000, NULL, 3, '3', 'George R.R. Martin');
INSERT INTO `mydb`.`book` (`idbook`, `bookname`, `publicationyear`, `description`, `idbookseries`, `seriesnumber`, `writer`) VALUES (21, ' A Feast for Crows (ASoIaF, #4)', 2005, NULL, 3, '4', 'George R.R. Martin');
INSERT INTO `mydb`.`book` (`idbook`, `bookname`, `publicationyear`, `description`, `idbookseries`, `seriesnumber`, `writer`) VALUES (22, 'A Dance with Dragons (ASoIaF, #5)', 2011, NULL, 3, '5', 'George R.R. Martin');
INSERT INTO `mydb`.`book` (`idbook`, `bookname`, `publicationyear`, `description`, `idbookseries`, `seriesnumber`, `writer`) VALUES (23, 'The Hunger Games (THG, #1)', 2008, NULL, 4, '1', 'Suzanne Collins');
INSERT INTO `mydb`.`book` (`idbook`, `bookname`, `publicationyear`, `description`, `idbookseries`, `seriesnumber`, `writer`) VALUES (24, 'Catching Fire (THG, #2)', 2009, NULL, 4, '2', 'Suzanne Collins');
INSERT INTO `mydb`.`book` (`idbook`, `bookname`, `publicationyear`, `description`, `idbookseries`, `seriesnumber`, `writer`) VALUES (25, 'Mockingjay (THG, #3)', 2010, NULL, 4, '3', 'Suzanne Collins');
INSERT INTO `mydb`.`book` (`idbook`, `bookname`, `publicationyear`, `description`, `idbookseries`, `seriesnumber`, `writer`) VALUES (26, 'The Ballad of Songbirds and Snakes (THG, #0)', 2020, NULL, 4, '4', 'Suzanne Collins');

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`picture`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`picture` (`idpicture`, `picturename`, `publicationyear`, `artist`, `style`, `description`, `filename`) VALUES (1, 'Testikuva', '2023', 'Aku Ankka', 'Söpö', 'Roope Ankka', 'roope.png');

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`artwork`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`artwork` (`idbook`, `idpicture`, `pagenumber`) VALUES (1, 1, 4);

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`user`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`user` (`iduser`, `username`, `password`, `email`) VALUES (1, 'Matti.Mainio', 'Kissa', 'matti@email.com');
INSERT INTO `mydb`.`user` (`iduser`, `username`, `password`, `email`) VALUES (2, 'Liisa.Lisko', 'Kissa', 'liisa@email.com');
INSERT INTO `mydb`.`user` (`iduser`, `username`, `password`, `email`) VALUES (3, 'Jeppe.Teppo', 'Kissa', 'markku@email.com');
INSERT INTO `mydb`.`user` (`iduser`, `username`, `password`, `email`) VALUES (4, 'Markku.Miettinen', 'Kissa', 'markku@email.com');
INSERT INTO `mydb`.`user` (`iduser`, `username`, `password`, `email`) VALUES (5, 'Matias.Heikkinen', 'Kissa', 'matias@email.com');
INSERT INTO `mydb`.`user` (`iduser`, `username`, `password`, `email`) VALUES (6, 'Ari.Rantanen', 'Kissa', 'ari@email.com');
INSERT INTO `mydb`.`user` (`iduser`, `username`, `password`, `email`) VALUES (7, 'Antero.Ahonen', 'Kissa', 'antero@email.com');
INSERT INTO `mydb`.`user` (`iduser`, `username`, `password`, `email`) VALUES (8, 'Veikko.Rantanen', 'Kissa', 'veikko@email.com');
INSERT INTO `mydb`.`user` (`iduser`, `username`, `password`, `email`) VALUES (9, 'Kari.Leppänen', 'Kissa', 'kari@email.com');
INSERT INTO `mydb`.`user` (`iduser`, `username`, `password`, `email`) VALUES (10, 'Kalevi.Koskinen', 'Kissa', 'kalevi@email.com');
INSERT INTO `mydb`.`user` (`iduser`, `username`, `password`, `email`) VALUES (11, 'Jari.Koskinen', 'Kissa', 'jari@email.com');

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`bookshelf`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`bookshelf` (`idbookshelf`, `iduser`, `owner`) VALUES (1, 1, 'Matti Mainio');
INSERT INTO `mydb`.`bookshelf` (`idbookshelf`, `iduser`, `owner`) VALUES (2, 2, 'Liisa Lisko');
INSERT INTO `mydb`.`bookshelf` (`idbookshelf`, `iduser`, `owner`) VALUES (3, 3, 'Jeppe Teppo');
INSERT INTO `mydb`.`bookshelf` (`idbookshelf`, `iduser`, `owner`) VALUES (4, 4, 'Markku Miettinen');
INSERT INTO `mydb`.`bookshelf` (`idbookshelf`, `iduser`, `owner`) VALUES (5, 5, 'Matias Heikkinen');
INSERT INTO `mydb`.`bookshelf` (`idbookshelf`, `iduser`, `owner`) VALUES (6, 6, 'Ari Rantanen');
INSERT INTO `mydb`.`bookshelf` (`idbookshelf`, `iduser`, `owner`) VALUES (7, 7, 'Antero Ahonen');
INSERT INTO `mydb`.`bookshelf` (`idbookshelf`, `iduser`, `owner`) VALUES (8, 6, 'Veikko Rantanen');
INSERT INTO `mydb`.`bookshelf` (`idbookshelf`, `iduser`, `owner`) VALUES (9, 9, 'Kari Leppänen');
INSERT INTO `mydb`.`bookshelf` (`idbookshelf`, `iduser`, `owner`) VALUES (10, 10, 'Kalevi Koskinen');
INSERT INTO `mydb`.`bookshelf` (`idbookshelf`, `iduser`, `owner`) VALUES (11, 11, 'Jari Koskinen');

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`userseries`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`userseries` (`idbookseries`, `idbookshelf`) VALUES (1, 1);
INSERT INTO `mydb`.`userseries` (`idbookseries`, `idbookshelf`) VALUES (2, 2);
INSERT INTO `mydb`.`userseries` (`idbookseries`, `idbookshelf`) VALUES (3, 3);
INSERT INTO `mydb`.`userseries` (`idbookseries`, `idbookshelf`) VALUES (4, 4);
INSERT INTO `mydb`.`userseries` (`idbookseries`, `idbookshelf`) VALUES (5, 5);

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`bookcopy`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`bookcopy` (`idbookcopy`, `bookname`, `edition`, `publicationyear`, `idbook`, `purchaseprice`, `purchasedate`, `condition`, `description`, `solddate`, `soldprice`, `idbookseries`, `idbookshelf`) VALUES (1, '', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`photo`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`photo` (`idphoto`, `photoname`, `idbookcopy`, `pagenumber`) VALUES (1, 'roope.png', 1, 4);

COMMIT;

