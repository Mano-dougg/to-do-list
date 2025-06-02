import { BadRequestException, Injectable, NotFoundException, OnApplicationBootstrap } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterUserDTO } from '../auth/dto/registerUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  
  async createUser(registerUserDTO: RegisterUserDTO): Promise<string> {
    const emailAlreadyExists = await this.findOneByEmail(registerUserDTO.email);

    if (emailAlreadyExists) {
      throw new BadRequestException('Esse email já existe');
    }

    registerUserDTO.password = await bcrypt.hash(registerUserDTO.password, 10);
    const user = {
      name: registerUserDTO.name,
      email: registerUserDTO.email,
      password: registerUserDTO.password,
    }

    await this.userRepository.save(user);

    return 'Usuário cadastrado com sucesso';
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email: email } });

    return user;
  }

}
