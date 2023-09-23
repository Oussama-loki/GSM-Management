import { Subscription } from "./Subscription";

export class Card {
    id: number;
    balance: number;
    status: string;
    subscription: Subscription | null

    constructor(
        id: number,
        balance: number,
        status: string,
        subscription: Subscription | null
    ) {
        this.id = id;
        this.balance = balance;
        this.status = status;
        this.subscription = subscription;
    }
}