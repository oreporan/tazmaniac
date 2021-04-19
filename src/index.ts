import tazmanApi from "./services/tazmanApi";
import filterRelevantCourses from "./services/filterRelevantCourses";
import formatCourse from "./services/formatCourse";

const run = async () => {
  const date = new Date();
  const schedule = await tazmanApi.getSchedule(date);
  console.log("received schedule");
  const courses = filterRelevantCourses(schedule);
  const courseA = courses[0].course_meeting_description_id;
  const courseB = courses[1].course_meeting_description_id;

  console.log("filtered relevant course", formatCourse(courses[0]));
  console.log("filtered relevant course", formatCourse(courses[1]));

  const [res1, res2] = await Promise.all([
    tazmanApi.signUp(courseA),
    tazmanApi.signUp(courseB),
  ]);

  console.log("Summary of run", date);
  console.log(`Signed up to course: ${courseA} - `, res1);
  console.log(`Signed up to course: ${courseB} - `, res2);
};

export default run;
