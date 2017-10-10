export const getFormatedTime = (time) => {
  const date = new Date(time);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${month}月${day}日 ${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`;
}
