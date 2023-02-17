import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user/user.schema';
import { AddUserDto, AuthDto, LoginDto, SessionAuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name)
    private readonly userModel : Model<UserDocument>){}
    async getGuestSession(){
        const config = {
            method: 'GET',
            url: `${process.env.TMDB_BASE_URL}/3/authentication/guest_session/new`,
            // headers: { Authorization: 'Bearer ' + process.env.TMDB_AUTH_TOKEN },
            params: { api_key:  process.env.TMDB_API_KEY }
        };
        try {
            const response = await axios(config);
            return response.data;
        } catch (error) {
            throw new NotFoundException('Sorry! Guest session not found.');
        }
    }

    async getRequestToken(){
        const config = {
            method: 'GET',
            url: `${process.env.TMDB_BASE_URL}/3/authentication/token/new?api_key=${process.env.TMDB_API_KEY}`,
            params: { api_key:  process.env.TMDB_API_KEY }
        };

        try {
            const response = await axios(config);
            response.data.approved_url = `https://www.themoviedb.org/authenticate/${response.data.request_token}`;
            return response.data;
        } catch (error) {
            throw new NotFoundException('Sorry! Request token is not creating.');
        }
    }

    async createSession(requestToken: AuthDto){
        const config = {
            method: 'POST',
            url: `${process.env.TMDB_BASE_URL}/3/authentication/session/new`,
            params: { api_key:  process.env.TMDB_API_KEY },
            headers: { 
                'Content-Type': 'application/json'
              },
            data: requestToken
        };

        console.log(config)
        try {
            const res = await  axios(config)
            return res.data;
        } catch (error) {
            throw new NotFoundException('Sorry! Session is not created.');
        }
    }

    async deleteSession(session_id: SessionAuthDto){
        const config = {
            method: 'DELETE',
            url: `https://api.themoviedb.org/3/authentication/session`,
            params: { api_key:  process.env.TMDB_API_KEY },
            headers: { 
                'Content-Type': 'application/json'
              },
            data: session_id
        };

        // console.log(config)
        try {
            const res = await  axios(config)
            return res.data;
        } catch (error) {
            throw new NotFoundException('Sorry! Session is not deleted.');
        }
    }

    async getRatedMovie(guest_session_id: string){
        const config = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/guest_session/${guest_session_id}/rated/movies`,
            params: { api_key:  process.env.TMDB_API_KEY },
        };

        // console.log(config)
        try {
            const res = await  axios(config)
            return res.data;
        } catch (error) {
            throw new NotFoundException('Sorry! Guest session not found.');
        }
    }

    async addUser(user : AddUserDto){
        
        const checkUniqueEmail = await this.checkUniqueEmail(user.email);
        const checkUniquePhone = await this.checkUniquePhone(user.phone);
        
        if(checkUniqueEmail){
            throw new UnauthorizedException(`${user.email} - email address is already exist.`)
        }

        if(checkUniquePhone){
            throw new UnauthorizedException(`${user.phone} - phone number is already exist.`)
        } 
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
        const addData = await this.userModel.create(user);
        
        const request_token = await this.getRequestToken();
        console.log(request_token);
        if(request_token.success === true){
    
            return {userData: addData, requestToken: request_token};
        }else{
            throw new BadRequestException('Sorry! Something went wrong')
        }
      
    }

    async checkUniqueEmail(email){
        const data = await this.userModel.findOne({email:  email})
        if(!data){
            return false;
        }
        return data;
    }

    async checkUniquePhone(phone){
        const data = await this.userModel.findOne({phone:  phone})
        if(!data){
            return false;
        }
        return data;
    }

    async login(user: LoginDto){
        const emailExist = await this.checkUniqueEmail(user.email);
        const userdata = await this.userModel.findOne({email: user.email});
        const comparePassword = await bcrypt.compare(user.password, userdata.password);

        if(!emailExist){
            throw new UnauthorizedException(`${user.email} - email address does not exists.`);
        }

        if(!comparePassword){
            throw new UnauthorizedException(`Password does not match. Please provide valid password.`)
        }

        const sessionData = await this.createSession(user as any)
        // console.log(sessionData);
        return {userData: userdata, session_id: sessionData.session_id};
    }
}
