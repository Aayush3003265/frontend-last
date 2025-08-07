import { ROLE_ADMIN, ROLE_MERCHANT, ROLE_USER } from "@/constants/roles";

export function getRole(roles = []) {
  // maintain this hierarchy
  if (roles.includes(ROLE_ADMIN)) return ROLE_ADMIN;

  if (roles.includes(ROLE_MERCHANT)) return ROLE_MERCHANT;

  return ROLE_USER;
}

export function getRoles(role) {
  if (role == ROLE_ADMIN) return [ROLE_USER, ROLE_MERCHANT, ROLE_ADMIN];

  if (role == ROLE_MERCHANT) return [ROLE_USER, ROLE_MERCHANT];

  return [ROLE_USER];
}
