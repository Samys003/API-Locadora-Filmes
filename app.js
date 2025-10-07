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

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')



// ultilizara a porta enviada do servidor ou (||) ultilizara a porta local
const PORT = process.PORT || 8080

// criando uma instancia de uma classe do express
const app = express()

//Configuração de permissões 
//request = chegada de algo/  
//response = receber/ entregar algo
// next = proximo endpoint

app.use((request, response, next)=>{
    //              acesso sera pelo servidor original, '*'- servidor     
    response.header('Access-Control-Allow-Origin', '*') //Servidor de origem da API
    response.header('Access-Control-Allow-Methods', 'GET') //Verbos permitidos na API
    app.use(cors())
    next() // Próximo, carregar os proximos endpoints
    
})

// request - chegada de dados na API
// response - retorno de dados na API

//Import das controllers
const controllerFilme = require('./controller/filme/controller_filme.js')

//EndPorints para a rota de filme
app.get('v1/locadora/filme', cors(), async function (request, response) {
    
    let filme = await controllerFilme.listarFilmes()

    response.status(filme.status_code)
    response.json(filme)

    
})

app.listen(PORT, function(){
    console.log('API aguardando requisições...')
})









