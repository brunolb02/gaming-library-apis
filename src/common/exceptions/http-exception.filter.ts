import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const message =
      exception.response?.message ||
      exception.message ||
      'Internal server error';
    let statusCode = exception.status || 500;
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
    }

    response.status(statusCode).json({
      path: request.url,
      error: exception.getResponse()['error'] || message,
      message: message.toString().toLowerCase(),
      timestamp: new Date().getTime(),
      status: statusCode,
    });
  }
}
