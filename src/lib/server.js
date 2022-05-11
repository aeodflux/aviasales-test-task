import { Server } from "miragejs";
import { ticketsGeneration } from "./tickets-generation"

let randomResponse = Math.floor(Math.random() * 5);
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
}});
