import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestSchema } from './request.model';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import {UserSchema} from "../users/user.model";


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Request',
        schema: RequestSchema.plugin(require('../../node_modules/mongoose-unique-validator')),
        collection: 'requests',
      },
      {
        name: 'User', schema: UserSchema, collection: 'users'
      },
    ]),
  ],
  controllers: [RequestController],
  providers: [RequestService],
  exports: [RequestService]
})
export class RequestModule {}
