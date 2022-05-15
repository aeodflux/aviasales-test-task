const carriers = ["S7", "Aeroflot", "Utair"];
const aviaCodes = ["ABA", "DYR", "AAQ", "WZA", "KEJ", "MMK", "RTW", "YKS", "SLY", "MOW"]

const newDate = (n) => {
    let result = Math.floor(Math.random() * n);
    if (n === 60 ) {
        result = Math.floor(result/10) * 10;
    }
    if (result < 10) {
        result = "0" + (result.toString());
    }
    return result;
}

const newStops = (origin, dest) => {
    const array = [];
    for ( let i = 0; i < Math.floor(Math.random() * 4); i++) {
        const pushing = (aviaCodes[Math.floor(Math.random() * 10)]);
        if (!array.find(elem => elem === pushing) && (origin !== pushing) && (dest !== pushing)) {
            array.push(pushing);
        }
    }
    return array;
}

export const ticketsGeneration = (count, stopped) => {
    const newTicket = () => {
        const price = (Math.floor(Math.random() * 35 + 11)) + " " + (Math.floor(Math.random() * 9)) + "00";
        const carrier = carriers[Math.floor(Math.random() * (carriers.length))];
        const origin1 = aviaCodes[Math.floor(Math.random() * 10)];
        let destination1 = origin1;
        while (destination1 === origin1) {
            destination1 = aviaCodes[Math.floor(Math.random() * 10)];
        }
        const origin2 = destination1;
        const destination2 = origin1;
        const firstDate = (newDate(24) + ":" + newDate(60) + "-" + newDate(24) + ":" +  newDate(60));
        const secondDate = (newDate(24) + ":" + newDate(60) + "-" + newDate(24) + ":" +  newDate(60));
        return ({
            price,
            carriers: carrier,
            segments: [
                {
                    origin: origin1,
                    destination: destination1,
                    date: firstDate,
                    stops: (newStops(origin1, destination1)),
                    duration: (Math.floor(Math.random() * 99 + 20)*10)
                }, 
                {
                    origin: origin2,
                    destination: destination2,
                    date: secondDate,
                    stops: (newStops(origin2, destination2)),
                    duration: (Math.floor(Math.random() * 99 + 20)*10)
                }
            ]
        })
    }
    const response = {
        tickets: [],
        stop: stopped
    };
    for (let i = 0; i < count; i++) {
        response.tickets.push(newTicket());
    }
    return response;
}