const timeFormatter = (timeValues: string) => {
  const timeObj = new Date(timeValues);
  const hours = String(timeObj.getHours()).padStart(2, "0");
  const minutes = String(timeObj.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export default timeFormatter;
