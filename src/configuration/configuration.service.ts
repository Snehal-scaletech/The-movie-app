import { Injectable, NotFoundException } from '@nestjs/common';
import {  InjectModel } from '@nestjs/mongoose';
import {  Model } from 'mongoose';
import axios from 'axios';
import { Configuration, ConfigurationDocument } from 'src/schemas/configuration/configuration.schema';
import { Country, CountryDocument } from 'src/schemas/configuration/country.schema';
import { Language, LanguageDocument } from 'src/schemas/configuration/language.schema';
import { Timezone, TimezoneDocument } from 'src/schemas/configuration/timezone.schema';

@Injectable()
export class ConfigurationService {
    constructor(
        @InjectModel(Configuration.name)
        private configModel : Model<ConfigurationDocument>,
        
        @InjectModel(Country.name)
        private countryModel : Model<CountryDocument>,
        
        @InjectModel(Language.name)
        private languageModel : Model<LanguageDocument>,
        
        @InjectModel(Timezone.name)
        private timezoneModel : Model<TimezoneDocument>){}

        
    async getConfigurationDetails(){
        const config = {
            method: 'GET',
            url: `${process.env.TMDB_BASE_URL}/3/configuration`,
            params: { api_key:  process.env.TMDB_API_KEY },
        };

        // console.log(config)
        try {
            const res = await  axios(config);
            res.data.change_keys.map(async (document) => { 
            //    console.log(document);
            })  

            await this.configModel.create(res.data.images, res.data.change_keys)

            console.log(res.data.images)
            
            return res.data;
        } catch (error) {
            throw new NotFoundException('Sorry! Configuration details not found.');
        }
    }

    async getCountryList(){
        const config = {
            method: 'GET',
            url: `${process.env.TMDB_BASE_URL}/3/configuration/countries`,
            params: { api_key:  process.env.TMDB_API_KEY },
        };

        // console.log(config)
        try {
            const res = await  axios(config);
            await this.countryModel.create(res.data)
            console.log(res.data)
            return res.data;
        } catch (error) {
            throw new NotFoundException('Country list not found.');
        }
    }

    async getLanguageList(){
        const config = {
            method: 'GET',
            url: `${process.env.TMDB_BASE_URL}/3/configuration/languages`,
            params: { api_key:  process.env.TMDB_API_KEY },
        };

        // console.log(config)
        try {
            const res = await  axios(config);
            await this.languageModel.create(res.data)
            console.log(res.data)
            return res.data;
        } catch (error) {
            throw new NotFoundException('Language list not found.');
        }
    }

    async getTimezoneList(){
        const config = {
            method: 'GET',
            url: `${process.env.TMDB_BASE_URL}/3/configuration/timezones`,
            params: { api_key:  process.env.TMDB_API_KEY },
        };

        // console.log(config)
        try {
            const res = await  axios(config);
            await this.timezoneModel.create(res.data)
            console.log(res.data)
            return res.data;
        } catch (error) {
            throw new NotFoundException('Timezone list not found.');
        }
    }

}
