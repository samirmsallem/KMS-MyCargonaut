import { Injectable, NotAcceptableException } from '@nestjs/common';
import {UsersService} from "../users/users.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly UsersService: UsersService) {}

    async userValidation(email: string, password: string): Promise<any> {
        const user = await this.UsersService.getUser(email);
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            throw new NotAcceptableException('wrong password');
        }
        if (user && passwordCompare) {
            return {
                userId: user.id,
                userEmail: user.email
            };
        }
        return null;
    }
}
