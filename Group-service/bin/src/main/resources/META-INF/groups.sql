drop table Groups if exists;
create table Groups (
		id bigint not null,
		name varchar(50) not null,
		Host varchar(20) not null, 
        primary key (id)
);
drop sequence if exists seq_id;
create sequence seq_id start with 1 increment by 50;
INSERT INTO Groups (id, name, Host) VALUES (seq_id.nextval, 'group1', 'Antoine');
INSERT INTO Groups (id, name, Host) VALUES (seq_id.nextval, 'group2', 'jan');

