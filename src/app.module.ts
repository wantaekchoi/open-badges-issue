import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';
import { MintModule } from './mint/mint.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [PaymentModule, MintModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
