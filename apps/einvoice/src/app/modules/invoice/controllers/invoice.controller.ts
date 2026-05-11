import { Controller, UseInterceptors } from '@nestjs/common';
import { InvoiceService } from '../services/invoice.service';
import { MessagePattern } from '@nestjs/microservices';
import { TcpLoggingInterceptor } from '@common/interceptors/tcpLogging.interceptor';
import { Response } from '@common/interfaces/tcp/common/response.interface';
import { RequestParam } from '@common/decorators/request-params.decorator';
import { TCP_REQUEST_MESSAGE } from "@common/constants/enum/tcp-request-message.enum"
import { CreateInvoiceTcpRequest, CreateInvoiceResponse } from "@common/interfaces/tcp/invoice"


@Controller()
@UseInterceptors(TcpLoggingInterceptor)
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}
 
  @MessagePattern(TCP_REQUEST_MESSAGE.INVOICE.CREATE)
  async create(@RequestParam() params: CreateInvoiceTcpRequest): Promise<Response<CreateInvoiceResponse>> {
    const result = await this.invoiceService.create(params)

    return Response.success<CreateInvoiceResponse>(result);
  }
}
