import { Server } from "miragejs";
import { ticketsGeneration } from "./tickets-generation";
// import { Response } from 'miragejs';

let randomResponse = Math.floor(Math.random() * 3 + 2);
let responceCount = 0;
new Server({
  routes() {
    this.namespace = "api";
    this.get("/users/", () => {
        responceCount ++;
        if (randomResponse === responceCount) {
            return ticketsGeneration(Math.floor(Math.random() * 7), true);
        } else {
            return ticketsGeneration(15, false);
        }
    }, { timing: 1000 });
    // this.get("/users/", () => {
    //     return new Response(404, { errors: [ 'server error'] });
}});
