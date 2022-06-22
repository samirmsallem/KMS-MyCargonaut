import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ListingSchema } from './listing.model';
import { ListingController } from './listing.controller';
import { ListingService } from './listing.service';
import {UserSchema} from "../users/user.model";


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Listing',
        schema: ListingSchema.plugin(require('../../node_modules/mongoose-unique-validator')),
        collection: 'listings',
      },
      {
        name: 'User', schema: UserSchema, collection: 'users'
      },
    ]),
  ],
  controllers: [ListingController],
  providers: [ListingService],
  exports: [ListingService]
})
export class ListingModule {}