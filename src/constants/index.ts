export const API_URL = import.meta.env.VITE_API_URL;

export const UserStatus = {
  Active: "active",
  Suspended: "suspended",
  Blocked: "blocked",
  Pending: "pending",
} as const;
