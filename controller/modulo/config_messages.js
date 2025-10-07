/************************************************************************
 * Objetivo: arquivo responsável por padroes  de mensagens que o projeto irá realizar sempre no formato json (mensagens de erro e sucesso, etc)
 * 
 * Data: 07/10/2025
 * 
 * Autor: Samara Santos
 * 
 * Versão: 1.0
 * 
 * ************************************************************ 
*/

// cria um objeto da classe date para chegar a data atual
const dataAtual = new Date()

/***********************************MENSAGENS PADRONIZADAS******************************************************************/
const MESSAGE_HEADER = {development: 'Samara Santos',
                        api_description: 'API para manupular dados de Filmes',
                        status: Boolean, 
                        status_code: Number,
                        request_date: dataAtual.getTimezoneOffset(),
                        itens: {}
                       }

/***********************************MENSAGENS DE SUCESSOS******************************************************************/
const MESSAGE_REQUEST_SUCESS = {status: true, status_code: 200, message: 'Requisição bem sucedida!'}



/***********************************MENSAGENS DE ERRO******************************************************************/








module.exports = {
    MESSAGE_HEADER,
    MESSAGE_REQUEST_SUCESS
}