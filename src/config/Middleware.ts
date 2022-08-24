import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

export default class Middleware {
  public static authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
      let token = String(req.headers['authorization'])
      .split(' ')[1]
      res.locals.user = jwt.verify(token, String(process.env.ACCESS_TOKEN_SECRET))

      next()
    } catch (error) {
      res.status(403).json({
        error: 'error',
        message: 'Failed to verify the token'
      }).end()
    }
    return;
  }
}