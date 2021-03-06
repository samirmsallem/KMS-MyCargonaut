import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ListingModule } from './listings/listing.module';
import { ListingService } from './listings/listing.service';
import { RequestModule } from './requests/request.module';

@Module({
  imports: [
    ListingModule,
    UsersModule,
    AuthModule,
    RequestModule,
    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/../../client/dist/client`
    }),
    MongooseModule.forRoot(
      'mongodb+srv://cargonaut:IxW6IehCGoZpP85l@cluster0.8wcqf.mongodb.net/?retryWrites=true&w=majority',
      {
        dbName: 'mycargonaut-kms',
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
