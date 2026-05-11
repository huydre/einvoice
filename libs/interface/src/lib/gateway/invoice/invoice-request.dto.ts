import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class ClientRequestDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    address: string;
}

class RequestItemDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    productId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    unitPrice: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    vatRate: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    total: number;
}

export class CreateInvoiceRequestDto {
    @ApiProperty({ type: ClientRequestDto })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => ClientRequestDto)
    client: ClientRequestDto;

    @ApiProperty({ type: [RequestItemDto] })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => RequestItemDto)
    items: RequestItemDto[];
}