import { IsEmail, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";

export class AuthDto{
    @IsNotEmpty()
    @IsString()
    request_token: string;
}

export class SessionAuthDto{
    @IsNotEmpty()
    @IsString()
    session_id: string
}

export class AddUserDto{
    @IsNotEmpty()
    @IsObject()
    full_name: object

    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsNumber()
    phone: number
}

export class LoginDto{
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    request_token: string;
}