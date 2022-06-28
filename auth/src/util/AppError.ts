export default class AppError extends Error {
    isOperational:boolean;
    statusCode:number;
    status:boolean;
    constructor(statusCode:number, message:string) {
      super(message);
      this.isOperational = true;
      this.statusCode = statusCode;
      this.status = false;
      Error.captureStackTrace(this, this.constructor);
    }
}
  