import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { OrderEntity } from './order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FileDto } from './dto/file.dto';

@Injectable()
export class OrderService {
  public constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {}

  getHello(): string {
    return 'Microsserviço de pedidos em funcionamento!';
  }

  async findAll(): Promise<OrderEntity[]> {
    try {
      return await this.orderRepository.find();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOne({ where: { id: id } });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    return order;
  }

  async processSalesFile(file: FileDto): Promise<string[]> {
    const fileContent = file.buffer.toString('utf-8');
    const lines = fileContent.split('\n');
    return lines;
  }
}
