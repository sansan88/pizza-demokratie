// lib/init-middleware.ts
import { NextApiRequest, NextApiResponse } from 'next'

type Middleware = (req: NextApiRequest, res: NextApiResponse, next: (result: unknown) => void) => void;

export default function initMiddleware(middleware: Middleware) {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: unknown) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}
