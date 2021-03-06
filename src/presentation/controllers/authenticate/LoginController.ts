import { Controller } from '@presentation/protocols/Controller';
import { HttpResponse, HttpRequest } from '@presentation/protocols/Http';
import { Login } from '@domain/interactors/Authentication/Login';
import { ResponseHelper } from '@presentation/helpers/ResponseHelper';

export class LoginController implements Controller {
  private readonly login: Login

  constructor(login: Login) {
    this.login = login;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const token = await this.login.execute(request.body);
      return ResponseHelper.successRequest({ token });
    } catch (error) {
      const errorMessage = error.message.toLowerCase();
      if (errorMessage === 'user not found.' || errorMessage === 'invalid credentials.') {
        return ResponseHelper.unhatourizedRequest('Invalid credentials.');
      }

      return ResponseHelper.serverError();
    }
  }
}
