import { Module } from '@nestjs/common';
import { MintService } from './mint.service';
import { MintController } from './mint.controller';

@Module({
  controllers: [MintController],
  providers: [MintService],
})
export class MintModule {}
