import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login.dto';
import { RegisterUserDTO } from './dto/registerUser.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
      private usersService: UserService,
      private jwtService: JwtService,
    ) {}

    async registerUser(registerUserDTO: RegisterUserDTO): Promise<string> {
        return await this.usersService.createUser(registerUserDTO);
    }

    async login(loginDTO: LoginDTO): Promise<{ accessToken: string }> {
      const user = await this.usersService.findOneByEmail(loginDTO.email);
      const isMatch = await bcrypt.compare(loginDTO.password, user.password);

      if (!isMatch) {
        throw new UnauthorizedException('Email ou senha inválida');
    }

      const payload = {
        id: user.id,
        email: user.email,
    };
      
      const accessToken = await this.jwtService.signAsync(payload);

      return { accessToken: accessToken };

      }
}
