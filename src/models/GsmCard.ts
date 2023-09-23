import { Card } from "./Card";
import { Subscription } from "./Subscription";

export class GsmCard extends Card {
    phoneNumber: string;
    authenticationKey: string; // PIN code for example

    constructor(
        id: number,
        phoneNumber: string,
        authenticationKey: string,
        balance: number,
        status: string,
        subscription: Subscription
    ) {
        super(id, balance, status, subscription);
        this.phoneNumber = phoneNumber;
        this.authenticationKey = authenticationKey;
    }
}