import { ExpressControllerAdapter } from '@server/adapters/ExpressControllerAdapter';
import { ControllerFactory } from '@server/protocols/ControllerFactory';
import { ReadUserController } from '@presentation/controllers/user/ReadUserController';
import { FindUserDbFactory } from '../../interactors/user/FindUserDbFactory';

export class ReadUserControllerFactory implements ControllerFactory {
  create() {
    const readUserDb = new FindUserDbFactory().create();
    const readUserController = new ReadUserController(readUserDb);
    return ExpressControllerAdapter.adapt(readUserController);
  }
}
