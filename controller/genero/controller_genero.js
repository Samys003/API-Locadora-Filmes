/************************************************************************
 * Objetivo: arquivo responsável pela manipulação de dados entre o app e a model, para o CRUD de genero
 * 
 * Data: 22/10/2025
 * 
 * Autor: Samara Santos
 * 
 * Versão: 1.0
 * 
 * ************************************************************ 
*/

const generoDAO = require('../../model/DAO/generos.js')

const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))


// retorna uma lista de gerenos
const listarGeneros = async function () {
    try {

        let resultGeneros = await generoDAO.getSelectAllGenrres()

        if (resultGeneros) {
            if (resultGeneros.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.itens.generos = resultGeneros

                return MESSAGES.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_NOT_FOUND
            }

        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
    }
}




module.exports = {
    listarGeneros
}