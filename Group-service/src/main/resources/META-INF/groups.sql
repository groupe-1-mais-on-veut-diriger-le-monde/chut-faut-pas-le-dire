drop table Groups if exists;
create table Groups (
		id bigint not null,
		name varchar(50) not null,
		Host varchar(20) not null, 
		member1 bigint ,
		member2 bigint ,
		member3 bigint ,
		member4 bigint ,
		member5 bigint ,
		
        primary key (id)
);
drop sequence if exists seq_id;
create sequence seq_id start with 1 increment by 1;
INSERT INTO Groups (id, name, Host,member1,member2,member3,member4,member5) VALUES (seq_id.nextval, 'group1', 'Antoine',1,2,3,4,5);
INSERT INTO Groups (id, name, Host,member1,member2,member3,member4,member5) VALUES (seq_id.nextval, 'group2', 'jan',6,7,8,9,10);
INSERT INTO Groups (id, name, Host,member1,member2,member3,member4,member5) VALUES (seq_id.nextval, 'group3', 'edin',11,12,13,14,15);

