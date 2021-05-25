CREATE TABLE `agence_voyage`.`agence`( 
    `id` INT NOT NULL AUTO_INCREMENT, 
    `nom` VARCHAR(45) NOT NULL UNIQUE,
    `adresse` VARCHAR(45) NOT NULL , 
    `longitude` VARCHAR(45) NOT NULL , 
    `latitude` VARCHAR(45) NOT NULL , 
    `wilaya` VARCHAR(45) NOT NULL , 
    PRIMARY KEY (`id`)) ENGINE = InnoDB;

INSERT INTO Values(1,"agence","agence","agence","agence","agence")

CREATE TABLE `agence_voyage`.`voyage`( 
    `id` INT NOT NULL AUTO_INCREMENT, 
    `lieu_depart` VARCHAR(45) NOT NULL ,
    `lieu_arrive` VARCHAR(45) NOT NULL , 
    `date_depart` DATE NOT NULL ,
    `heure_depart` TIME NOT NULL , 
    `duree`TIME NOT NULL ,  
    `prix` INT NOT NULL , 
    `max_place` INT NOT NULL , 
    `moyen_transport` ENUM("taxi","bus","avion","train") NOT NULL,
    `agence_id` INT NOT NULL , 
    PRIMARY KEY (`id`),
    FOREIGN KEY (`agence_id`) REFERENCES `agence`(`id`)) ENGINE = InnoDB;


CREATE TABLE `agence_voyage`.`user`( 
    `id` INT NOT NULL AUTO_INCREMENT, 
    `nom` VARCHAR(45) NOT NULL ,
    `prenom` VARCHAR(45) NOT NULL , 
    `date_naissance` DATE NOT NULL ,
    `email` VARCHAR(45) NOT NULL UNIQUE, 
    `password` VARCHAR(254) NOT NULL ,  
    `num_tel` VARCHAR(45) NOT NULL UNIQUE, 
    `adresse` VARCHAR(45) NOT NULL , 
    PRIMARY KEY (`id`)) ENGINE = InnoDB;


  CREATE TABLE `agence_voyage`.`reservation`( 
    `id` INT NOT NULL AUTO_INCREMENT, 
    `date_reservation` DATE NOT NULL ,
    `heure_reservation` TIME NOT NULL , 
    `nombre_place` INT NOT NULL , 
    `status` ENUM("valide","annule") NOT NULL, 
    `voyage_id` INT NOT NULL , 
    `user_id` INT NOT NULL , 
    PRIMARY KEY (`id`),
    FOREIGN KEY (`voyage_id`) REFERENCES `voyage`(`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)) ENGINE = InnoDB;  

CREATE TABLE `agence_voyage`.`admin`( 
    `id` INT NOT NULL AUTO_INCREMENT, 
    `nom` VARCHAR(45) NOT NULL ,
    `prenom` VARCHAR(45) NOT NULL , 
    `email` VARCHAR(45) NOT NULL UNIQUE, 
    `password` VARCHAR(254) NOT NULL , 
    PRIMARY KEY (`id`)) ENGINE = InnoDB;


CREATE TABLE `agence_voyage`.`newsletter`( 
    `id` INT NOT NULL AUTO_INCREMENT, 
    `email` VARCHAR(45) NOT NULL UNIQUE, 
    PRIMARY KEY (`id`)) ENGINE = InnoDB;
