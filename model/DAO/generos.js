/**********************************************************
 * Objetivo: arquivo responsável pelo CRUD de dados no MySQL referente ao genero do filme
 * 
 * Data: 22/10/2025
 * 
 * Versão: 1.0
 * 
 * *********************************************************
 */



//Import da dependencia do Prisma que permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

const prisma = new PrismaClient()

// função que exibe todos os generos
const getSelectAllGenrres = async function() {

    try {
        let sql = `select * from tbl_genero order by id desc`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false
        
    } catch (error) {
        console.log(error)
        return false
    }    


}

const getSelectGenrresId = async function (id) {
    try {

        let sql = `select * from tbl_genero where id=${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

        } catch (error) {
            return false         
    }
}





module.exports = {
    getSelectAllGenrres,
    getSelectGenrresId

}