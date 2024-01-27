export const API_URL = import.meta.env.VITE_API_URL;

export const UserStatus = {
  Active: "active",
  Suspended: "suspended",
  Blocked: "blocked",
  Pending: "pending",
} as const;

export const ServiceStatus = {
  Active: "active",
  Inactive: "inactive",
} as const;

export const ProductStatus = {
  Active: "active",
  Inactive: "inactive",
} as const;

export const Currencies = {
  NPR: "NPR",
  USD: "USD",
  INR: "INR",
} as const;

export const FILTER_DEBOUNCE_MS = 700;
