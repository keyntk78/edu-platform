import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getProcessId } from '@common/utils/string.util';
import { MetaDataKeys } from '@common/constants/common.constant';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const { ip, method, originalUrl, body } = req;
    const processId = getProcessId('req');
    const now = Date.now();

    const extendedReq = req as Request & {
      [MetaDataKeys.PROCESS_ID]?: string;
      [MetaDataKeys.START_TIME]?: number;
    };

    extendedReq[MetaDataKeys.PROCESS_ID] = processId;
    extendedReq[MetaDataKeys.START_TIME] = startTime;

    Logger.log(
      `
      Http >> Start process request at ${now} [${processId}]
      Request Info: ${method} ${originalUrl} from ${ip}
      Body: ${JSON.stringify(body)}
      `,
      LoggerMiddleware.name,
    );

    const originalSend = res.send.bind(res);
    res.send = (body: unknown) => {
      const duration = Date.now() - startTime;
      Logger.log(
        `
        Http >> End process request at ${now} [${processId}]
        Response Info: ${JSON.stringify(body)}
        Duration: ${duration}ms
        `,
        LoggerMiddleware.name,
      );
      return originalSend(body);
    };

    next();
  }
}
