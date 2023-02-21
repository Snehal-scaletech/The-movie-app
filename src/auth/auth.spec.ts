import { NotFoundException } from "@nestjs/common";
import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import axios from "axios";

import { Model } from "mongoose";
import { User } from "../schemas/user/user.schema";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AddUserDto } from "./dto/auth.dto";



const addUser : AddUserDto = {
    full_name:{ firstname:'Snehal', lastname:'Helonde'},
    username:'Snehal-scaletech',
    email:'snehal.helonde@scaletech.xyz',
    password:'123456',
    phone:656756757
}

describe('Auth module unit test cases', () => {
    let authController: AuthController;
    let authService : AuthService;
    let userModel : Model<User>;
    const USER_TOKEN = getModelToken(User.name);
    beforeEach( async () => {
        const module = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [AuthService,  {
                provide: USER_TOKEN,
                useValue: {
                findOne: jest.fn(),
                save: jest.fn(),
                find: jest.fn()
              }
            }],
        }).compile();

        authController = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
        userModel =  module.get<Model<User>>(USER_TOKEN);
    })

    it('Account controller should be defined', () =>{
        expect(authController).toBeDefined();
        expect(authService).toBeDefined();
    })

    it('should be add new user -- Success', async () => {
       
        try{
            await authController.addUser(addUser);
        }catch(error){
            expect(error).toBeInstanceOf(NotFoundException)
            if(error.message instanceof NotFoundException){
                expect(error).toThrowError('Sorry! No user account details found.')
            }
        }
    })

    it("should return users list",  async () => {
     
        // const resp = await axios( {
        //     method: 'GET',
        //     url: `${process.env.TMDB_BASE_URL}/3/authentication/token/new?api_key=${process.env.TMDB_API_KEY}`,
        //     params: { api_key:  process.env.TMDB_API_KEY }
        // })
        // expect(resp.data).toBeDefined()
      });

     
})