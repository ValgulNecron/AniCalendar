type Activity = {
  date: string;
  url: string;
  anime_title: string;
  anime_id: number;
  user: string;
  status: string;
  progress: string;
};

type CalendarDay = {
  date: string;
  dayOfMonth: number;
  isCurrentMonth: boolean;
};