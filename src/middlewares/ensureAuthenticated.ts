import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Receive Token
  const authToken = req.headers.authorization

  if(!authToken) {
    return res.status(401).end()
  }

  const [, token] = authToken.split(' ')
  
  try {
    const { sub } = verify(token, '310a5d89ef8e1b5ca020633e27ff8cb6') as IPayload

    req.user_id = sub

    return next()
  } catch(err) {
    return res.status(401).end()
  }
}