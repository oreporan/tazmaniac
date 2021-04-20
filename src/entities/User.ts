import { CookieJar } from "tough-cookie";
import tazmanApi from "../services/tazmanApi";

class User {
  private cookieJar: CookieJar | undefined;
  constructor(
    public username: string,
    public days: string[],
    public startTimes: string[],
    private password: string,
    private clientId: string,
    private clientName: string
  ) {}

  async login() {
    const cookieJar = await tazmanApi.login(this.username, this.password);
    this.cookieJar = cookieJar;
  }

  getSchedule(date: Date) {
    if (!this.cookieJar)
      throw new Error("could not getSchedule, no cookies set");
    return tazmanApi.getSchedule(date, this.cookieJar);
  }

  async signUp(courseId: string) {
    if (!this.cookieJar) throw new Error("could not signUp, no cookies set");
    return tazmanApi.signUp(
      courseId,
      this.clientName,
      this.clientId,
      this.cookieJar
    );
  }
}

export default User;
