import { Router } from 'express';
import IpController from '@controllers/ip.controller';
import Route from '@interfaces/routes.interface';

class IpRoute implements Route {
  public path = '/ip';
  public router = Router();
  public ipController = new IpController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.ipController.checkIps);
  }
}

export default IpRoute;
