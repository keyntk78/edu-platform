import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseDto } from '@common/dtos/gateway/response.dto';
import { HttpMessage } from '@common/constants/enum/http-message.enum';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    const result = this.appService.getData();
    return new ResponseDto({ message: HttpMessage.OK, data: result });
  }
}
