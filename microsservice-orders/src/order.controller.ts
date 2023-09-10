import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { OrderService } from './order.service';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDto } from './dto/file.dto';
import { StorageDto } from './dto/storageFIle.dto';

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
  async findAll() {
    return await this.orderService.findAll();
  }

  @Get('find/:id')
  @ApiOperation({
    summary: 'Exibe um pedido.',
  })
  async findOne(@Param('id') id: string) {
    return await this.orderService.findOne(id);
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Body() _data: StorageDto, @UploadedFile() file: FileDto) {
    return await this.orderService.processSalesFile(file);
  }
}
