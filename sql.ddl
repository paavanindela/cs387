DROP TABLE IF EXISTS Host CASCADE;
DROP TABLE IF EXISTS Controller CASCADE;
DROP TABLE IF EXISTS ControllerHost CASCADE;
DROP TABLE IF EXISTS Application CASCADE;
DROP TABLE IF EXISTS Metric CASCADE;
DROP TABLE IF EXISTS Message;
DROP TABLE IF EXISTS Threshold;
DROP FUNCTION IF EXISTS tf1 CASCADE;
CREATE TABLE Metric(
    name varchar(20) not null,
    PRIMARY KEY(name)
);
CREATE TABLE Host(
    hostname varchar(60) not null,
    ipAddress varchar(20) not null check(ipAddress like '%.%.%.%'),
    macAddress varchar(20) check(macAddress like '__:__:__:__:__:__'),
    osType int,
    influx boolean not null ,
    PRIMARY KEY(hostname)
);
CREATE TABLE Controller(
    username varchar(20) not null,
    password varchar(60) not null ,
    status int not null check(status between 0 and 2),
    PRIMARY KEY(username) 
);

CREATE TABLE ControllerHost(
    username varchar(20) not null,
    hostname varchar(60) not null,
    PRIMARY KEY(username, hostname) ,
    FOREIGN KEY(username) references Controller on delete CASCADE,
    FOREIGN KEY(hostname) references Host on delete CASCADE
);
CREATE TABLE Application(
    appId int not null,
    name varchar(20) not null,
    status int not null check(status between 0 and 1),
    owner varchar(20) not null,
    hostname varchar(20) not null,
    PRIMARY KEY(appId) ,
    FOREIGN KEY(hostname) references Host on delete CASCADE
);
CREATE TABLE Message(
    msgId int not null,
    username varchar(20) not null,
    message text not null,
    PRIMARY KEY(msgId),
    FOREIGN KEY(username) references Controller on delete CASCADE
);
CREATE TABLE Threshold(
    username varchar(20) not null,
    hostname varchar(20) not null,
    metricname varchar(20) not null,
    threshold int not null,
    PRIMARY KEY(username, hostname, metricName),
    FOREIGN KEY(username) references Controller on delete CASCADE,
    FOREIGN KEY(hostname) references Host on delete CASCADE,
    FOREIGN KEY(metricname) references Metric(name) on delete CASCADE
);
CREATE FUNCTION tf1()
    RETURNS TRIGGER AS
$$
BEGIN
    IF ALL(SELECT status FROM Controller WHERE username = NEW."username") != 1 THEN
        RAISE EXCEPTION 'controller must be active';
    END IF;
    RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';

CREATE TRIGGER t1 BEFORE UPDATE OR INSERT
    ON ControllerHost
    FOR EACH ROW
    EXECUTE PROCEDURE tf1();
