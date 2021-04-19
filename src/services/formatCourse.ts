import { Course } from "../../types";

const formatCourse = (course: Course) =>
  `courseId: ${course.course_meeting_description_id}, course date: ${course.date}, free places: ${course.free_places}, course internal id: ${course.course_id}`;

export default formatCourse;
