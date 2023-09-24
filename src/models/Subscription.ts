import { GsmCard } from "./GsmCard";
import { VoipCard } from "./VoipCard";

export class Subscription {
    id: number;
    startDate: Date;
    endDate: Date;
    credit: number;
    card: GsmCard | VoipCard;

    constructor(
        id: number,
        startDate: Date,
        endDate: Date,
        credit: number,
        card: GsmCard | VoipCard
    ) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.credit = credit;
        this.card = card;
    }
}