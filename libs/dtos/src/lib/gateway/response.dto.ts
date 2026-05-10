import { HttpMessage } from '@common/constants/enum/http-message.enum';
import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiProperty({ enum: HttpMessage })
  message: HttpMessage = HttpMessage.OK;

  @ApiProperty({ required: false })
  data?: T;

  @ApiProperty({ required: false })
  processID?: string;

  @ApiProperty({ type: String, enum: HttpStatus, required: false })
  statusCode?: string = HttpStatus.OK.toString();

  @ApiProperty({ type: Number, required: false })
  duration?: number = 0;

  constructor(partial: Partial<ResponseDto<T>>) {
    Object.assign(this, partial);
  }
}
