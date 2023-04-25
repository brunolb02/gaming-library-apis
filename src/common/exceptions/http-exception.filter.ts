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
      exception?.response?.message ||
      exception?.message ||
      'Internal server error';
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : exception?.status || 500;

    response.status(statusCode).json({
      path: request.url,
      error: exception?.response?.error || message,
      message: message.toString().toLowerCase(),
      timestamp: new Date().getTime(),
      status: statusCode,
    });
  }
}
