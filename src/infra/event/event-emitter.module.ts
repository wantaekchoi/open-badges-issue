import { Module } from '@nestjs/common';
import { EventEmitterModule as NestjsEventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [NestjsEventEmitterModule.forRoot()],
})
export class EventEmitterModule {}
