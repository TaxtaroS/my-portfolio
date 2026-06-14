import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/api/send-email', async (req, res) => {
  const { name, email, msg } = req.body;

  if (!name || !email || !msg) {
    return res.status(400).json({ error: '모든 필드를 입력해주세요.' });
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `포트폴리오 문의 - ${name}`,
      html: `
        <h2>새로운 메시지가 도착했습니다</h2>
        <p><strong>발신자:</strong> ${name}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <p><strong>메시지:</strong></p>
        <p>${msg.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email,
    });

    res.json({ success: true, message: '메시지가 성공적으로 전송되었습니다!' });
  } catch (error) {
    console.error('이메일 전송 오류:', error);
    res.status(500).json({ error: '메시지 전송에 실패했습니다.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Email server running on port ${PORT}`);
});
