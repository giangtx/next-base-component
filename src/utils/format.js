import dayjs from "dayjs";

export const formatDate = (date, format = 'DD-MM-YYYY') => {
    if (!date) return "";
    return dayjs(date).format(format);
};

export const prettyDate = (time) => {
    const date = new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " "));
    const diff = (new Date().getTime() - date.getTime()) / 1000;
    const dayDiff = Math.floor(diff / 86400);
    return (
        (dayDiff === 0 &&
            ((diff < 60 && "Just now") ||
                (diff < 3600 && `${Math.floor(diff / 60)} minutes ago`) ||
                (diff < 7200 && "1 giờ trước") ||
                (diff < 86400 && `${Math.floor(diff / 3600)} hours ago`))) ||
        (dayDiff === 1 && "Yesterday") ||
        (dayDiff < 7 && `${dayDiff} days ago`) ||
        (dayDiff < 31 && `${Math.ceil(dayDiff / 7)} weeks ago`) ||
        (dayDiff <= 366 && `${Math.ceil(dayDiff / 31)} months ago`) ||
        (dayDiff > 366 && `${Math.ceil(dayDiff / 366) - 1} years ago`)
    );
};
