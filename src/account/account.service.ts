import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { AccountDetailDocument, Accountdetails } from '../schemas/account/account-details.schema';

@Injectable()
export class AccountService {

    constructor(@InjectModel(Accountdetails.name)
    private accountDetailModel : Model<AccountDetailDocument>) {}


    async getAccountDetails() {
        const config = {
            method: 'get',
            url: `${process.env.TMDB_BASE_URL}/3/account`,
            headers: { Authorization: 'Bearer ' + process.env.TMDB_AUTH_TOKEN },
        };

        try {
            const response = await axios(config);

            const usernameExist = await this.checkUniqueUsername(response.data.username);

            if(!usernameExist){
                const accountData = {
                    avatar_path : response.data.avatar.tmdb.avatar_path,
                    account_id:response.data.id,
                    iso_639_1:response.data.iso_639_1,
                    iso_3166_1:response.data.iso_3166_1,
                    name:response.data.name,
                    include_adult:response.data.include_adult,
                    username:response.data.username
                }
                await this.accountDetailModel.create(accountData)
            }
            return response.data;
        } catch (error) {
            throw new NotFoundException('Sorry! No user account details found.');
        }
    }

    async checkUniqueUsername(username){
        const data = await this.accountDetailModel.findOne({username:  username})
        // console.log(data)
        if(!data){
            return false;
        }
        return data;
    }
    
}
