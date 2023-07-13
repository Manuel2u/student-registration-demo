class CustomError extends Error {
    statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  const createError = (message: string, statusCode: number) => {
    return new CustomError(message, statusCode);
  };
  
  export default createError;
  