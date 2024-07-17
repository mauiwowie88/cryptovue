export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const dateOptions = { year: "numeric", month: "short", day: "numeric" };
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "America/Chicago",
  };
  const formattedDate = date.toLocaleDateString("en-US", dateOptions);
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);
  return `${formattedDate} at ${formattedTime} CT`;
}

export function formatValue(value) {
  switch (true) {
    case value >= 1000000000:
      return `$${(value / 1000000000).toFixed(1)}B`;
    case value >= 1000000:
      return `$${(value / 1000000).toFixed(1)}M`;
    case value >= 1000:
      return `$${(value / 1000).toFixed(1)}K`;
    default:
      return `$${value}`;
  }
}

export function jsonParse(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Error parsing JSON:", e);
    return null;
  }
}
