import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ResponseDto } from '../dtos/response.dto';
import { HttpMessage } from '../enums/http-message.enum';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : HttpMessage.INTERNAL_SERVER_ERROR;

    this.logger.error(`Status: ${status} - Message: ${message}`, (exception as Error).stack);

    response.status(status).json(
      new ResponseDto({
        message,
        statusCode: String(status),
      }),
    );
  }
}
