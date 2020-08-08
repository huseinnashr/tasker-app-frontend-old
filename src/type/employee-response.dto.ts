import { RoleEnum } from "./role.enum";

export interface EmployeeResponseDTO {
  id: number;
  username: string;
  role: RoleEnum;
}
