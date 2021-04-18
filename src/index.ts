import tazmanApi from "./services/tazmanApi";
import filterRelevantCourses from "./services/filterRelevantCourses";

const run = async () => {
  const date = new Date();
  const schedule = await tazmanApi.getSchedule(date);
  console.log("received schedule");
  const courses = filterRelevantCourses(schedule);
  console.log("filtered relevant courses", courses);
  const [res1, res2] = await Promise.all([
    tazmanApi.signUp(courses[0].course_meeting_description_id),
    tazmanApi.signUp(courses[1].course_meeting_description_id),
  ]);

  console.log("Summary of run", date);
  console.log(`Signed up to course ${courses[0]}: `, res1);
  console.log(`Signed up to course ${courses[1]}: `, res2);
};

export default run;
