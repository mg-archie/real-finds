DROP DATABASE IF EXISTS realfinds_db;
CREATE DATABASE realfinds_db;

USE realfinds_db;

/*START TRANSACTION;

CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  password VARCHAR(100),
  favourite INT,
  PRIMARY KEY (id)
);

CREATE TABLE agent (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  password VARCHAR(100),
  brokerage VARCHAR(100),
  active_listings INT
  /*FOREIGN KEY (active_listings) REFERENCES listing(id)*/
);


CREATE TABLE favourites (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id),
  listing_id INT
  /*FOREIGN KEY (listing_id) REFERENCES listing(id)*/
);

CREATE TABLE listing (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  price INT NOT NULL,
  date_created DATE NOT NULL,
  listing_address VARCHAR(100),
  postal_code VARCHAR(100),
  city VARCHAR(100),
  listing_type VARCHAR (100),
  room INT,
  baths INT,
  agent_id INT NOT NULL,
  FOREIGN KEY (agent_id) REFERENCES agent(id)
);

COMMIT;

ALTER TABLE agent ADD FOREIGN KEY (active_listings) REFERENCES listing(id);
ALTER TABLE favourites ADD FOREIGN KEY (listing_id) REFERENCES listing(id);*/

