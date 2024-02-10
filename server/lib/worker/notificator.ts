export const requestPermission = async () => {
  if (!("Notification" in self)) {
    throw new Error("Notification not supported");
  }
  const permission = await self.Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("Permission not granted for Notification");
  }
};

export const showNotification = (
  title: string,
  options?: NotificationOptions,
) => {
  if (!("Notification" in window)) {
    throw new Error("Notification not supported");
  }
  if (self.Notification.permission !== "granted") {
    throw new Error("Permission not granted for Notification");
  }
  return new self.Notification(title, options);
};
