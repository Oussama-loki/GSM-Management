import IUser from "./IUser";

export class LogAction {
    id: number;
    user: IUser;
    timestamp: Date

    constructor(
        id: number,
        user: IUser,
        timestamp: Date
    ) {
        this.id = id;
        this.user = user;
        this.timestamp = timestamp;
    }
}