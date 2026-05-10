import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RmqService {
  async send<R = unknown>(client: ClientProxy, pattern: string, payload: unknown): Promise<R> {
    return lastValueFrom(client.send<R>(pattern, payload));
  }

  async emit(client: ClientProxy, pattern: string, payload: unknown): Promise<void> {
    client.emit(pattern, payload);
  }
}
