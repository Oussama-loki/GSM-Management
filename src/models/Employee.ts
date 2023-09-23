import { GsmCard } from "./gsmCard";
import { Person } from "./Person";
import { VoipCard } from "./VoipCard";

type CardType = (GsmCard | VoipCard)[];

export class Employee extends Person {
    id: number;
    employeeId: number;
    joinDate: Date;
    departement: string;
    position: string;
    cards: CardType;

    constructor(
        id: number,
        firstName: string,
        lastName: string,
        phoneNumber: string,
        email: string,
        employeeId: number,
        joinDate: Date,
        departement: string,
        position: string
    ) {
        super(firstName, lastName, phoneNumber, email);
        this.id = id;
        this.employeeId = employeeId;
        this.joinDate = joinDate;
        this.departement = departement;
        this.position = position;
        this.cards = [];
    }

    assignCard(card: GsmCard | VoipCard) {
        if (!this.cards.includes(card)) {
            this.cards.push(card);
        }
    }

    revokeCard(card: GsmCard | VoipCard) {
        if (this.cards.includes(card)) {
            this.cards = this.cards.filter((c) => c !== card);
        }
    }
}