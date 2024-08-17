const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // Hour '0' = '12'
  hours = String(hours).padStart(2, '0');

  const formattedDate = `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;

  return formattedDate;
};

export { formatTimestamp };
