create database db_locadora_filme_ds2m_25_2;

use db_locadora_filme_ds2m_25_2;

create table tbl_filme(
	id int primary key auto_increment not null,
	nome varchar(100) not null,
	sinopse text not null,
	data_lancamento date null,
	duracao time not null,
	orcamento decimal not null,
	trailer varchar(200),
	capa varchar(200)
);

insert into tbl_filme ( nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa )
values('10 Coisas que Eu Odeio em Você', 
       'A situação está tensa na casa dos Stratford. Bianca (Larisa Oleynik) não vê a hora de arranjar um namorado, mas seu pai (Larry Miller) não permite que ela saia com garotos. Após muita insistência, o pai toma uma resolução: Bianca pode namorar, desde que sua irmã, Katharina (Julia Stiles), namore também. Só que Katharina é uma verdadeira megera, que não tem amigos na escola nem em lugar algum. Para resolver a questão, Cameron (Joseph Gordon-Levitt), apaixonado por Bianca, resolve contratar o misterioso Patrick Verona (Heath Ledger) para seduzir a futura cunhada.',
       '1999-08-06',
       '1:37',
       '130000000',
       'https://www.youtube.com/watch?v=yEmcEuS6xm4',
       'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/90/67/52/20107757.jpg');
 
 insert into tbl_filme ( nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa )
 values( 'Como Perder um Homem em 10 Dias', 
         'Ben Barry (Matthew McConaughey) é um publicitário que faz uma grande aposta com seu chefe: caso faça com que uma mulher se apaixone por ele em 10 dias ele será o responsável por uma concorrida campanha de diamantes que pertence à empresa. A vítima escolhida por Ben é Andie Anderson (Kate Hudson), uma jornalista feminista que está desenvolvendo uma matéria sobre como perder um homem em 10 dias e está decidida a infernizar a vida de qualquer homem que se aproximar dela. Ambos se conhecem em um bar, sendo que escolhem um ao outro como alvo de seus planos.',
         '2003-04-25',
         '1:50',
         '500000000',
         'https://www.youtube.com/watch?v=3IDeifYOCvM', 
         'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/87/01/04/19871068.jpg');