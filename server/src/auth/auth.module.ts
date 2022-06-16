import { Module } from '@nestjs/common';
import {UsersModule} from "../users/users.module";
import { SessionSerializer } from './session.serializer';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [UsersModule, PassportModule.register({ session: true })],
    providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
