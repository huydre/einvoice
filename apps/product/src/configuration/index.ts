import { BaseConfiguration} from '@common/configuration/base.config';
import { AppConfiguaration } from '@common/configuration/app.config';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TcpConfiguration } from '@common/configuration/tcp.config';
import { TypeOrmConfiguration} from '@common/configuration/type-orm.config'

class Configuration extends BaseConfiguration {

    @ValidateNested()
    @Type(() => AppConfiguaration)
    APP_CONFIG = new AppConfiguaration();

    TCP_SERV = new TcpConfiguration();

    @ValidateNested()
    @Type(() => TypeOrmConfiguration)
    TYPEORM_CONFIG = new TypeOrmConfiguration();
}

export const CONFIGURATION = new Configuration();

export type IConfiguration = typeof CONFIGURATION;

CONFIGURATION.validate();