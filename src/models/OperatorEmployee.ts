import { Person } from "./Person";
import { OperatorsEnum } from "../enums/OperatorsEnum";
import IUser from "./IUser";

export class OperatorEmployee extends Person implements Partial<IUser> {
    declare id: number;
    username: string;
    declare email: string;
    roles: string[];
    operator: OperatorsEnum;
    employeeId: number;

    constructor(
        id: number,
        firstName: string,
        lastName: string,
        phoneNumber: string,
        email: string,
        username: string,
        roles: string[],
        operator: OperatorsEnum,
        employeeId: number
    ) {
        super(firstName, lastName, phoneNumber, email);
        this.id = id;
        this.username = username;
        this.roles = roles;
        this.operator = operator;
        this.employeeId = employeeId;
    }
}