import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Configuration, ConfigurationSchema } from 'src/schemas/configuration/configuration.schema';
import { Country, CountrySchema } from 'src/schemas/configuration/country.schema';
import { Language, LanguageSchema } from 'src/schemas/configuration/language.schema';
import { Timezone, TimezoneSchema } from 'src/schemas/configuration/timezone.schema';
import { ConfigurationController } from './configuration.controller';
import { ConfigurationService } from './configuration.service';


const schemas = [
        {
            name: Configuration.name, schema: ConfigurationSchema
        }, 
        {
            name: Country.name, schema: CountrySchema
        },
        {
            name: Language.name, schema: LanguageSchema
        },
        {
            name: Timezone.name, schema: TimezoneSchema
        }
    ]


@Module({
  imports: [MongooseModule.forFeature(schemas)],
  controllers: [ConfigurationController],
  providers: [ConfigurationService],
  exports: [ConfigurationService]
})
export class ConfigurationModule {}
