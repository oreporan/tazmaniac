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
    const courseA = courses[0];
    const courseB = courses[1];

    console.log("filtered relevant course: ", formatCourse(courseA));
    console.log("filtered relevant course: ", formatCourse(courseB));

    const [resA, resB] = await Promise.all([
      user.signUp(courseA.course_meeting_description_id),
      user.signUp(courseB.course_meeting_description_id),
    ]);

    if (resA) {
      await sendMessage(user, courseA);
    }
    if (resB) {
      await sendMessage(user, courseB);
    }
  } catch (error) {
    console.error(`failed running for user ${user.username} with error`);
    console.error(error);
  }
};

export default run;
