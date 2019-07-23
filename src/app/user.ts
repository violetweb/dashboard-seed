export class User {
    id: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    client_id: string;
    client_secret: string;
    grant_type: string;
    access_token: string;

    getFullname() {
        return this.firstname + ' ' + this.lastname;
    }
    
}
