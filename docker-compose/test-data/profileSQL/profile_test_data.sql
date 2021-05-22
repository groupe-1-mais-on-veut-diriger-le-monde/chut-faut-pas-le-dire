drop table Profile if exists;
create table Profile (
		id bigint not null,
		name varchar(50) not null,
		age bigint not null,
		genre1 varchar(50) ,
		genre2 varchar(50) ,
		genre3 varchar(50) ,
		host bigint,
		Group1 bigint,		
		 primary key (id)
        
);
drop sequence if exists seq_id;
CREATE SEQUENCE seq_id START WITH 1 INCREMENT BY 1;
INSERT INTO Profile ( id,name,age,genre1,genre2,genre3,host,Group1) VALUES (seq_id.nextval, 'jan',24,'action','comedie','crime',1,2);
INSERT INTO Profile ( id,name,age,genre1,genre2,genre3,host,Group1) VALUES (seq_id.nextval, 'Atoine',22, 'action','comedie','crime',1,2);



