const ENV_CONFIG = require("../config/env.config");
const nodemailer = require("nodemailer");
const { MAILING_SERVICE, MAILING_PASSWORD, MAILING_USER } = ENV_CONFIG;

class MailingService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: MAILING_SERVICE,
      port: 587,
      auth: {
        user: MAILING_USER,
        pass: MAILING_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendMail({ from, to, subject, html, attachments = [] }) {
    const result = await this.transporter.sendMail({
      from,
      to,
      subject,
      html,
      attachments,
    });
    return result;
  }
}

module.exports = MailingService;
