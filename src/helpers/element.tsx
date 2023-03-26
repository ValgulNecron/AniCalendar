import {Event} from "@/components";
import styles from "@/styles/components/calendar/index.module.scss";
import dayjs from "dayjs";

const createWeekDaysList = (weekdays: string[]): JSX.Element[] => {
    return weekdays.map((day) => <li key={day}>{day}</li>);
};

const createEvents = (data: Record<string, Activity[]>, date: string) => {
    const results: Activity[] = data[date];
    if (results) {
        results.forEach((an: Activity) => {
            addNextAiringEpisode(data, an);
        });

        return results.map((an: Activity) => (
            <Event
                activity={an}
                total={results.length}
                key={an.anime_id + date + an.status}
                nextEpisode={an.nextEpisode}
            />
        ));
    }
};



const createDaysCells = (data: Record<string, Activity[]>, days: CalendarDay[]): JSX.Element[] => {
    return days.map((day) => (
        <li
            key={day.date + day.dayOfMonth}
            className={
                !day.isCurrentMonth
                    ? styles.calendar_day__not_current
                    : styles.calendar_day
            }
        >
            <span>{day.dayOfMonth}</span>
            {createEvents(data, day.date)}
        </li>
    ));
};


const createDaysRow = (data: Record<string, Activity[]>, days: CalendarDay[]): JSX.Element[] => {
    return days.map((day) => (
        <div className={styles.list} key={day.date + day.dayOfMonth}>
            <div className={styles.day}>
                {dayjs(day.date).format("ddd")} <br/> {day.dayOfMonth}
            </div>
            <div className={styles.events}>{createEvents(data, day.date)}</div>
        </div>
    ));
};


const addNextAiringEpisode = (data: Record<string, Activity[]>, activity: Activity) => {
    if (activity.nextEpisode) {
        const nextAiringDate = dayjs(activity.date)
            .add(activity.nextEpisode - 1, "week")
            .format("YYYY-MM-DD");

        if (!data[nextAiringDate]) {
            data[nextAiringDate] = [];
        }

        data[nextAiringDate].push({
            ...activity,
            date: nextAiringDate,
            progress: `Episode ${activity.nextEpisode}`,
        });
    }
}

export {createWeekDaysList, createDaysCells, createDaysRow};
