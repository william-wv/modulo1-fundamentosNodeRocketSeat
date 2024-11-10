import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';

// GET = Busca recurso
// POST = Criar recurso
// PUT = Atualizar recurso
// PATCH = Atualizar uma info especifica de um recurso
// DELETE = Deletar recurso

// Json = JS OBject Nation
// cabeçalhos (req/resp) => metadados

const users = []

const server = http.createServer(async(req, res) => {
    const {method , url} = req;

    //Lida com os JSON de entrada(converte o corpo da requisição para JSON) e ja devolve em JSON
    await json(req , res)

    const route = routes.find(route => {
        return route.method == method && route.path.test(url)
    })

    if(route){

        const routeParams = req.url.match(route.path)
        
        const { query, ...params } = routeParams.groups
        
        req.params = params 
        req.query = query ? extractQueryParams(query) : {}

        // req.params = {
        //     ...routeParams.groups
        // }

        return route.handler(req, res)
    }


    return res.writeHead(404).end()
});

server.listen(3333);