export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};
