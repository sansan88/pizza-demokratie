import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';

const cors = initMiddleware(
  Cors({
    methods: ['POST'],
  })
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Request body:', req.body);
  console.log('Request method', req.method);
  await cors(req, res);
  if (req.method === 'POST') {
    const { email, message, newsletter } = req.body
    console.log('Sending email:', email, message, newsletter);

    // Konfigurieren Sie Ihren E-Mail-Transporter
    const transporter = nodemailer.createTransport({
      host: "asmtp.mail.hostpoint.ch",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      // Senden Sie die E-Mail
      await transporter.sendMail({
        from: '"Pizza Demokratie" <noreply@sfdd.ch>',
        to: email,
        bcc: ["info@sfdd", "daniel.graf@publicbeta.ch"],
        subject: "Pizza Demokratie - Wir informieren Sie sobald der Service verfügbar ist",
        text: message,
      });

      if (newsletter) {
        // Hier könnten Sie die E-Mail-Adresse zu Ihrem Newsletter hinzufügen
        console.log('Subscribing to newsletter:', email);
      }

      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}