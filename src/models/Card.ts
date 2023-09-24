import { Subscription } from "./Subscription";

export class Card {
    id: number;
    balance: number;
    status: string;

    constructor(
        id: number,
        balance: number,
        status: string
    ) {
        this.id = id;
        this.balance = balance;
        this.status = status;
    }
}