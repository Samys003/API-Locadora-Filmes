/************************************************************************
 * Objetivo: arquivo responsável pela manipulação de dados entre o app e a model, para o CRUD de Filmes
 * 
 * Data: 07/10/2025
 * 
 * Autor: Samara Santos
 * 
 * Versão: 1.0
 * 
 * ************************************************************ 
*/

//import da model do DAO do filme
const { json } = require('body-parser')
const filmeDAO = require('../../model/DAO/filme.js')

//import do aquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//retorna uma lista de todos os filmes
const listarFilmes = async function () {
    try {
        //Chama a função do DAO para retornar a lista de filmes do BD
        let resultFilmes = await filmeDAO.getSelectAllMovies()
        // console.log(resultFilmes)

        //CRIANDO UM OBJETO NOVO PARA AS MENSAGENS
        let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
        if (resultFilmes) {
            if (resultFilmes.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.itens.filmes = resultFilmes

                return MESSAGES.DEFAULT_HEADER //200
            } else {
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500 
    }

}

//busca um filme procurando pelo id
const buscarFilmeId = async function (id) {
    try {
        let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

        if(!isNaN(id)){
            let resultFilmes = await filmeDAO.getSelectByIdMovies()

        }else{
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

//Insere um filme
const inserirFilme = async function (id) {

}

//Atualizar filme buscando pelo ID
const atualizarFilme = async function (filme, id) {

}

//exclui um filme buscando pelo ID
const excluirFilme = async function (id) {

}

module.exports = {
    listarFilmes
}