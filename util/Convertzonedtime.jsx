const formatZonedTime = (zonedTime) => {
    const dateObj = new Date(zonedTime);

    // Format to readable string
    const readable = dateObj.toLocaleString("en-US", {
    year: "numeric",
    month: "long",   // "August"
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,    // 12-hour format
    timeZoneName: "short"
    });

    console.log(readable);
    // Example output: "August 8, 2025, 7:06:46 PM UTC"
    return readable;

}

const formatZonedTime2 = (zonedTime) => {
  const date = new Date(zonedTime);
  const pad = (n) => String(n).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} `
       + `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};


export {formatZonedTime, formatZonedTime2}