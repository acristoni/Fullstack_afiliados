import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { OrderEntity } from './order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SignalEnum } from './enums/signal.enum';
import { TypeEnum } from './enums/type.enum';

@Injectable()
export class OrderService {
  public constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {}

  getHello(): string {
    return 'Microsserviço de pedidos em funcionamento!';
  }

  async findAll(): Promise<{ allOrders: OrderEntity[]; total: number }> {
    try {
      const allOrders = await this.orderRepository.find();

      let total = 0;

      const promises = allOrders.map(async (order) => {
        if (order.signal === '-') {
          total -= order.price;
        } else if (order.signal === '+') {
          total += order.price;
        }

        return;
      });

      await Promise.all(promises);

      return {
        allOrders,
        total,
      };
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

  async processSales(data: string[]): Promise<string> {
    try {
      const promises = data.map(async (sale) => {
        if (sale && sale.length) {
          const newSale = new OrderEntity();

          newSale.date = new Date(sale.substring(1, 26));
          newSale.price = parseFloat(sale.substring(56, 66)) / 100;
          newSale.product = sale.substring(26, 56).trim();
          newSale.seller = sale.substring(66, 86);

          const type = sale.substring(0, 1);

          switch (type) {
            case '1':
              newSale.signal = SignalEnum.POSITIVE;
              newSale.type = TypeEnum.SALEPRODUCER;
              break;
            case '2':
              newSale.signal = SignalEnum.POSITIVE;
              newSale.type = TypeEnum.SALEAFFILIATE;
              break;
            case '1':
              newSale.signal = SignalEnum.NEGATIVE;
              newSale.type = TypeEnum.COMMISSIONPAID;
              break;
            case '1':
              newSale.signal = SignalEnum.POSITIVE;
              newSale.type = TypeEnum.COMMISSIONRECEIVED;
              break;
            default:
              break;
          }

          return await this.orderRepository.save(newSale);
        }
      });

      await Promise.all(promises);
      return 'New sale orders saved';
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
