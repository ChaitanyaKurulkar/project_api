import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
  } from '@nestjs/common';
  import { Response } from 'express';
  import { CannotExecuteNotConnectedError } from 'typeorm/error/CannotExecuteNotConnectedError';
  
  @Catch(CannotExecuteNotConnectedError)
  export class DatabaseExceptionFilter implements ExceptionFilter {
    catch(exception: CannotExecuteNotConnectedError, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
  
      response.status(500).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: 'Database connection error, Please refresh the page',
      });
    }
  }
  