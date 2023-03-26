import dayjs from "dayjs";

const parseActivities = (activities: any): Activity[] => {
    const stringSetting = window.localStorage.getItem("settings");
    if (!stringSetting) return [];
    const settings: any | null = JSON.parse(stringSetting);

    const watchedActivities = activities.Page.activities.filter(
        (ac: { status: string }): any =>
            ac.status === "watched episode" ||
            (settings.filters["show_completed"] && ac.status === "completed") ||
            ac.status === "read chapter" ||
            ac.status === "reread" ||
            ac.status === "rewatched"
    );

    const filterFormatActivities = watchedActivities.filter(
        (ac: { media: any }): any =>
            ac.media.format === "TV" ||
            ac.media.format === "TV_SHORT" ||
            ac.media.format === "SPECIAL" ||
            ac.media.format === "MOVIE" ||
            ac.media.format === "OVA" ||
            ac.media.format === "ONA" ||
            ac.media.format === "MUSIC" ||
            ac.media.format === "MANGA" ||
            ac.media.format === "NOVEL" ||
            ac.media.format === "ONE_SHOT"
    );

    let activityList: Activity[] = [];

    filterFormatActivities.forEach((ac: any) => {
        activityList.push({
            date: dayjs.unix(ac.createdAt).format("YYYY-MM-DD"),
            anime_id: ac.media.id,
            anime_title: ac.media.title.userPreferred,
            url: ac.siteUrl,
            user: ac.user.name,
            status: ac.status,
            progress: ac.progress,
            banner: ac.media.bannerImage,
            coverImage: ac.media.coverImage,
            format: ac.media.format,
            nextEpisode: ac.media.nextAiringEpisode
        });
    });

    return activityList;
};

const groupActivitiesByDate = (activities: Activity[]): Record<string, Activity[]> => {
    const data: Record<string, Activity[]> = {};

    activities.forEach((activity) => {
        const {date} = activity;

        if (!data[date]) {
            data[date] = [];
        }
        data[date].push(activity);

        if (activity.nextEpisode) {
            const nextAiringDate = dayjs(date)
                .add(activity.nextEpisode, "day")
                .format("YYYY-MM-DD");

            if (!data[nextAiringDate]) {
                data[nextAiringDate] = [];
            }

            // Clone the activity object and update the 'nextEpisode' field to 1
            const nextActivity = {...activity, nextEpisode: 1};
            data[nextAiringDate].push(nextActivity);
        }
    });

    return data;
};


export {parseActivities, groupActivitiesByDate};
