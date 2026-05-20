function splitDateTime(dateTimeString) {
  const [date, time] = dateTimeString.split("T");

  return {
    date,
    time,
  };
}

export { splitDateTime };
