import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({})
export class RmqModule {
  static register(queues: string[]): DynamicModule {
    const clients = queues.map((queue) => ({
      name: `${queue.toUpperCase()}_CLIENT`,
      transport: Transport.RMQ,
      options: {
        urls: [process.env['RABBITMQ_URL'] || 'amqp://localhost:5672'],
        queue,
        queueOptions: { durable: true },
      },
    }));

    return {
      module: RmqModule,
      imports: [ClientsModule.register(clients)],
      exports: [ClientsModule],
    };
  }
}
