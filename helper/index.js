export function formatDateToMMDDYYYY(date) {
  const parsedDate = new Date(date);
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Adding 1 as months are zero-based
  const day = String(parsedDate.getDate()).padStart(2, "0");
  const year = parsedDate.getFullYear();

  return `${month}/${day}/${year}`;
}

export function isDate7DaysOld(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const timeDifference = today.getTime() - date.getTime();
  const daysDifference = timeDifference / (1000 * 3600 * 24);

  return daysDifference === 7;
}
