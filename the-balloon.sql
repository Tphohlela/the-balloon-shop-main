create table valid_color (id serial not null primary key, color_name text);
INSERT INTO valid_color (id,color_name) VALUES ('1','Orange');
INSERT INTO valid_color (id,color_name) VALUES ('2','Purple');
INSERT INTO valid_color (id,color_name) VALUES ('3','Lime');

create table invalid_color (id serial not null primary key, color_name text, count integer);