CREATE TABLE `agence_voyage`.`agence`( 
    `id` INT NOT NULL AUTO_INCREMENT, 
    `nom` VARCHAR(45) NOT NULL UNIQUE,
    `adresse` VARCHAR(45) NOT NULL , 
    `longitude` VARCHAR(45) NOT NULL , 
    `latitude` VARCHAR(45) NOT NULL , 
    `wilaya` VARCHAR(45) NOT NULL , 
    PRIMARY KEY (`id`)) ENGINE = InnoDB;

INSERT INTO agence (nom,adresse,longitude,latitude,wilaya) VALUES ("gare routiere de tlemcen", "koudia tlemcen" ,"34.906991278908336", "-1.3333071750270526" , "tlemcen");
INSERT INTO agence  (nom,adresse,longitude,latitude,wilaya) VALUES ("gare routiere du caroubier", "hussein dey" ,"36.74235368783304", "3.1081602845296827" , "alger");
INSERT INTO agence  (nom,adresse,longitude,latitude,wilaya) VALUES ("gare routiere oran nouvelle, es sénia", "pont el bahia, oran" ,"36.74235368783304", "3.1081602845296827" , "oran");

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

INSERT INTO voyage (lieu_depart,lieu_arrive,date_depart,heure_depart,duree,prix,max_place,moyen_transport,agence_id) VALUES ("tlemcen", "oran" ,"2021-02-15", "22:50:00" , "00:50:00" ,100, 32 , "taxi" , 1);
INSERT INTO voyage (lieu_depart,lieu_arrive,date_depart,heure_depart,duree,prix,max_place,moyen_transport,agence_id) VALUES ("tlemcen", "alger" ,"2021-02-17", "10:50:00" , "00:50:00" ,100, 32 , "taxi" , 3);



CREATE TABLE `agence_voyage`.`user`( 
    `id` INT NOT NULL AUTO_INCREMENT, 
    `nom` VARCHAR(45) NOT NULL ,
    `prenom` VARCHAR(45) NOT NULL , 
    `date_naissance` DATE NOT NULL ,
    `email` VARCHAR(45) NOT NULL UNIQUE, 
    `password` VARCHAR(45) NOT NULL ,  
    `num_tel` VARCHAR(45) NOT NULL UNIQUE, 
    `adresse` VARCHAR(45) NOT NULL , 
    PRIMARY KEY (`id`)) ENGINE = InnoDB;


INSERT INTO user (nom,prenom,date_naissance,email,password,num_tel,adresse) VALUES ("mebarki","anas","2021-02-15","anasmebarki1996@outlook.fr","123456","0123456789","dkqsdqskdqs kdsqjdkqs kdqsdqs");
INSERT INTO user (nom,prenom,date_naissance,email,password,num_tel,adresse) VALUES ("mebarki","med","2021-02-15","anasmebarki99991996@outlook.fr","123456","01234567489","dkqsdqskdqs kdsqjdkqs kdqsdqs");

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

INSERT INTO reservation (date_reservation,heure_reservation,nombre_place,status,voyage_id,user_id) VALUES ("2021-02-15","22:50:00",3,"valide",1,1);


CREATE TABLE `agence_voyage`.`admin`( 
    `id` INT NOT NULL AUTO_INCREMENT, 
    `nom` VARCHAR(45) NOT NULL ,
    `prenom` VARCHAR(45) NOT NULL , 
    `email` VARCHAR(45) NOT NULL UNIQUE, 
    `password` VARCHAR(45) NOT NULL , 
    PRIMARY KEY (`id`)) ENGINE = InnoDB;