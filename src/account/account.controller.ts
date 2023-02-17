import { Controller, Get, Param, Post } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService){}

    @Get('details')
    async getAccountDetails(){
        const result = await this.accountService.getAccountDetails();
        return {data : result, message: 'Account details found successfully.'}
    }

    @Post('created-list/:account_id')
    async getCreatedList(@Param('account_id') account_id: number){
        const result = await this.accountService.getCreatedList(account_id);
        return {data : result, message: 'Account created list found successfully.'}
    }
}
