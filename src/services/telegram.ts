import TelegramBot from "node-telegram-bot-api";
import type User from "../entities/User";
import { telegramToken } from "../framework/env";
import { Course } from "../../types";

const bot = new TelegramBot(telegramToken, { polling: true });

const template = (course: Course) =>
  `**Message from Tazmaniac!** \n Signed you up for class ${course.course_meeting_description_id} \n **Date:** ${course.date} \n **Time:** ${course.start_time} - ${course.end_time} \n Free places: ${course.free_places}`;

const sendMessage = (user: User, course: Course) => {
  const { telegramChatId, username } = user;
  if (!telegramChatId) {
    console.log(
      `can not send telegram message, no telegram chatId provided for user: ${username}`
    );
    return;
  }
  return bot.sendMessage(telegramChatId, template(course));
};

export default sendMessage;