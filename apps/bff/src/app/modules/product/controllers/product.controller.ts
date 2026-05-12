import { TCP_SERVICE } from "@common/configuration/tcp.config";
import { ResponseDto } from "@common/interfaces/gateway/response.interface";
import { TcpClient } from "@common/interfaces/tcp/common/tcp-client.interface";
import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateProductRequestDto, ProductResponseDto } from "@common/interfaces/gateway/product" 
import { ProcessId } from "@common/decorators/processId.decorator";
import { TCP_REQUEST_MESSAGE } from "@common/constants/enum/tcp-request-message.enum";
import { CreateProductTcpRequest, ProductTcpResponse } from '@common/interfaces/tcp/product'
import { map } from "rxjs";

@ApiTags("Product")
@Controller("product")
export class ProductController {
    constructor(@Inject(TCP_SERVICE.PRODUCT_SERVICE) private readonly productClient: TcpClient) {}

    @Post()
    @ApiOkResponse({ type: ResponseDto<ProductResponseDto>})
    @ApiOperation( {summary: 'Create a new product'} )
    create(@Body() body: CreateProductRequestDto, @ProcessId() processId: string) {
        return this.productClient.send<CreateProductTcpRequest>(TCP_REQUEST_MESSAGE.PRODUCT.CREATE,
        { data: body,
            processId
        }).pipe(map((data) => new ResponseDto(data)))
    }

    @Get()
    @ApiOkResponse({ type: ResponseDto<ProductResponseDto[]>})
    @ApiOperation( {summary: 'Get all products'} )
    getAll() {
        return this.productClient.send<ProductResponseDto[]>(TCP_REQUEST_MESSAGE.PRODUCT.GET_LIST,{})
        .pipe(map((data) => new ResponseDto(data)))
    }
}