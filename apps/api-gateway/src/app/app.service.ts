import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { key: string } {
    throw new BadRequestException('Bad Request');
    return { key: 'Hello' };
  }
}
