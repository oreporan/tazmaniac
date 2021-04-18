import got from "got";
import { CookieJar } from "tough-cookie";
import { ScheduleResponse, LessonResponse, LoginResponse } from "../../types";
import { tazmanUrl, username, password } from "../framework/env";

const fixMonth = (date: Date) => ("0" + (date.getMonth() + 1)).slice(-2);

let cookieJar: CookieJar;

const login = async () => {
  const cookieJarMember = new CookieJar();
  try {
    const { body } = await got(`${tazmanUrl}/ajax/auth`, {
      method: "POST",
      form: { login: username, password },
      cookieJar: cookieJarMember,
    });
    const parsed = JSON.parse(body) as LoginResponse;
    if (parsed.status !== 200) {
      console.error("error logging in", parsed.message);
      throw new Error("error logging in");
    }
    cookieJar = cookieJarMember;
  } catch (error) {
    console.error("error logging in", error);
    throw error;
  }
};

const getSchedule = async (startDate: Date): Promise<ScheduleResponse> => {
  if (!cookieJar) {
    await login();
  }
  const formatDate = `${startDate.getDate()}.${fixMonth(
    startDate
  )}.${startDate.getFullYear()}`;
  try {
    const {
      body,
    } = await got(
      `${tazmanUrl}/ajax/sheduler_daily/${startDate.getTimezoneOffset()}`,
      { method: "POST", form: { start_date: formatDate, shift: 1 }, cookieJar }
    );
    const parsed = JSON.parse(body);
    if (parsed.status !== 200) throw new Error("invalid response");
    return parsed;
  } catch (error) {
    console.error("error getting schedule", error);
    throw error;
  }
};

const signUp = async (courseId: string) => {
  if (!cookieJar) {
    console.error("called signup without logging in, logging in now");
    await login();
  }
  try {
    const { body } = await got(`${tazmanUrl}/ajax/lesson`, {
      method: "POST",
      form: { id: courseId, status: 200 },
      cookieJar,
    });
    const parsed = JSON.parse(body) as LessonResponse;
    if (!parsed.result) {
      console.log(
        `could not signup to course ${courseId}, status: ${parsed.status}`
      );
      return false;
    }
    console.log(`sign up succesful to course ${courseId}`);
    return true;
  } catch (error) {
    console.error("error signing up to a course", error);
    throw error;
  }
};

export default {
  login,
  getSchedule,
  signUp,
};
