import { NotFoundException } from "@nestjs/common";
import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { Model } from "mongoose";
import { Accountdetails } from "../schemas/account/account-details.schema";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";



describe('Account module unit test cases', () => {
    let accountController;
    let accountService;
    let accountDetailsModel : Model<Accountdetails>;
    const ACCOUNT_TOKEN = getModelToken(Accountdetails.name);
    beforeEach( async () => {
        const module = await Test.createTestingModule({
            controllers: [AccountController],
            providers: [AccountService,  {
                provide: ACCOUNT_TOKEN,
                useValue: { findOne: jest.fn(),
                save: jest.fn(),
                find: jest.fn()
              }
            }],
        }).compile();

        accountController = module.get<AccountController>(AccountController);
        accountService = module.get<AccountService>(AccountService);
        accountDetailsModel =  module.get<Model<Accountdetails>>(ACCOUNT_TOKEN);
    })


   

    it('Account controller should be defined', () =>{
        expect(accountController).toBeDefined();
        expect(accountService).toBeDefined();
    })

    it('should be return TMDB account details -- Failed', async () => {
     
       
        try{
            await accountController.getAccountDetails();
        }catch(error){
            expect(error).toBeInstanceOf(NotFoundException)
            if(error.message instanceof NotFoundException){
                expect(error).toThrowError('Sorry! No user account details found.')
            }
        }
    })

    it('should be return TMDB account details -- Success', async () => {
        Object.defineProperty(accountDetailsModel, 'findOne', {
            value: () => jest.fn((data) => data),
        })
        

        const userdata = await accountService.checkUniqueUsername?.('snehal')
            
        expect(userdata).toBeDefined()
       
    })
})