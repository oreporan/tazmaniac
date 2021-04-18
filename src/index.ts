import tazmanApi from './services/tazmanApi';
import filterRelevantCourses from './services/filterRelevantCourses';

const run = async () => {
    const date = new Date();
    const schedule = await tazmanApi.getSchedule(date)
    const courses = filterRelevantCourses(schedule)
    const [res1, res2] = await Promise.all([
        tazmanApi.signUp(courses[0].course_meeting_description_id),
        tazmanApi.signUp(courses[1].course_meeting_description_id),
    ])

    console.log("Summary of weekly run", date)
    console.log(`Signed up to course A: `, res1)
    console.log(`Signed up to course B: `, res2)
}

export default run;