import TelegramBot from "node-telegram-bot-api";
import type User from "../entities/User";
import { telegramToken } from "../framework/env";
import { Course } from "../../types";

const bot = new TelegramBot(telegramToken ?? "", { polling: false });

const getDay = (date: string) =>
  new Date(date).toLocaleString("en-US", { weekday: "long" });

const template = ({
  course_meeting_description_id,
  date,
  start_time,
  end_time,
  free_places,
}: Course) =>
  `<b>Message from Tazmaniac! \u{1F47D} </b> \n Signed you up for 'Yoga with Edo' \n <b>Date:</b> ${date} \n <b>Day:</b> ${getDay(
    date
  )} \n <b>Time:</b> ${start_time} - ${end_time} \n <b>Free places:</b> ${free_places} \n Namaste! \u{1F33F}`;

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
