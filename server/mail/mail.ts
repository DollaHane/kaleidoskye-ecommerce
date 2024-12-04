import nodemailer from "nodemailer"

interface NodemailProps {
  sender: string
  recipient: string
  subject: string
  template: any
}

export async function Nodemail({
  sender,
  recipient,
  subject,
  template,
}: NodemailProps) {
  const transporter = nodemailer.createTransport({
    host: "imap.secureserver.net",
    secure: true,
    port: 456,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  })

  const info = await transporter.sendMail({
    from: sender,
    to: recipient,
    subject: subject,
    html: template,
  })

  console.log(`Email sent to ${recipient}`, info.messageId)
}
