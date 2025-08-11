import express from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL}>`,
      to: process.env.EMAIL, 
      subject: subject,
      html: `
        <h3>Yeni İletişim Formu</h3>
        <p><b>İsim:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Telefon:</b> ${phone}</p>
        <p><b>Mesaj:</b> ${message}</p>
      `
    });

    res.status(200).json({ success: true, message: "✅ Mesaj başarıyla gönderildi!" });
  } catch (error) {
    console.error("❌ Hata:", error);
    res.status(500).json({ success: false, message: "Mesaj gönderilirken hata oluştu." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server çalışıyor: https://oprah14.github.io/-levent-kocoglu:${PORT}`);
});
