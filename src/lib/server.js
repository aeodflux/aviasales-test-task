import { Server } from "miragejs";
import { ticketsGeneration } from "./tickets-generation";
import { Response } from 'miragejs';

const randomResponse = Math.floor(Math.random() * 3 + 2);
let responseCount = 0;

new Server({
  routes() {
    this.namespace = "api";
    this.get("/users/", () => {
        responseCount ++;
        if (Math.random() <= 0.25) {
            return new Response(404, { errors: [ 'Вероятность ошибки сервера - 25%'] })
        } else {
            if (randomResponse <= responseCount) {
                return ticketsGeneration(Math.floor(Math.random() * 7), true);
            } else {
                return ticketsGeneration(15, false);
            }
        }
    }, { timing: 1000 });
}});
