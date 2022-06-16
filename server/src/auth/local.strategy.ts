import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly AuthService: AuthService) {
        super({ usernameField: 'email', passwordField: 'password'});
    }
    async validate(username: string, password: string): Promise<any> {
        const user = await this.AuthService.userValidation( username.toLowerCase(), password );
        if (!user) {
            throw new UnauthorizedException('user validation failed');
        }
        return user;
    }
}
