drop table Profile if exists;
create table Profile (
		id bigint not null,
		name varchar(50) not null,
		age bigint not null,
		comedy bigint not null,
		sci bigint not null,
		Horror bigint not null,
		romance bigint not null,
		action bigint not null,
		thriller bigint not null,
		drama bigint not null,
		mystery bigint not null,
		crime bigint not null,
		animation bigint not null,
		adventure bigint not null,
		fantasy bigint not null,
		comdedy_Romance bigint not null,
		action_comedy bigint not null,
		superhero bigint not null,
		voir varchar(20) not null,
		Group1 bigint ,
		Group2 bigint ,
		Group3 bigint ,
		Group4 bigint ,
		Group5 bigint ,
		 primary key (id)
        
);
drop sequence if exists seq_id;
CREATE SEQUENCE seq_id START WITH 1 INCREMENT BY 1;
INSERT INTO Profile ( id,name,age,  comedy,  sci, Horror, romance, action, thriller, drama, mystery, crime, animation, adventure, fantasy, comdedy_Romance, action_comedy, superhero, voir,Group1,Group2,Group3,Group4,Group5) VALUES (seq_id.nextval, 'jan',24, 1,  2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 'Avatar',1,2,3,4,5);
INSERT INTO Profile ( id,name,age,  comedy,  sci, Horror, romance, action, thriller, drama, mystery, crime, animation, adventure, fantasy, comdedy_Romance, action_comedy, superhero, voir,Group1,Group2,Group3,Group4,Group5) VALUES (seq_id.nextval, 'Atoine',22, 11,  21, 31, 41, 51, 61, 71, 81, 91, 101, 111, 121, 131, 141, 151,'Toto',6,7,8,9,10);

