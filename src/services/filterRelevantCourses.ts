import { ScheduleResponse, Course } from "../../types";
import type User from "../entities/User";

const filterRelevantCourses = (sched: ScheduleResponse, user: User) => {
  const { startTimes, days } = user;
  const entries = Object.values(sched.data.table);
  const rawItems = entries
    .map((x) => Object.values(x))
    .flat()
    .reduce((all, current) => {
      return all.concat(current.items);
    }, [] as Course[]);

  const relevantCourses: Course[] = [];

  days.forEach((day, i) => {
    const startTime = startTimes[i];
    const item = rawItems.find(
      (rawItem) => rawItem.day === day && rawItem.start_time === startTime
    );
    if (!item) {
      console.error(
        `could not find any course in the days, day: ${day}, startTime: ${startTime}`
      );
    } else {
      relevantCourses.push(item);
    }
  });

  if (relevantCourses.length !== 2) {
    console.error(
      `should have only found 2 relevant courses, but instead got ${relevantCourses.length}`
    );
    throw new Error("invalid amout of courses found");
  }

  return relevantCourses;
};

export default filterRelevantCourses;
