import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ErrorUtils } from '../../utils/error.utils';

export function TokenValidation(req: Request, _res: Response, next: NextFunction) {
  try {
    if(req.headers.authorization.includes('Bearer')) {
      return next();
    }
    Logger.error(`ERROR = FAILED VALIDATION`, `MIDDLEWARE - JWTValidation`);

    ErrorUtils.throwSpecificError(403);
  } catch (err) {
    ErrorUtils.throwSpecificError(500);
  }
}
