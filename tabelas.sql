create table trabalho (
	codtra integer primary key autoincrement not null,
	nomtra varchar(60) not null,
	nomcur varchar(45) not null
);

create table aluno (
	codalu integer primary key autoincrement not null,
	nomalu varchar(45) not null,
	nomcur varchar(45) not null,
	fotalu varchar(100)
);

create table frequencia (
	codfrq integer primary key autoincrement not null,
	codtra integer not null,
	datfrq datetime
);

create table frequencia_aluno (
	codfrqalu integer primary key autoincrement not null,
	codalu integer not null,
	codfrq integer not null,
	sitalu char(1) check (sitalu in ('P','A')) not null ,
	assalu varchar(500)
);