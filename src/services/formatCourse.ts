import { Course } from "../../types";

const formatCourse = (course: Course) =>
  `courseId: ${course.course_meeting_description_id}, course date: ${course.date}, course internal id: ${course.course_id} \n raw_data: ${course}`;

export default formatCourse;
