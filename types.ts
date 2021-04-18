export type LessonResponse = {
  result: boolean;
  status:
    | "registered"
    | "timeout"
    | "not_opened_yet"
    | "registration_closed"
    | "registration_to_course_closed"
    | "lesson_canceled"
    | "alredy_registered_on_this_course"
    | "lesson_no_free_places";
};

export type ScheduleResponse = {
  status: number;
  period: string;
  data: {
    table: Record<string, Record<string, TableEntry>>;
  };
};

export type TableEntry = {
  merge: string;
  items: Item[];
};

export type Item = {
  course_id: string;
  course_meeting_description_id: string;
  active: string;
  date: string;
  day: string;
  start_time: string;
  free_places: number;
  end_time: string;
};
