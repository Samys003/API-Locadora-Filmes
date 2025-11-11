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
const DEFAULT_HEADER = {

                        development: 'Samara Santos',
                        api_description: 'API para manupular dados de Filmes',
                        status: Boolean, 
                        status_code: Number,
                        request_date: dataAtual.toString(), // ou podemos usar tolocalestring()
                        itens: {}

                       }

/***********************************MENSAGENS DE SUCESSOS******************************************************************/
const SUCCESS_REQUEST = {
                                    status: true, 
                                    status_code: 200,
                                    message: 'Requisição bem sucedida!'
                                }

const SUCESS_REQUEST        = {
                                    status: true, 
                                    status_code: 415, 
                                    message: 'requisição bem sucedida!!!'

}
const SUCESS_CREATED_ITEM  = {
                                    status: true, 
                                    status_code: 201, 
                                    message: 'item criado com sucesso!!!'  
}

const SUCESS_UPDATED_ITEM ={
                                    status: true, 
                                    status_code: 200, 
                                    message: 'item atualizado com sucesso!!!'  
}

/***********************************MENSAGENS DE ERRO******************************************************************/
const ERROR_NOT_FOUND = {
                                    status: false, 
                                    status_code: 404,
                                    message: 'Não foram encontrados dados de retorno!'
                                }

const ERROR_INTERNAL_SERVER_CONTROLLER = {
                                    status: false, 
                                    status_code: 500,
                                    message: 'Não foi possivel processar a requisição devido a erros internos no servidor (CONTROLLER)!'
                                }

const ERROR_INTERNAL_SERVER_MODEL = {
                                    status: false, 
                                    status_code: 500,
                                    message: 'Não foi possivel processar a requisição devido a erros internos no servidor (MODELAGEM DE DADOS)!'
                                }

const ERROR_REQUIRED_FIELDS = {
                                    status: false,
                                    status_code: 400,
                                    message: 'Não foi possivel processar a requisição, pois existem campos obrigatorios que devem ser encaminhados e atendidos conforme a documentação!' 
                                }

const ERROR_CONTENT_TYPE    = {
                                    status: false,
                                    status_code: 415,
                                    message: 'Não foi possivel processar a requisição, pois o tipo de dados enviado deve ser JSON!' 
}
const ERROR_RELATIONAL_INSERTION = {
                                    status: false,
                                    status_code: 500,
                                    message: 'A requisição do item principal foi processada com sucesso, porém houveram problemas ao inserir dados na tabela de relação !!!' 
}


module.exports = {

    DEFAULT_HEADER,
    SUCCESS_REQUEST,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_REQUIRED_FIELDS,
    SUCESS_REQUEST,
    SUCESS_CREATED_ITEM,
    ERROR_CONTENT_TYPE,
    SUCESS_UPDATED_ITEM,
    ERROR_RELATIONAL_INSERTION
    
}