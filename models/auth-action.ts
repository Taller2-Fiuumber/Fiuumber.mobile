import { UserToken } from "./user-token";

export interface AuthAction {
    userToken: UserToken | null;
    type: string;
}