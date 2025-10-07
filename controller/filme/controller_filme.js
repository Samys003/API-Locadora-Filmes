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
const filmeDAO = require('../../model/DAO/filme.js')

//import do aquivo de mensagens
const MESSAGES = require('../modulo/config_messages.js')


//retorna uma lista de todos os filmes
const listarFilmes = async function(){

    //Chama a função do DAO para retornar a lista de filmes do BD
    let resultFilmes = await filmeDAO.getSelectAllMovies()

    if(resultFilmes){
        if(resultFilmes.length > 0){
            MESSAGES.MESSAGE_HEADER.status = MESSAGES.MESSAGE_REQUEST_SUCESS.message
            
        }
    }
        
    


}

//busca um filme procurando pelo id
const buscarFilmeId = async function (id) {
    
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