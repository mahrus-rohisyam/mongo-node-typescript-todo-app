import express, { Express, Router } from 'express';
import cors from 'cors';

export default class Server {
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  public run(port: number) {
    const app: Express = express();

    app.use(cors());
    app.use(express.json());
    app.use((_, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', String(process.env.ORIGINS));
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'content-type');

      next();
    });
    app.use('/', this.router);
    app.listen(port, () => {
      console.log('Node Server listening on port ' + port);
    });

    return app;
  }
}
