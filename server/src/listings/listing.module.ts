import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ListingSchema } from './listing.model';
import { ListingController } from './listing.controller';
import { ListingService } from './listing.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Listing',
        schema: ListingSchema.plugin(require('../../node_modules/mongoose-unique-validator')),
        collection: 'listings',
      }
    ]),
  ],
  controllers: [ListingController],
  providers: [ListingService],
  exports: [ListingService]
})
export class ListingModule {}