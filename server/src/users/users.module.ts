import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { VehicleSchema } from './vehicles.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema.plugin(require('../../node_modules/mongoose-unique-validator')),
        collection: 'users',
      },
      {
        name: 'Vehicle', schema: VehicleSchema, collection: 'vehicles'
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
