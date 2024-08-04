import { HttpStatus } from '@nestjs/common';

export default class Helpers {
  static sendInternalServerError() {
    throw new Error('Method not implemented.');
  }

  static sendResponse(status: number, data: any, err: any): any {
    return {
      statusCode: status,
      data: data,
      message: err?.message ?? err,
    };
  }

  static sendOk(
    data: any,
    message: string = 'Record retrived successfully.',
  ): any {
    return Helpers.sendResponse(HttpStatus.OK, data, message);
  }

  static sendCreated(
    data: any,
    message: string = 'Record created successfully.',
  ): any {
    return Helpers.sendResponse(HttpStatus.OK, data, message);
  }

  static sendUpated(
    data: any,
    message: string = 'Record updated successfully.',
  ): any {
    return Helpers.sendResponse(HttpStatus.OK, data, message);
  }

  static sendDeleted(message: string = 'Record deleted successfully.'): any {
    return Helpers.sendResponse(HttpStatus.OK, null, message);
  }

  static sendNotFound(message: string = 'Record not found.'): any {
    return Helpers.sendResponse(HttpStatus.NOT_FOUND, null, message);
  }

  static sendNotAcceptable(message: string = 'Record not acceptable.'): any {
    return Helpers.sendResponse(HttpStatus.NOT_ACCEPTABLE, null, message);
  }

  static sendBadRequest(err: any = 'Bad Request.'): any {
    return Helpers.sendResponse(HttpStatus.BAD_REQUEST, null, err);
  }

  static currentDate(): Date {
    return new Date();
  }

  static ucFirst(content: string): String {
    return content.charAt(0).toUpperCase() + content.slice(1);
  }
}
