import TelegramBot from "node-telegram-bot-api";
import type User from "../entities/User";
import { telegramToken } from "../framework/env";
import { Course } from "../../types";

const bot = new TelegramBot(telegramToken ?? "", { polling: false });

const template = (course: Course) =>
  `<b>Message from Tazmaniac!</b> \n Signed you up for class ${course.course_meeting_description_id} \n <b>Date:</b> ${course.date} \n <b>Time:</b> ${course.start_time} - ${course.end_time} \n <b>Free places:</b> ${course.free_places}`;

const sendMessage = async (user: User, course: Course) => {
  const { telegramChatId, username } = user;
  if (!telegramChatId) {
    console.log(
      `can not send telegram message, no telegram chatId provided for user: ${username}`
    );
    return;
  }
  await bot.sendMessage(telegramChatId, template(course), {
    parse_mode: "HTML",
  });
  console.log(
    `sent telegram message to ${username} with chatId ${telegramChatId} `
  );
};

export default sendMessage;
