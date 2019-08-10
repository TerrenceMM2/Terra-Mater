--Use if you wish to replicate our plants table on your own machine
--Schema file contains table creation and csv file contains sample dataset

CREATE TABLE Plants(
    plantId INTEGER NOT NULL AUTO_INCREMENT,
    commonName VARCHAR(255) NOT NULL,
    scienName VARCHAR(255) NOT NULL,
    shortDesc TEXT NOT NULL,
    longDesc TEXT NOT NULL,
    poisHuman BOOLEAN NOT NULL,
    poisAnimal BOOLEAN NOT NULL,
    poisNotes VARCHAR(255),
    genCare TEXT NOT NULL,
    food TEXT NOT NULL,
    water TEXT NOT NULL,
    minTemp VARCHAR(255) NOT NULL,
    img BLOB NOT NULL,
    sunlight TEXT NOT NULL,
	PRIMARY KEY (plantId)
);