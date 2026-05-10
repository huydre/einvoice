import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsProviderAsyncOptions, TcpClientOptions, Transport } from "@nestjs/microservices";
import { IsNotEmpty, IsObject } from "class-validator";

export enum TCP_SERVICE {
    INVOICE_SERVICE = 'TCP_INVOICE_SERVICE',
}

export class TcpConfiguration {
    @IsNotEmpty()
    @IsObject()
    TCP_INVOICE_SERVICE: TcpClientOptions;

    constructor() {
        Object.entries(TCP_SERVICE).forEach(([key, serviceName]) => {
            const host = process.env[`${key}_HOST`] || 'localhost';
            const port = parseInt(process.env[`${key}_PORT`] || '3301', 10);

            this[serviceName] = TcpConfiguration.setValue(port, host);
        });
    }

    static setValue(port: number, host: string): TcpClientOptions {
        return {
            transport: Transport.TCP,
            options: {
                host,
                port,
            },
        };
    }
}

export function TcpProvider(serviceName: keyof TcpConfiguration): ClientsProviderAsyncOptions {
    return {
        name: serviceName,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
            return configService.get<TcpClientOptions>(`TCP_SERV.${serviceName}`) as TcpClientOptions;
        },  
    }
}