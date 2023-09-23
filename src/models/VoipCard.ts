import { Card } from "./Card";
import { Subscription } from "./Subscription";

export class VoipCard extends Card {
    adapterType: string; // Specifies the type of VoIP service

    constructor(
        id: number,
        adapterType: string,
        balance: number,
        status: string,
        subscription: Subscription
    ) {
        super(id, balance, status, subscription);
        this.adapterType = adapterType;
    }
}