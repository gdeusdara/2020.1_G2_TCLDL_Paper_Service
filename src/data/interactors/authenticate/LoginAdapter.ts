import { Authenticate } from '@domain/entities/Authenticate';
import { Jwt } from '@data/protocols/Jwt';
import { FindUserRepository } from '@data/repositories/user/FindUserRepository';
import { Encrypter } from '@data/protocols/Encrypter';
import { Login } from '@domain/interactors/Authentication/Login';

export class LoginAdapter implements Login {
  private readonly jwtGenerator: Jwt

  private readonly findUserRepository: FindUserRepository

  private readonly encrypter: Encrypter

  constructor(
    jwtGenerator: Jwt, findUserRepository: FindUserRepository, encrypter: Encrypter,
  ) {
    this.jwtGenerator = jwtGenerator;
    this.findUserRepository = findUserRepository;
    this.encrypter = encrypter;
  }

  async execute(data: Authenticate): Promise<string> {
    const user = await this.findUserRepository.execute({ email: data.email });

    if (!user) {
      throw new Error('User not found.');
    }

    const isSamePassword = await this.encrypter.compare(data.password, user.password);

    if (!isSamePassword) {
      throw new Error('Invalid credentials.');
    }

    return this.jwtGenerator.generate({ id: user.id, email: user.email });
  }
}
