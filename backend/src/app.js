import express from 'express'; // Para criarmos nosso canal de comunicação etc
import routes from './routes'; // Onde estará programado todas as nossas rotas de comunicação

class App {
    constructor(){
        this.server = express(); // Agora nossa classe App possui um canal de comunicação. Ex.: this.server.get('/')

        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(express.json()); // Para que a API seja capaz de RECEBER requisições no formato JSON
    }

    routes(){
        this.server.use(routes); // Importando nossas rotas do arquivo routes.js
    }
}

export default new App().server; // Exportando diretamente um novo objeto da classe App e disponibilizando somente o atributo "server"