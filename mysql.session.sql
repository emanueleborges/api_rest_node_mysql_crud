
CREATE DATABASE mydb IF NOT EXISTS

CREATE TABLE IF NOT EXISTS `mydb`.`produtos` (
  `idproduto` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `preco` FLOAT NOT NULL,
  PRIMARY KEY (`idproduto`))
ENGINE = InnoDB


CREATE TABLE IF NOT EXISTS `mydb`.`pedidos` (
  `idpedidos` INT NOT NULL AUTO_INCREMENT,
  `idproduto` INT NOT NULL,
  `quantidade` FLOAT NOT NULL,
  PRIMARY KEY (`idpedidos`),
  INDEX `fk_pedidos_produtos_idx` (`idproduto` ASC) VISIBLE,
  CONSTRAINT `fk_pedidos_produtos`
    FOREIGN KEY (`idproduto`)
    REFERENCES `mydb`.`produtos` (`idproduto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB


CREATE TABLE IF NOT EXISTS `mydb`.`usuarios` (
  `idusuarios` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idusuarios`))
ENGINE = InnoDB


select * from mydb.usuarios;