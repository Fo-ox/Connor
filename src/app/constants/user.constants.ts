import { User } from "../models/user.models";

export const UNKNOWN_USER: User = {
    id: null,
    userInfo: {
        firstName: 'Unknown',
        lastName: 'User',
    }
}
