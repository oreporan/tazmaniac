import got, { Method } from "got";
import { CookieJar } from "tough-cookie";
import { ScheduleResponse, LessonResponse, LoginResponse } from "../../types";
import { tazmanUrl } from "../framework/env";

const fixMonth = (date: Date) => ("0" + (date.getMonth() + 1)).slice(-2);

const baseRequest = async <T>(
  path: string,
  method: Method,
  form: Record<string, any>,
  cookieJar: CookieJar
) => {
  try {
    const { body } = await got(`${tazmanUrl}/${path}`, {
      followRedirect: false,
      method,
      form,
      cookieJar,
    });
    try {
      return JSON.parse(body) as T;
    } catch (error) {
      return (body as any) as T;
    }
  } catch (error) {
    console.error(`error making request to path ${path}`);
    throw error;
  }
};

const login = async (username: string, password: string) => {
  const cookieJar = new CookieJar();
  const response = await baseRequest<LoginResponse>(
    "ajax/auth",
    "POST",
    {
      login: username,
      password,
    },
    cookieJar
  );
  if (response.status !== 200) {
    console.error("error logging in", response.message);
    throw new Error("error logging in");
  }
  return cookieJar;
};

const addToCourse = (
  courseId: string,
  clientName: string,
  clientIdNum: string,
  cookieJar: CookieJar
) =>
  baseRequest(
    "add_to_course",
    "POST",
    {
      lesson_id: courseId,
      type: "once",
      client_name: clientName,
      client_id_num: clientIdNum,
      terms_for_meeting_1: 1,
    },
    cookieJar
  );

const getSchedule = async (startDate: Date, cookieJar: CookieJar) => {
  const formatDate = `${startDate.getDate()}.${fixMonth(
    startDate
  )}.${startDate.getFullYear()}`;
  const response = await baseRequest<ScheduleResponse>(
    `ajax/sheduler_daily/${startDate.getTimezoneOffset()}`,
    "POST",
    { start_date: formatDate, shift: 1 },
    cookieJar
  );
  if (response.status !== 200)
    throw new Error("invalid response from get schedule");
  return response;
};

const signUp = async (
  courseId: string,
  clientName: string,
  clientIdNum: string,
  cookieJar: CookieJar
) => {
  const response = await baseRequest<LessonResponse>(
    "ajax/lesson",
    "POST",
    {
      id: courseId,
      status: 200,
    },
    cookieJar
  );
  if (!response.result) {
    console.log(
      `could not signup to course ${courseId}, status: ${
        response.status === 200 ? response.content : response.status
      }`
    );
    return false;
  }
  try {
    await addToCourse(courseId, clientName, clientIdNum, cookieJar);
  } catch (error) {
    return false;
  }
  console.log(`sign up succesful to course ${courseId}`);
  return true;
};

export default {
  login,
  getSchedule,
  signUp,
};
