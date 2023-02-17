import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';

@Controller('configuration')
export class ConfigurationController {
    constructor(private readonly configService : ConfigurationService){}


    @Get()
    async getConfigurationDetails(){
        const result  = await this.configService.getConfigurationDetails();
        return { data: result, message: "Configuration details found successfully."};
    }

    @Get('country-list')
    async getCountryList(){
        const result  = await this.configService.getCountryList();
        return { data: result, message: "Country list found successfully."};
    }

    @Get('language-list')
    async getLanguageList(){
        const result  = await this.configService.getLanguageList();
        return { data: result, message: "Language list found successfully."};
    }

    @Get('timezone-list')
    async getTimezoneList(){
        const result  = await this.configService.getTimezoneList();
        return { data: result, message: "Timezone list found successfully."};
    }
}
