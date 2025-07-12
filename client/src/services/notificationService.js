import api from "./api";

export async function fetchNotifications() {
  const { data } = await api.get("/notifications");
  return data;
}

export async function markAllNotificationsRead() {
  await api.put("/notifications/read-all");
}
