import { Optional } from "@nestjs/common";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Connection } from "mongoose";
import { Logger } from "@nestjs/common";

const logger = new Logger('MongoConfiguration');

export class MongoConfiguration {
    @IsString()
    @IsNotEmpty()
    URL: string;

    @IsString()
    @IsNotEmpty()
    DB_NAME: string;

    @IsNumber()
    @Optional()
    POOL_SIZE: number;

    @IsNumber()
    @Optional()
    CONNECT_TIMEOUT_MS: number;

    @IsNumber()
    @Optional()
    SOCKET_TIMEOUT_MS: number;

    constructor( data?: Partial<MongoConfiguration> ) {
        this.URL = data?.URL || process.env['MONGO_URL'] || '';
        this.DB_NAME = data?.DB_NAME || process.env['MONGO_DB_NAME'] || '';
        this.POOL_SIZE = data?.POOL_SIZE || parseInt(process.env['MONGO_POOL_SIZE'] || '10', 10);
        this.CONNECT_TIMEOUT_MS = data?.CONNECT_TIMEOUT_MS || parseInt(process.env['MONGO_CONNECT_TIMEOUT_MS'] || '30000', 10);
        this.SOCKET_TIMEOUT_MS = data?.SOCKET_TIMEOUT_MS || parseInt(process.env['MONGO_SOCKET_TIMEOUT_MS'] || '30000', 10);
    }
}

export const MongoProvider = MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async(configService: ConfigService) => ({
        uri: configService.get('MONGO_CONFIG.URL'),
        dbName: configService.get('MONGO_CONFIG.DB_NAME'),
        maxPoolSize: configService.get('MONGO_CONFIG.POOL_SIZE'),
        connectTimeoutMS: configService.get('MONGO_CONFIG.CONNECT_TIMEOUT_MS'),
        socketTimeoutMS: configService.get('MONGO_CONFIG.SOCKET_TIMEOUT_MS'),

        onConnectionCreate: (connection: Connection) => {
            connection.on('connected', () => logger.log('🟢 🟢 🟢 >> connected'));
            
            connection.on('reconnected', () => logger.log('🟢 🟢 🟢 >> reconnected'));

            connection.on('open', () => logger.warn('🟢 🟢 🟢 >> connection opened'));

            connection.on('disconnected', () => logger.warn('🪓 🪓 🪓 >> disconnected'));

            connection.on('error', (err) => logger.error('🔴 🔴 🔴 >> connection error:', err));

            connection.on('close', () => logger.warn('🟡 🟡 🟡 >> connection closed'));

            return connection;
        }
    })
})