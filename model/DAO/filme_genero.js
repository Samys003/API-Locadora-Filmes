/************************************************************************
 * Objetivo: arquivo responsável pelo o CRUD de relacionamento entre as tabelas de filme e genero
 * 
 * Data: 22/10/2025
 * 
 * Autor: Samara Santos
 * 
 * Versão: 1.0
 * 
 * ************************************************************ 
*/


//Import da dependencia do Prisma que permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

// Cria um novo objeto, baseado na classe do PrismaClient
const prisma = new PrismaClient()


// função que retorna uma lista de todos os filmes do banco de dados
const getSelectAllMoviesGenres = async function () {
    try {

        //criando o comando para ser utilizado no sql, selecionando todos os filmes pelo id em ordem decrescente
        let sql = `select * from tbl_filme_genero order by id desc`

        //encaminha para o bd o script sql
        let result = await prisma.$queryRawUnsafe(sql)


        if (Array.isArray(result))
            return result
        else
            return false


    } catch (error) {

        return false

    }


}

// função que retorna um filme atraves do id
const getSelectByIdGenres = async function (id) {
    try {

        //criando o comando para ser utilizado no sql, selecionando todos os filmes pelo id em ordem decrescente
        let sql = `select * from tbl_filme_genero where id=${id}`

        //encaminha para o bd o script sql
        let result = await prisma.$queryRawUnsafe(sql)


        if (Array.isArray(result))
            return result
        else
            return false


    } catch (error) {

        return false

    }

}


// retorna uma lista de generos filtrando pelo id do filme
const getSelectGenresByIdMovies = async function (id_filme) {
    try {

        //criando o comando para ser utilizado no sql, selecionando todos os filmes pelo id em ordem decrescente
        let sql = `select tbl_genero.id, tbl_genero.nome_genero 
        from tbl_filme

            inner join tbl_filme_genero
                on tbl_filme.id = tbl_filme_genero.id_filme
            inner join tbl_genero
                on tbl_genero.id = tbl_filme_genero.id_genero

            where tbl_filme.id=${id_filme}`


        //encaminha para o bd o script sql
        let result = await prisma.$queryRawUnsafe(sql)
        
      


        if (Array.isArray(result))
            return result
        else
            return false


    } catch (error) {

        return false

    }

}

const getSelectMoviesByIdGenrer = async function (id_genero) {
    try {

        //criando o comando para ser utilizado no sql, selecionando todos os filmes pelo id em ordem decrescente
        let sql = `select tbl_filme.id, tbl_filme.nome 
        from tbl_filme

            inner join tbl_filme_genero
                on tbl_filme.id = tbl_filme_genero.id_filme
            inner join tbl_genero
                on tbl_genero.id = tbl_filme_genero.id_genero

            where tbl_genero.id id=${id_genero}`


        //encaminha para o bd o script sql
        let result = await prisma.$queryRawUnsafe(sql)


        if (Array.isArray(result))
            return result
        else
            return false


    } catch (error) {

        return false

    }

}

// insere um filme novo no banco de dados
const setInsertMoviesGenres = async function (filmeGenero) {
    try {
        let sql = `insert into tbl_filme_genero (id_filme , id_genero)
                            values( '${filmeGenero.id_filme}',
                                    '${filmeGenero.id_genero}');`
        // executerawusanfe() -> executa o script sql que não tem retorno de valores
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }



}

// altera um filme no banco de dados
const setUpdateMoviesGenres = async function (filmeGenero) {
    try {
        let sql = `update tbl_filme_genero set 
                                    id_filme              =   '${filmeGenero.id_filme}' , 
                                    id_genero             =   '${filmeGenero.id_genero}', 
                                   
                                where id = ${filmeGenero.id}`

        // executerawusanfe() -> executa o script sql que não tem retorno de valores
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }



}


const setDeleteMoviesGenres = async function (id) {
    try{

        let sql =`delete from tbl_filme_genero where id=${id}`

        let result = await prisma.$executeRawUnsafe(sql)   
        
        if (result)
            return true
        else
            return false

    }catch(error){
        return false
    }

}

const getSelectLastId = async function (){
    try {
    
        let sql = `select id from tbl_filme order by id desc limit 1`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)){
            return Number(result[0].id)
        } else{
            return false
        }
        
    } catch (error) {
        return false
    }
    
}





module.exports = {
    getSelectAllMoviesGenres,
    getSelectGenresByIdMovies,
    getSelectByIdGenres,
    getSelectMoviesByIdGenrer,
    setInsertMoviesGenres,
    setUpdateMoviesGenres,
    setDeleteMoviesGenres, 
    getSelectLastId
}