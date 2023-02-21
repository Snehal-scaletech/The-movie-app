import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AddUserDto, AuthDto, LoginDto, SessionAuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    
    @Post('register')
    async addUser(@Body() addUser: AddUserDto){
        const result = await this.authService.addUser(addUser);
        return {data: result, message: 'User registration done successfully.Please click on the "approved_url" and approve your app through website.'}
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto){
        const result = await this.authService.login(loginDto);
        return {data: result, message: 'User login successfully.'}
    }

    @Get('guest-session')
    async getGuestSession(){
        const result = await this.authService.getGuestSession();
        return {data: result, message: 'Get guest session successfully.'}
    }

    @Get('request-token')
    async getRequestToken(){
        const result = await this.authService.getRequestToken();
        return {data: result, message: 'Get request token successfully.'}
    }

    @Post('create-session')
    async createSession(@Body() requestToken : AuthDto){
        const result = await this.authService.createSession(requestToken);
        return {data: result, message: 'Session created successfully.'}
    }

    @Post('delete-session')
    async deleteSession(@Body() session_id : SessionAuthDto){
        const result = await this.authService.deleteSession(session_id);
        return {data: result, message: 'Session deleted successfully.'}
    }

    @Post('get-rated-movie/:guest_session_id')
    async getRatedMovie(@Param('guest_session_id') guest_session_id : string){
        const result = await this.authService.getRatedMovie(guest_session_id);
        return {data: result, message: 'Rated movie found successfully.'}
    }

    @Get('user-profile/:session_id')
    async getUserProfile(@Param('session_id') session_id: string){
        const result = await this.authService.getUserProfile(session_id);
        return {data: result, message: 'User profile found successfully.'}
    }
}
