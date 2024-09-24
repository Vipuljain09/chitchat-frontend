export const timeSince = (timestamp) => {
  const now = Date.now(); // Current time in milliseconds
  const diffInMs = now - timestamp; // Difference in milliseconds
  const diffInSec = Math.floor(diffInMs / 1000); // Difference in seconds

  // Time constants
  const minute = 60; // 60 seconds in a minute
  const hour = 60 * minute; // 60 minutes in an hour
  const day = 24 * hour; // 24 hours in a day
  const month = 30 * day; // Approximate 30 days in a month
  const year = 12 * month; // 12 months in a year

  // Check the time difference and return the appropriate time ago format
  if (diffInSec < minute) {
    return "just now";
  } else if (diffInSec < hour) {
    const minutes = Math.floor(diffInSec / minute);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diffInSec < day) {
    const hours = Math.floor(diffInSec / hour);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diffInSec < month) {
    const days = Math.floor(diffInSec / day);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (diffInSec < year) {
    const months = Math.floor(diffInSec / month);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(diffInSec / year);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
};
