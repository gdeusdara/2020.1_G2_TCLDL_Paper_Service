import { IUser } from '../../domain/entities/IUser';
import { ICreateUser } from '../../domain/iteractor/ICreateUser';
import { IHttpRequest, IHttpResponse } from '../protocols/IHttp';
import { SignUpController } from './SignUpController';

class CreateUserStub implements ICreateUser {
  async execute(data: Omit<IUser, 'id'>): Promise<IUser> {
    return {
      id: 'valid_id',
      ...data,
    };
  }
}

describe('SignUpController', () => {
  const createUserStub = new CreateUserStub();
  const sut = new SignUpController(createUserStub);
  let httpRequest: IHttpRequest;
  let httpResponse: IHttpResponse;
  describe('when handle execute', () => {
    describe('and promise resolves', () => {
      beforeAll(async () => {
        httpRequest = {
          body: {
            name: 'valid_name',
            lastName: 'valid_lastName',
            email: 'valid_email',
            password: 'valid_password',
            password_confirmation: 'valid_password',
          },
        };
        httpResponse = await sut.handle(httpRequest);
      });

      it('should return status code 200', () => {
        expect(httpResponse.statusCode).toBe(200);
      });

      it('should return user info', () => {
        expect(httpResponse.body).toEqual({ id: 'valid_id', ...httpRequest.body });
      });
    });
  });
});
