function formatDate(date: Date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Январь — 0
  const yy = String(date.getFullYear()).slice(-2);

  return `${dd}.${mm}.${yy}`;
}

export { formatDate };
