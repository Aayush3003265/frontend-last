import { ROLE_ADMIN, ROLE_MERCHANT } from "@/constants/roles";

export function allowedAdminRoles(roles) {
  return roles?.some((role) => [ROLE_ADMIN, ROLE_MERCHANT].includes(role));
}
