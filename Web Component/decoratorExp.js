function technovanzaReadOnly(target, property, descriptor) {
    descriptor.writable = false;
    return descriptor;
}
class User {
    @technovanzaReadOnly
    myReadOnly = 'test';
    constructor(firstname, lastName) {
        this.firstname = firstname;
        this.lastName = lastName;

    }
}
var user = new User('John', 'Doe');
user.myReadOnly = 'nirdesh';
console.log(user.myReadOnly);