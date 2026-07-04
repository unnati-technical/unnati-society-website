import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const requestId = request.id || 'N/A';

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let details = null;

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      const response = exception.getResponse();
      if (typeof response === 'object' && response !== null) {
        message = (response as any).message || exception.message;
        details = (response as any).error || null;
      } else {
        message = exception.message;
      }
    } else if (
      typeof exception === 'object' &&
      exception !== null &&
      'code' in exception
    ) {
      // Prisma or other specific errors
      const err = exception as any;
      if (err.code === 'P2002') {
        httpStatus = HttpStatus.CONFLICT;
        message = 'Unique constraint failed. Record already exists.';
        details = err.meta?.target;
      } else if (err.code === 'P2025') {
        httpStatus = HttpStatus.NOT_FOUND;
        message = 'Record not found.';
      } else {
        // Fallback for other errors
        message = err.message || 'Internal server error';
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    this.logger.error(
      `Exception on ${request.method} ${request.url} [ReqID: ${requestId}]: ${message}`,

      exception instanceof Error ? exception.stack : JSON.stringify(exception),
    );

    const responseBody = {
      success: false,
      message,
      error: details,
      statusCode: httpStatus,
      requestId,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
