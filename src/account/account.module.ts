import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Accountdetails, AccountdetailsSchema } from 'src/schemas/account/account-details.schema';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [ MongooseModule.forFeature([{name: Accountdetails.name, schema: AccountdetailsSchema}])],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService]
})
export class AccountModule {}
