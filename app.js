/************************************************************************
 * Objetivo: arquivo responsável por padroes  rotas que o projeto irá realizar (put, get, post, delete)
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
//
const bodyParser = require('body-parser')

//Cria um objeto especialista no formato json, para receber dados via POST e PUT
const bodyParserJson = bodyParser.json()



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
const  controllerGenero  = require('./controller/genero/controller_genero.js')

//EndPorints para a rota de filme

//retorna todos os filmes
app.get('/v1/locadora/filme', cors(), async function (request, response) {
    
    
    let filme = await controllerFilme.listarFilmes()

    response.status(filme.status_code)
    response.json(filme)

    
})

//:id esta sendo passado como parametro // 
app.get('/v1/locadora/filme/:id', cors(), async function (request, response) {
    let idfilme = request.params.id
    
    //recebe o ID encaminhado via parametro na requisição
    let filme = await controllerFilme.buscarFilmeId(idfilme)

    response.status(filme.status_code)
    response.json(filme)

    
})

// Insere filmes na tabela
app.post('/v1/locadora/filme', cors(), bodyParserJson, async function(request, response) {
    //Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatorio ter no endpoint)
    let dadosBody = request.body

    //recebe o tipo de dados da requisição (JSON ou XML ou...)
    let contentType = request.headers['content-type']
   
    //chama a função da controler para inserir o novo filme, encaminha os dados e o content-type
    let filme = await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(filme.status_code)


    response.json(filme)



})


//atualiza um filme existente
app.put( '/v1/locadora/filme/:id', cors(), bodyParserJson, async function (request , response) {
    //recebe o id do filme
    let idFilme = request.params.id
   
    // recebe os dados a serem atualizados
    let dadosBody = request.body

    // recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //chama a função para atualizar o filme e encaminha os dados, o id e o content-type
    let filme = await controllerFilme.atualizarFilme(dadosBody, idFilme, contentType)

    response.status(filme.status_code)
    response.json(filme)
})

app.delete('/v1/locadora/filme/:id', cors(), async function (request, response) {

    let idFilme = request.params.id

    let filme = await controllerFilme.excluirFilme(idFilme)

    response.status(filme.status_code)
    response.json(filme)
    
})


//exibe todos os generos
app.get('/v1/locadora/genero', cors(), async function (request, response) {

    let genero = await controllerGenero.listarGeneros()

    
    
    response.status(genero.status_code)
    response.json(genero)
    
})

// buscar genero via ID
app.get('/v1/locadora/genero/:id', cors(), async function (request, response) {
    
    let idGenero = request.params.id

    let genero = await controllerGenero.buscarGeneroId(idGenero)

    response.status(genero.status_code)
    response.json(genero)
    
})

app.post('/v1/locadora/genero', cors(), bodyParserJson, async function (request, response) {
    
    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let genero = await controllerGenero.inserirGenero(dadosBody, contentType)

    console.log(genero)
    response.status(genero.status_code)
    response.json(genero)
    
})



app.put('/v1/locadora/genero/:id' , cors(), bodyParserJson, async function (request, response) {
    let idGenero = request.params.id

    let dadosBody = request.body

    let contentType = request.headers['content-type']

    let genero = await controllerGenero.atualizarGenero(dadosBody, idGenero, contentType)

    response.status(genero.status_code)
    response.json(genero)

})



app.listen(PORT, function(){
    console.log('API aguardando requisições... http://localhost:8080/v1/locadora/filme')
})









