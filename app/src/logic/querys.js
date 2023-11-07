export default class Querys {
    constructor() {
        this.URL = "http://localhost:4200";
    }

    async verifiUser(data, fun) {
        let pt = await fetch(this.URL + "/verify/user", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(data)
        });
        pt.json().then(r => fun(r));
    }
}