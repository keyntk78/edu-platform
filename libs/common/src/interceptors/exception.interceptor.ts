import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
  Request,
} from '@nestjs/common';
import { HttpMessage } from '../enums/http-message.enum';
import { ResponseDto } from '../dtos/response.dto';
import { catchError, map, Observable, throwError } from 'rxjs';
import { MetaDataKeys } from '../constants/common.constant';

@Injectable()
export class ExceptionInterceptor<T> implements NestInterceptor<T, ResponseDto<T>> {
  private readonly logger = new Logger(ExceptionInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseDto<T>> {
    const ctx = context.switchToHttp();
    const request: Request & {
      [MetaDataKeys.START_TIME]: number;
      [MetaDataKeys.PROCESS_ID]: string;
    } = ctx.getRequest();

    const startTime = request[MetaDataKeys.START_TIME];
    const processID = request[MetaDataKeys.PROCESS_ID];
    const duration = Date.now() - startTime;

    return next.handle().pipe(
      map((data) => ({
        message: HttpMessage.OK,
        statusCode: ctx.getResponse().statusCode,
        duration,
        processID,
        data,
      })),
      catchError((err) => {
        const errorMessage = err?.response?.message || err?.message || err || HttpMessage.INTERNAL_SERVER_ERROR;
        const errorStatus =
          err?.code || err?.statusCode || err?.response?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;

        this.logger.error(errorMessage, err.stack);

        return throwError(
          () =>
            new HttpException(
              new ResponseDto({
                message: errorMessage,
                statusCode: errorStatus,
                duration,
                processID,
              }),
              errorStatus,
            ),
        );
      }),
    );
  }
}
