import filterRelevantCourses from "./services/filterRelevantCourses";
import formatCourse from "./services/formatCourse";
import getUsers from "./services/users";
import sendMessage from "./services/telegram";
import type User from "./entities/User";

const run = async () => {
  const users = getUsers();
  for (let i = 0; i < users.length; i++) {
    await runSingleUser(users[i]);
  }
};

const runSingleUser = async (user: User) => {
  console.log("starting run for user: ", user.username);

  try {
    const date = new Date();
    await user.login();
    const schedule = await user.getSchedule(date);
    const courses = filterRelevantCourses(schedule, user);
    const courseA = courses[0].course_meeting_description_id;
    const courseB = courses[1].course_meeting_description_id;

    console.log("filtered relevant course: ", formatCourse(courses[0]));
    console.log("filtered relevant course: ", formatCourse(courses[1]));

    const [res1, res2] = await Promise.all([
      user.signUp(courseA),
      user.signUp(courseB),
    ]);

    if (res1) {
      await sendMessage(user, courses[0]);
    }
    if (res2) {
      await sendMessage(user, courses[1]);
    }
  } catch (error) {
    console.error(`failed running for user ${user.username} with error`);
    console.error(error);
  }
};

export default run;
