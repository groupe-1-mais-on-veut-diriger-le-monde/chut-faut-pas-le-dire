drop table groups if exists;
create table groups (
		id bigint not null,
		name varchar(50) not null,
		Host varchar(20) not null, 
        primary key (id)
);
drop sequence if exists seq_id;
CREATE SEQUENCE seq_id START WITH 1 INCREMENT BY 1;
INSERT INTO groups (id, name, Host) VALUES (seq_id.nextval, 'group1', 'Antoine');
INSERT INTO groups (id, name, Host) VALUES (seq_id.nextval, 'group2', 'jan');

