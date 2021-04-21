import {
  cloudmailinUsername,
  cloudmailinApiKey,
  cloudmailinHost,
} from "../framework/env";
import { Course } from "../../types";
import nodemailer from "nodemailer";

const template = (course: Course) =>
  `<h1> Notification from Tazmaniac! </h1> <br /> <h3> We signed you up to class ${course.course_meeting_description_id}  
  </h3> <br /> <p> Class details: \n Date: ${course.date} \n Time: ${course.start_time} - ${course.end_time} \n There are ${course.free_places} free places left </p> <h3> Enjoy! </h3> `;

const transporter = nodemailer.createTransport({
  host: cloudmailinHost,
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: cloudmailinUsername,
    pass: cloudmailinApiKey,
  },
  logger: true,
});

const sendEmail = async (to: string, course: Course) => {
  const response = await transporter.sendMail({
    from: '"Tazmaniac" <tazmaniac@cloudmta.com>',
    to,
    subject: "Notification from Tazmaniac",
    html: template(course),
    headers: { "x-cloudmta-class": "standard" },
  });

  console.log("Message sent: ", response.response);
};

export default sendEmail;
