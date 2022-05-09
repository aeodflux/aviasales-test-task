import { Server } from "miragejs";
import { ticketsGeneration } from "./tickets-generation"

let countResponse = 0;
new Server({
  routes() {
    this.timing = 2000;
    this.namespace = "api";
    this.get("/users/", () => {
        if (countResponse === 0) {
            countResponse++;
            return ticketsGeneration(15, false);
        } else {
            countResponse++;
            return ticketsGeneration(7, true);
        }
    }, { timing: 2000 });
}});
