/************************************************************************
 * Objetivo: arquivo responsável pela manipulação de dados entre o app e a model, para o CRUD de Filmes
 * 
 * Data: 07/10/2025
 * 
 * Autor: Samara Santos
 * 
 * Versão: 1.0 (CRUD basico do filme, sem as relações com outras tabelas)
 *
 * Versão: 1.1 (CRUD com relacionamento com a tabela genero)
 *  
 * ************************************************************ 
*/

//import da model do DAO do filme
const { json } = require('body-parser')
const filmeDAO = require('../../model/DAO/filme.js')
const filmeGeneroDao = require ('../../model/DAO/filme_genero.js')
const controllerFilmeGenero = require ('./controller_filme_genero.js')

//import do aquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

// garantir que a mensagem seja uma string
let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

//retorna uma lista de todos os filmes
const listarFilmes = async function () {
    try {

        //Chama a função do DAO para retornar a lista de filmes do BD
        let resultFilmes = await filmeDAO.getSelectAllMovies()
        // console.log(resultFilmes)

        //CRIANDO UM OBJETO NOVO PARA AS MENSAGENS

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

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultFilmes = await filmeDAO.getSelectByIdMovies(Number(id))

            if (resultFilmes) {
                if (resultFilmes.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.itens.filme = resultFilmes

                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID INCORRETO]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

//Insere um filme
const inserirFilme = async function (filme, contentType) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //chama a função de validar todos os dados do filme
        let validar = await validarDadosFilme(filme)

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            if (!validar) {

                let resultFilmes = await filmeDAO.setInsertMovies(filme)

                if (resultFilmes) {
                    let lastId = await filmeDAO.getSelectLastId()

                    if(lastId){

                        //processar a inserção dos dados na tabela de relação
                        // entre filme e genero

                        //filme.genero.forEach(async function(genero){
                        for(genero of filme.genero){
                            // cria o json com o id do filme e o id do genero
                            let filmeGenero = {id_filme: lastId, id_genero: genero.id}

                            // encaminha o json com o id do filme e do genero para a controller filmeGenero
                            let resultFilmesGeneros = await controllerFilmeGenero.inserirFilmeGenero(filmeGenero, contentType)
                            

                            if(resultFilmesGeneros.status_code != 201){
                                return MESSAGES.ERROR_RELATIONAL_INSERTION // 500 Problema na tabela de relação
                            }
                        }

                        filme.id = lastId

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_CREATED_ITEM.message

                    delete filme.genero

                    let resultDadosGeneros = await controllerFilmeGenero.listarGenerosIdFilme(lastId)
                    filme.genero = resultDadosGeneros.itens.filmes_generos
                    
                    

                    MESSAGES.DEFAULT_HEADER.items  = filme

                    return MESSAGES.DEFAULT_HEADER // 201
                    
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            }else{
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
            } else {
                return validar // 400
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Atualizar filme buscando pelo ID
const atualizarFilme = async function (filme, id, contentType) {


    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        //chama a função de validar todos os dados do filme
        let validar = await validarDadosFilme(filme)

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            if (!validar) {

                //validação de ID valido, chama a função controller que verifica se o id existe no bd
                let validarID = await buscarFilmeId(id)

                if (validarID.status_code == 200) {

                    //Adiciona o filme no json de dados, para ser encaminhado ao DAO
                    filme.id = Number(id)

                    let resultFilmes = await filmeDAO.setUpdateMovies(filme)

                    if (resultFilmes) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.itens.filme = filme

                        return MESSAGES.DEFAULT_HEADER // 200

                    } else {

                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }

                } else {

                    return validarID // a função buscarfilmeID podera retornar (400 ou 404 ou 500)
                }

            } else {

                return validar // 400 referente a validação do dados
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }


}

//exclui um filme buscando pelo ID
const excluirFilme = async function (id) {
    console.log(id)
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultFilmes = await filmeDAO.setDeleteMovies(Number(id))

            if (resultFilmes) {
                if (resultFilmes.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.itens.filme = resultFilmes

                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    return MESSAGES.SUCCESS_REQUEST //404
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID INCORRETO]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

//validação de dados de cadastro e atualização do filme
const validarDadosFilme = async function (filme) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))


    if (filme.nome == '' || filme.nome == undefined || filme.nome == null || filme.nome.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += `[Nome incorreto]`
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.sinopse == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += `[Nome sinopse]`
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (filme.data_lancamento == undefined || filme.data_lancamento.length != 10) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += `[Nome data_lancamento]`
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.duracao == '' || filme.duracao == undefined || filme.duracao == null || filme.duracao.length != 8) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += `[Nome duracao]`
        return MESSAGES.ERROR_REQUIRED_FIELDS


    } else if (filme.orcamento == '' || filme.orcamento == undefined || filme.orcamento == null || filme.orcamento.length > 14 || typeof (filme.orcamento) != 'number') {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += `[Nome orcamento]`
        return MESSAGES.ERROR_REQUIRED_FIELDS


    } else if (filme.trailer == undefined || filme.trailer.length >= 200) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += `[Nome trailer]`
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filme.capa == '' || filme.capa == undefined || filme.capa == null || filme.capa.length > 200) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += `[Capa incorreto]`
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else {
        return false
    }
}






module.exports = {
    listarFilmes,
    buscarFilmeId,
    inserirFilme,
    atualizarFilme,
    excluirFilme
}

