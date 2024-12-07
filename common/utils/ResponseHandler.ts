export class ResponseHandler {
    static success(res: any, data: any, message: string = 'Request successful') {
      return res.status(200).json({
        status: 'success',
        message,
        data,
      });
    }
  
    static error(res: any, message: string, statusCode: number = 500) {
      return res.status(statusCode).json({
        status: 'error',
        message,
      });
    }
  }
  