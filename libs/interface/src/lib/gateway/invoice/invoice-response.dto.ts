import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BaseResponseDto } from "../common/base-response.dto";
import { INVOICE_STATUS } from "@common/constants/invoice.enum";


class ClientResponseDto {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    email: string;

    @ApiProperty()
    address: string;
}

class ItemResponseDto {
    @ApiProperty()
    productId: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    unitPrice: number;
    
    @ApiProperty()
    vatRate: number;

    @ApiProperty()
    total: number;
}

export class InvoiceResponseDto extends BaseResponseDto {

    @ApiProperty({ type: ClientResponseDto })
    client: ClientResponseDto;

    @ApiProperty()
    totalAmount: number;

    @ApiProperty()
    vatAmount: number;

    @ApiProperty({ type: String, enum: INVOICE_STATUS })
    status: string;

    @ApiProperty({ type: [ItemResponseDto] })
    item: ItemResponseDto[];

    @ApiPropertyOptional()
    supervisorId?: string;

    @ApiPropertyOptional()
    fileUrl?: string;
}