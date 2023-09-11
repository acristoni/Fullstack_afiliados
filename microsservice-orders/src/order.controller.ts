import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateSalesDto } from './dto/crete-sales.dto';
import { OrderEntity } from './order.entity';

@ApiBearerAuth()
@ApiTags('Pedidos')
@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiOperation({
    summary: 'Apenas para teste de funcionamento do microsserviço',
  })
  getHello(): string {
    return this.orderService.getHello();
  }

  @Get('find')
  @ApiOperation({
    summary: 'Lista todos os pedidos do sistema',
  })
  async findAll(): Promise<{ allOrders: OrderEntity[]; total: number }> {
    return await this.orderService.findAll();
  }

  @Get('find/:id')
  @ApiOperation({
    summary: 'Exibe um pedido.',
  })
  async findOne(@Param('id') id: string) {
    return await this.orderService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary:
      'Recebe um array de string, onde cada elemento é a linha do arquivo "upado" no front, e persiste no bd',
  })
  async newSales(@Body() data: CreateSalesDto): Promise<string> {
    return await this.orderService.processSales(data.lines);
  }
}
