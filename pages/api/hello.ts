import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    console.log('Handler wurde aufgerufen');
    if (req.method === 'GET') {
        res.status(200).json({ message: 'Hallo Welt' })
    } else {
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}