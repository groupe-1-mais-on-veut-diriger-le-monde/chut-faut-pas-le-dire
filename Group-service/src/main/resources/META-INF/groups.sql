drop table Groups if exists;
create table Groups (
		id bigint not null,
		name varchar(50) not null,
		Host bigint not null, 
		member1 bigint ,
		member2 bigint ,
		member3 bigint ,
		member4 bigint ,
		member5 bigint ,
		result varchar(255),
		
        primary key (id)
);
drop sequence if exists seq_id;
create sequence seq_id start with 1 increment by 1;
INSERT INTO Groups (id, name, Host,member1,member2,member3,member4,member5,result) VALUES (seq_id.nextval, 'group1', 11,1,2,3,4,5,'ot');
INSERT INTO Groups (id, name, Host,member1,member2,member3,member4,member5,result) VALUES (seq_id.nextval, 'group2', 21,6,7,8,9,10,'to');
INSERT INTO Groups (id, name, Host,member1,member2,member3,member4,member5,result) VALUES (seq_id.nextval, 'group3', 31,11,12,13,14,15,'loc');

