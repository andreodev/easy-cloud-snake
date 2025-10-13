import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthResponseDto } from './auth.dto';
import { compareSync as bcryptCompareSync } from 'bcrypt';

@Injectable()
export class AuthService {
    private jwtExpiration: number;
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly userService: UserService
    ) { 
        this.jwtExpiration = this.configService.get<number>('JWT_EXPIRATION') || 3600;
    }

   async signIn(email: string, password: string): Promise<AuthResponseDto> {
       const foundEmail = await this.userService.findByEmail(email)

       console.log(foundEmail)

        if(!foundEmail || !bcryptCompareSync(password, foundEmail.password)) {
            throw new UnauthorizedException('Invalid email or password');
        }

       const payload = { sub: foundEmail.id, email: foundEmail.email };
       const token = await this.jwtService.signAsync(payload, { expiresIn: this.jwtExpiration });

       console.log('service', payload, token, this.jwtExpiration);
       
       return {
           message: 'Login realizado com sucesso!',
           data: {
               token,
               expiresIn: this.jwtExpiration,
            }
       };

    }
}
