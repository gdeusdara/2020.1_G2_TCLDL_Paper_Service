import { RemoveUser } from '@domain/interactors/user/RemoveUser';
import { ResponseHelper } from '@presentation/helpers/ResponseHelper';
import { Controller } from '@presentation/protocols/Controller';
import { HttpRequest } from '@presentation/protocols/Http';

export class RemoveUserController implements Controller {
  private readonly removeUser: RemoveUser

  constructor(removeUser: RemoveUser) {
    this.removeUser = removeUser;
  }

  async handle(request: HttpRequest) {
    const { userId } = request.params;
    try {
      await this.removeUser.execute(userId);
      return ResponseHelper.successRemove();
    } catch (error) {
      return ResponseHelper.serverError();
    }
  }
}
