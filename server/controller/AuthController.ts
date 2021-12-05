import Axios from "../../core/axios";
import express from "express";
import { Codes } from "../../models";

class AuthController {
  getMe(req: express.Request, res: express.Response) {
    res.json(req.user);
  }

  authCallback(req: express.Request, res: express.Response) {
    res.send(
      `<script>
          window.close();
          window.opener.postMessage(${JSON.stringify(
            req.user
          )}, "http://localhost:3000/");
        </script>`
    );
  }

  async activate(req: express.Request, res: express.Response) {
    const smsCode = req.query.code;
    const userId = req.user.id;

    if (!smsCode) {
      return res.status(400).send();
    }
    const query = {
      where: {
        code: smsCode,
        user_id: userId,
      },
    };
    try {
      const findCode = await Codes.findone(query);
      if (findCode) {
        await Codes.destroy(query);
        return res.send();
      }
      throw new Error("User not found");
    } catch (e) {
      res.status(500).json({ message: "Error" });
    }
  }

  async sendSms(req: express.Request, res: express.Response) {
    const phone = req.query.phone;
    const userId = req.user.id;
    const randomCode = Math.floor(Math.random() * 9000) + 1000;
    try {
      await Axios.get(
        `https://sms.ru/sms/send?api_id=${process.env.SMS_API_KEY}&to=${phone}&msg=${randomCode}`
      );
      await Codes.create({
        code: randomCode,
        user_id: userId,
      });
      res.status(201).send();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error when sending SMS" });
    }
  }
}

export default new AuthController();
