//  от сървъра идва response:
// *return { ...tokens, user: userDto };

import {User} from "./User";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
    user: User
}
