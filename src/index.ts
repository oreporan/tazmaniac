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

    if (!courses.length) {
      console.log("no courses found");
      return;
    }

    for (let i = 0; i < courses.length; i++) {
      const course = courses[i];
      console.log("filtered relevant course: ", formatCourse(course));
      const signedUp = await user.signUp(course.course_meeting_description_id);
      if (signedUp) {
        await sendMessage(user, course);
      }
    }
  } catch (error) {
    console.error(`failed running for user ${user.username} with error`);
    console.error(error);
  }
};

export default run;
