CREATE DATABASE poslog CHARACTER SET UTF8;

CREATE TABLE poslog.log(
	id integer NOT NULL auto_increment,
	uid varchar(64) NOT NULL,
	timestamp varchar(20) NOT NULL,
	DATA varchar(1024) NOT NULL,
	index(id),
	unique key(uid, timestamp)
);