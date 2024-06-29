
create table login(
	username varchar(255) not null,
    password varchar(255) not null,
    primary key(username, password)
);

INSERT INTO login (username, password) VALUES
    ('user1', '1234'),
    ('user2', '1234'),
    ('user3', '1234'),
    ('user4', '1234');
