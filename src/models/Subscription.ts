export class Subscription {
    id: number;
    startDate: Date;
    endDate: Date;
    credit: number;

    constructor(
        id: number,
        startDate: Date,
        endDate: Date,
        credit: number
    ) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.credit = credit;
    }
}