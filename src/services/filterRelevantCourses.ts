import { ScheduleResponse, Item } from "../../types";
import { myDays, myStartTimes } from "../framework/env";

const filterRelevantCourses = (sched: ScheduleResponse) => {
  const entries = Object.values(sched.data.table);
  const rawItems = entries
    .map((x) => Object.values(x))
    .flat()
    .reduce((all, current) => {
      return all.concat(current.items);
    }, [] as Item[]);

  const relevantCourses: Item[] = [];

  myDays.forEach((day, i) => {
    const startTime = myStartTimes[i];
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
