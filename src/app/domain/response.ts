import {User} from "./user";

export interface Response {
  token: String,
  user: User,
  errors: String[]
}
