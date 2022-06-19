import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestSchema } from './request.model';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Request',
        schema: RequestSchema.plugin(require('../../node_modules/mongoose-unique-validator')),
        collection: 'requests',
      }
    ]),
  ],
  controllers: [RequestController],
  providers: [RequestService],
  exports: [RequestService]
})
export class RequestModule {}