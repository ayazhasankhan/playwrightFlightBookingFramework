export function getFormattedDate(daysFromToday: number = 0){
    const date = new Date();
    date.setDate(date.getDate() + daysFromToday); // Adjust date (0 = today, 1 = tomorrow)

    const day = date.getDate();
    const month = date.toLocaleString("en-GB", { month: "long" }); // "March"
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
};
