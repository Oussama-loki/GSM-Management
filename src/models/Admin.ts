import { Person } from "./Person";
import IUser from "./IUser";

export class Admin extends Person implements Partial<IUser> {
    declare id: number;
    username: string;
    declare email: string;
    roles: string[];

    constructor(
        id: number,
        firstName: string,
        lastName: string,
        phoneNumber: string,
        email: string,
        username: string,
        roles: string[]
    ) {
        super(firstName, lastName, phoneNumber, email);
        this.id = id;
        this.username = username;
        this.roles = roles;
    }
}