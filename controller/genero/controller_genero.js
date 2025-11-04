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

const buscarGeneroId = async function (id) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try{

        if (!isNaN(id) && id != '' && id != null && id > 0){
            let resultGeneros = await generoDAO.getSelectGenrresId(Number(id))

            if(resultGeneros){
                if(resultGeneros.length > 0){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.itens.genero = resultGeneros

                    return MESSAGES.DEFAULT_HEADER
                
                } else{
                    return MESSAGES.ERROR_NOT_FOUND
                }
            } else{
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }

        } else{
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID INCORRETO]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }

    }catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
    
}

const inserirGenero = async function (genero , contentType) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try{
       
       

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            
            let validar = await validarDadosGenero(genero)
            console.log(validar)
            if (!validar) {
                let resultGeneros = await generoDAO.setInsertGenrrers(genero)

                if(resultGeneros){
                    let lastId = await generoDAO.getSelectLastId()

                    if(lastId){
                        genero.id = lastId

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = genero

                        return MESSAGES.DEFAULT_HEADER
                    
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                    }

                }else{
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                }

            }else {
                return validar
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }

    }catch (error){
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }
    
}



const validarDadosGenero = async function (genero) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (genero.nome_genero == '' || genero.nome_genero == undefined || genero.nome_genero == null || genero.nome_genero.length > 50 ){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += `[Genero incorreto]`
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else {
    
        return false
    }
    
}

const atualizarGenero = async function (genero, id, contentType) {
    
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try{

        let validar = await validarDadosGenero(genero)

                                            //garante que o contentType seja no formato APLLICATION/JSON
        if (String(contentType).toUpperCase() == 'APLLICATION/JSON'){

            if(!validar){
                
                let validarID = await buscarGeneroId(id)

                if(validarID.status_code == 200){

                    genero.id = Number(id)

                    let resultGeneros = await generoDAO.setUpdatedGenner(genero)

                    if(resultGeneros){
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.genero = genero 

                        return MESSAGES.DEFAULT_HEADER
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return validarID
                }

            } else{
                return validar
            }
      } else {
         return MESSAGES.ERROR_CONTENT_TYPE
      } 

    }catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}


module.exports = {
    listarGeneros,
    buscarGeneroId,
    inserirGenero,
    atualizarGenero
}