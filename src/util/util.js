import { DateTime } from "luxon";

export const convertDateTime = (timestamp) => {
    const dt = new Date(timestamp);
    return DateTime.fromJSDate(dt).toLocaleString(DateTime.DATE_MED);
}

