// ---------------------------------------------
// Permissions Configuration
// Định nghĩa danh sách chức năng tương ứng với từng vai trò
// ---------------------------------------------

import { Role } from "@/constants/role";

export const PERMISSIONS = {
  // Admin permissions (Web Admin Dashboard & Fleet Management)
  MANAGE_USERS: "manage_users",
  MANAGE_SETTINGS: "manage_settings",
  VIEW_ADMIN_DASHBOARD: "view_admin_dashboard",
  MANAGE_BUILDINGS: "manage_buildings",
  MANAGE_PRICING: "manage_pricing",
  MANAGE_FEEDBACKS: "manage_feedbacks",
  VIEW_REPORTS: "view_reports",

  // Customer (User) permissions
  MANAGE_RESERVATIONS: "manage_reservations",
  VIEW_PROFILE: "view_profile",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

/**
 * Mapping vai trò -> danh sách quyền (2 vai trò theo Dàn ý ITS: ADMIN, USER)
 */
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [Role.ADMIN]: [
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.MANAGE_SETTINGS,
    PERMISSIONS.VIEW_ADMIN_DASHBOARD,
    PERMISSIONS.MANAGE_BUILDINGS,
    PERMISSIONS.MANAGE_PRICING,
    PERMISSIONS.MANAGE_FEEDBACKS,
    PERMISSIONS.VIEW_REPORTS,
  ],
  [Role.USER]: [
    PERMISSIONS.MANAGE_RESERVATIONS,
    PERMISSIONS.VIEW_PROFILE,
  ],
};
