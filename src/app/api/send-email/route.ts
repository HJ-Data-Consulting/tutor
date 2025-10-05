import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { service, email } = await req.json();

  // IMPORTANT: Replace with your own email configuration
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address
      pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail App Password
    },
  });

  const mailOptions = {
    from: '"Tutor Bot" <${process.env.GMAIL_USER}>', // sender address
    to: 'tutor@hjdconsulting.ca', // list of receivers
    subject: 'New Tutoring Lead', // Subject line
    text: `A new lead has been generated.\n\nService: ${service}\nEmail: ${email}`,
    html: `<p>A new lead has been generated.</p><ul><li>Service: ${service}</li><li>Email: ${email}</li></ul>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
