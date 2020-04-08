    CREATE TABLE IF NOT EXISTS userAuth 
    (id int(11) UNSIGNED NOT NULL AUTO_INCREMENT, 
    username varchar(150), 
    email varchar(200), 
    phone varchar(15), 
    password varchar(255), 
    ban BOOLEAN,createdAt 
    DATETIME NOT NULL DEFAULT NOW(), 
    updatedAt DATETIME NOT NULL DEFAULT NOW(), 
    PRIMARY KEY (id), 
    KEY (id));

    CREATE TABLE IF NOT EXISTS credentialsClients 
    (id int (11) UNSIGNED NOT NULL AUTO_INCREMENT, 
    ip varchar(100) UNIQUE, 
    domain varchar(255), 
    project varchar(255), 
    banned tinyint(1), 
    createdAt DATETIME NOT NULL DEFAULT NOW(), 
    updatedAt DATETIME NOT NULL DEFAULT NOW(), 
    PRIMARY KEY (id), KEY (id));

    CREATE TABLE IF NOT EXISTS userPosts 
    (id int(11) UNSIGNED NOT NULL AUTO_INCREMENT, 
    avatar varchar(255), 
    createdAt DATETIME NOT NULL DEFAULT NOW(), 
    updatedAt DATETIME NOT NULL DEFAULT NOW(), 
    PRIMARY KEY (id), 
    FOREIGN KEY (id) REFERENCES userAuth (id));