// Para criarmos nosso canal de comunicação etc
import express from 'express';
// Path do NodeJS para indicarmos o caminho do arquivo
import path from 'path';
// Onde estará programado todas as nossas rotas de comunicação
import routes from './routes';
// Onde será feita a nossa conexão com o banco de dados
import './database';

class App {
  constructor() {
    // Agora nossa classe App possui um canal de comunicação. Ex.: this.server.get('/')
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // Para que a API seja capaz de RECEBER requisições no formato JSON
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    // Importando nossas rotas do arquivo routes.js
    this.server.use(routes);
  }
}
// Exportando diretamente um novo objeto da classe App e disponibilizando somente atributo "server"
export default new App().server;
