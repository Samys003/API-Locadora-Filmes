
/************************************************************************
 * Objetivo: arquivo responsável pela manipulação de dados entre o app e a model, para o CRUD de Filmes e genero
 * 
 * Data: 05/11/2025
 * 
 * Autor: Samara Santos
 * 
 * Versão: 1.0
 * 
 * ************************************************************ 
*/
//import da model do DAO do filme
const { json } = require('body-parser')
const filmeGeneroDAO = require('../../model/DAO/filme_genero.js')

//import do aquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

// garantir que a mensagem seja uma string
let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))


const listarFilmesGeneros = async function () {
    try {

        let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

        //Chama a função do DAO para retornar a lista de filmes do BD
        let resultFilmesGeneros = await filmeGeneroDAO.getSelectAllMoviesGenres()
        // console.log(resultFilmes)

        //CRIANDO UM OBJETO NOVO PARA AS MENSAGENS

        if (resultFilmesGeneros) {
            if (resultFilmesGeneros.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.filmes_generos = resultFilmesGeneros

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

//busca um filme procurando pelo idfilme
const buscarFilmeGeneroId = async function (idfilme) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(idfilme) && idfilme != '' && idfilme != null && idfilme > 0) {
            let resultFilmesGeneros = await filmeGeneroDAO.getSelectAllMoviesGenres(Number(idfilme))

            if (resultFilmesGeneros) {
                if (resultFilmes.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.itens.filme_genero = resultFilmesGeneros

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

//retornar os generos filtrando pelo filme
const listarGenerosIdFilme = async function (idfilme) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(idfilme) && idfilme != '' && idfilme != null && idfilme > 0) {
            let resultFilmesGeneros = await filmeGeneroDAO.getSelectGenresByIdMovies(Number(idfilme))

            if (resultFilmesGeneros) {
                if (resultFilmes.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.itens.filme_genero = resultFilmesGeneros

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

const listarFilmesIdGenero = async function (idGenero) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(idGenero) && idGenero != '' && idGenero != null && idGenero > 0) {
            let resultFilmesGeneros = await filmeGeneroDAO.getSelectMoviesByIdGenrer(Number(idGenero))

            if (resultFilmesGeneros) {
                if (resultFilmes.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.itens.filme_genero = resultFilmesGeneros

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
const inserirFilmeGenero = async function (filmeGenero, contentType) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //chama a função de validar todos os dados do filme
       
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosFilmeGeneros(filmeGenero)


            if (!validar) {

                let resultFilmesGeneros = await filmeGeneroDAO.setInsertMoviesGenres(filmeGenero)

                if (resultFilmesGeneros) {
                    let lastId = await filmeGeneroDAO.getSelectLastId()

                    if(lastId){

                        filmeGenero.idfilme = lastId

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_CREATED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items   = filmeGenero

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
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Atualizar filme buscando pelo ID
const atualizarFilme = async function (filmeGenero, idfilme, contentType) {


    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        //chama a função de validar todos os dados do filme
        let validar = await validarDadosFilmeGeneros(filmeGenero)

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            if (!validar) {

                //validação de ID valido, chama a função controller que verifica se o idfilme existe no bd
                let validarID = await buscarFilmeGeneroId(idfilme)

                if (validarID.status_code == 200) {

                    //Adiciona o filme no json de dados, para ser encaminhado ao DAO
                    filmeGenero.idfilme = Number(idfilme)

                    let resultFilmesGeneros = await filmeGeneroDAO.setUpdateMoviesGenres(filmeGenero)

                    if (resultFilmesGeneros) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.itens.filme_Genero = filmeGenero

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
const excluirFilmeGenero = async function (idfilme) {
    console.log(idfilme)
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(idfilme) && idfilme != '' && idfilme != null && idfilme > 0) {
            let resultFilmesGeneros = await filmeGeneroDAO.setDeleteMoviesGenres(Number(idfilme))

            if (resultFilmesGeneros) {
                if (resultFilmesGeneros.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.itens.filme_genero = resultFilmesGeneros

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
const validarDadosFilmeGeneros = async function (filmeGenero) {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))


    if (filmeGenero.id_filme < 0 || filmeGenero.id_filme == '' || filmeGenero.id_filme == undefined || filmeGenero.id_filme == null ||filmeGenero.id_filme == isNaN) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += `[Id_filme INCORRETO]`
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (filmeGenero.id_genero < 0 || filmeGenero.id_genero == '' || filmeGenero.id_genero == undefined || filmeGenero.id_genero == null ||filmeGenero.id_genero == isNaN) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += `[Id_genero INCORRETO]`
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}



module.exports = {
    listarFilmesGeneros,
    buscarFilmeGeneroId,
    inserirFilmeGenero,
    atualizarFilme,
    excluirFilmeGenero,
    validarDadosFilmeGeneros,
    listarFilmesIdGenero,
    listarGenerosIdFilme
}