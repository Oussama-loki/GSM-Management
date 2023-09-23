export class Person {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;

    constructor(
        firstName: string,
        lastName: string,
        phoneNumber: string,
        email: string
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
}