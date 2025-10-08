/************************************************************************
 * Objetivo: arquivo responsável pelo CRUD de dados no MySQL referente ao filme
 * 
 * Data: 01/10/2025
 * 
 * Autor: Samara Santos
 * 
 * Versão: 1.0
 * 
 * ************************************************************ */
/*

exemplos de dependencias para conexão com o banco de dados
    
    Sequilize -> Foi Utilizado em muitos projetos desde o incio do node
    Prisma    -> é uma dependencia atual que trabalha com banco de dados (MYSQUL, PostgreSQL, SQL Server) (SQL ou ORM)
        npm install prisma --save -> instalar o prisma (conexão com o database)
        npm install @prisma/client --save -> instalar o cliente do prisma (executar scripts sql no bd)
        npx prisma init                   -> prompt de comando para inicializar o prisma no projeto 
        npx prisma migrate dev            -> realiza os sincronismo entre o prisma e o BD(CUIDADO , NESSE PROCESSO VOCÊ PODERA PERDER DADOS REAIS DO BD!! POIS ELE PEGA E CRIA AS TABELAS PROGRAMADAS NO ORM SCHEMA.PRISMA)
        npx prisma generate               -> apenas realiza o sincronismo entre o prisma e o BD, geralmente usamos para rodar o projeto em um pc novo
    Knex      -> É uma dependencia atual que trabalha com MYSQL

     mongoose  -> É uma dependencia para o Mongo DB (Não relacional) 

    // executeRaw -> permite executar um script sql sem estar em uma variavel que não retorna dados do banco (insert,update e delete)
    // queryRaw -> permite executar um script sql sem estar em uma variavel e que retorna valores no banco (select) e faz tratamento de segurança contra SQL ijection    
    // executeRawUnsafe - quando não volta valor do banco (insert , update e delete)
    // queryRawUnsafe() quando volta valor do banco (select)

*/

//Import da dependencia do Prisma que permite a execução de script SQL no BD
const {PrismaClient} = require('../../generated/prisma')

// Cria um novo objeto, baseado na classe do PrismaClient
const prisma = new PrismaClient()


// função que retorna uma lista de todos os filmes do banco de dados
const getSelectAllMovies = async function(){
    try {

        //criando o comando para ser utilizado no sql, selecionando todos os filmes pelo id em ordem decrescente
        let sql = `select * from tbl_filme order by id desc`

        //encaminha para o bd o script sql
        let result = await prisma.$queryRawUnsafe(sql) 


        if(Array.isArray(result))
            return result
        else
             return false
        

    } catch (error) {
        
        return false
    
    }

   
}

// função que retorna um filme atraves do id
const getSelectByIdMovies = async function(id){
    try {

        //criando o comando para ser utilizado no sql, selecionando todos os filmes pelo id em ordem decrescente
        let sql = `select * from tbl_filme where id=${id}`

        //encaminha para o bd o script sql
        let result = await prisma.$queryRawUnsafe(sql) 


        if(Array.isArray(result))
            return result
        else
             return false
        

    } catch (error) {
        
        return false
    
    }

}

// insere um filme novo no banco de dados
const setInsertMovies = async function(){

}

// altera um filme no banco de dados
const setUpdateMovies = async function(id){

}


const setDeleteMovies = async function (id){
    
}


module.exports = {
    getSelectAllMovies,
    getSelectByIdMovies

}