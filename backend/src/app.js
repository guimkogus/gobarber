// Para criarmos nosso canal de comunicação etc
import express from 'express';
import 'express-async-errors';
// Path do NodeJS para indicarmos o caminho do arquivo
import path from 'path';
import Youch from 'youch';
// Sentry para tratamento de exceções
import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';
// Onde estará programado todas as nossas rotas de comunicação
import routes from './routes';
// Onde será feita a nossa conexão com o banco de dados
import './database';

class App {
  constructor() {
    // Agora nossa classe App possui um canal de comunicação. Ex.: this.server.get('/')
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
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
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      const errors = await new Youch(err, req).toJSON();

      return res.status(500).json(errors);
    });
  }
}
// Exportando diretamente um novo objeto da classe App e disponibilizando somente atributo "server"
export default new App().server;
