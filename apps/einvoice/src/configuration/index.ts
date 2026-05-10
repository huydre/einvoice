import { BaseConfiguration} from '@common/configuration/base.config';
import { AppConfiguaration } from '@common/configuration/app.config';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TcpConfiguration } from '@common/configuration/tcp.config';
import { MongoConfiguration } from '@common/configuration/mongo.config';

class Configuration extends BaseConfiguration {

    @ValidateNested()
    @Type(() => AppConfiguaration)
    APP_CONFIG = new AppConfiguaration();

    TCP_SERV = new TcpConfiguration();

    @ValidateNested()
    @Type(() => MongoConfiguration)
    MONGO_CONFIG = new MongoConfiguration();
}

export const CONFIGURATION = new Configuration();

export type IConfiguration = typeof CONFIGURATION;

CONFIGURATION.validate();