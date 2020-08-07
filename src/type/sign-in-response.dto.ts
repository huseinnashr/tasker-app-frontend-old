import { RoleEnum } from "./role.enum";

export interface SignInResponseDTO {
  accessToken: string;
  id: number;
  username: string;
  role: RoleEnum;
}
