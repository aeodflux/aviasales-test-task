import React from 'react';
import { createRoot } from 'react-dom/client';
import './scss/index.scss';
import logoImg from './img/logo.svg';
import s7Logo from "./img/s7Logo.svg";
import aeroflotLogo from "./img/aeroflotLogo.svg";
import utairLogo from "./img/utairLogo.svg";
import classNames from 'classnames';
import { Server } from "miragejs";

const carriers = ["S7", "Aeroflot", "Utair"];
const aviaCodes = ["ABA", "DYR", "AAQ", "WZA", "KEJ", "MMK", "RTW", "YKS", "SLY", "MOW"]

const ticketsGeneration = (count, stopped) => {
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
        let array = [];
        for ( let i=0; i < Math.floor(Math.random() * 4); i++) {
            let pushing = (aviaCodes[Math.floor(Math.random() * 10)]);
            if (!array.find(elem => elem === pushing) && (origin !== pushing) && (dest !== pushing)) {
                array.push(pushing);
            }
        }
        return array;
    }
    const newTicket = () => {
        let price = (Math.floor(Math.random() * 35 + 11)) + " " + (Math.floor(Math.random() * 9)) + "00";
        let carrier = carriers[Math.floor(Math.random() * (carriers.length))];
        let origin1 = aviaCodes[Math.floor(Math.random() * 10)];
        let destination1 = origin1;
        while (destination1 === origin1) {
            destination1 = aviaCodes[Math.floor(Math.random() * 10)];
        }
        let origin2 = destination1;
        let destination2 = origin1;
        let firstDate = (newDate(24) + ":" + newDate(60) + "-" + newDate(24) + ":" +  newDate(60));
        let secondDate = (newDate(24) + ":" + newDate(60) + "-" + newDate(24) + ":" +  newDate(60));
        return ({
        'price': price,
        'carriers': carrier,
        'segments': [{
            'origin': origin1,
            'destination': destination1,
            "date": firstDate,
            "stops": (newStops(origin1, destination1)),
            "duration": (Math.floor(Math.random() * 99 + 20)*10)
            }, 
            {
            'origin': origin2,
            'destination': destination2,
            "date": secondDate,
            "stops": (newStops(origin2, destination2)),
            "duration": (Math.floor(Math.random() * 99 + 20)*10)
            }
            ]
        }
        )
    }
    let response = {
        tickets: []
    };
    for (let i = 0; i < count; i++) {
        response.tickets.push(newTicket());
    }
    response["stop"] = stopped;
    return response;
}

let countResponse = 0;
new Server({
  routes() {
    this.namespace = "api";
    this.get("/users/", () => {
        if (countResponse === 0) {
            countResponse++;
            return ticketsGeneration(15, false);
        } else {
            countResponse++;
            return ticketsGeneration(7, true);
        }
    });
}});


class PageSwitch extends React.Component {
    handlingChange = () => {
        this.props.onChange();
    }
    render() {
        return(
            <div className={classNames('pageSwitch__container', this.props.checked?'pageSwitch__container-checked':'pageSwitch__container')} onClick={() => this.handlingChange()}>
            <h2 className='pageSwitch__heading'>{this.props.label}</h2>
            <div className='pageSwitch__content'></div>
                <input className='pageSwitch__radio' type="radio" name={this.props.name} checked={this.props.checked} value={this.props.value} onChange={this.props.onChange}></input>
            </div>
        )
    }
}

class NewCheckbox extends React.Component {
    handlingChange = () => {
        this.props.onChange();
    }
    render() {
        return(
            <div className={classNames("filterPanel__checkbox", this.props.checked?"filterPanel__checkbox-checked":"filterPanel__checkbox")} onClick={this.handlingChange}>
                <input className='filterPanel__input' type="checkbox" id={this.props.id} checked={this.props.checked} onChange={this.props.onChange}/>
                <div className='filterPanel__content' onClick={this.handlingChange}></div>
                <label className='filterPanel__label' htmlFor={this.props.id} onClick={(e) => e.preventDefault()}>{this.props.label}</label>
            </div>
        )
    }
}

class Ticket extends React.Component {
    render() {
        return(
            <a className='ticketBody' href="https://www.aviasales.ru/">
                <div className='ticketBody__headingContainer'>
                    <h2 className='ticketBody__heading'>{this.props.value.price} Р</h2>
                    <img src={this.props.value.carriers==="S7"?s7Logo:(this.props.value.carriers==="Aeroflot"?aeroflotLogo:utairLogo)} alt="logo" width="150px" height="60px" className={this.props.value.carriers === "Utair"?"logoUtair":"simpleLogo"}/>
                </div>
                <div className='ticketBody__data'>
                    <div className='ticketBody__dataBlock dataBlock__time'>
                        <h2 className='ticketBody__dataHeading'>{this.props.value.segments[0].origin}-{this.props.value.segments[0].destination}</h2>
                        <h2 className='ticketBody__dataTime'>{this.props.value.segments[0].date}</h2>
                    </div>
                    <div className='ticketBody__dataBlock dataBlock__path'>
                        <h2 className='ticketBody__dataHeading'>В пути</h2>
                        <h2 className='ticketBody__dataTime'>{
                        (((this.props.value.segments[0].duration)/60 !== 0)?(Math.floor((this.props.value.segments[0].duration)/60) + "ч "): "") + 
                        (((this.props.value.segments[0].duration)%60 !== 0)?
                        (Math.floor(((this.props.value.segments[0].duration)%60)) + "м"):
                        "")
                        }</h2>
                    </div>
                    <div className='ticketBody__dataBlock'>
                    <h2 className={classNames('ticketBody__dataHeading', (this.props.value.segments[0].stops.length === 0)?"dataHeading":"ticketBody__dataHeading")}>{(this.props.value.segments[0].stops.length === 0)?"Без пересадок":((this.props.value.segments[0].stops.length === 1)?(this.props.value.segments[0].stops.length + " пересадка"):(this.props.value.segments[0].stops.length +" пересадки"))}</h2>
                        <h2 className='ticketBody__dataTime'>{
                        this.props.value.segments[0].stops.map((elem, index, arr) => {
                            if (index === arr.length - 1) {
                                return elem;
                            } else {
                                return elem + ", "
                            }
                            })
                        }</h2>
                    </div>
                </div>
                <div className='ticketBody__data'>
                    <div className='ticketBody__dataBlock dataBlock__time'>
                        <h2 className='ticketBody__dataHeading'>{this.props.value.segments[1].origin}-{this.props.value.segments[1].destination}</h2>
                        <h2 className='ticketBody__dataTime'>{this.props.value.segments[1].date}</h2>
                    </div>
                    <div className='ticketBody__dataBlock dataBlock__path'>
                        <h2 className='ticketBody__dataHeading'>В пути</h2>
                        <h2 className='ticketBody__dataTime'>{
                        (((this.props.value.segments[1].duration)/60 !== 0)?(Math.floor((this.props.value.segments[1].duration)/60) + "ч "): "") + 
                        (((this.props.value.segments[1].duration)%60 !== 0)?
                        (Math.floor(((this.props.value.segments[1].duration)%60)) + "м"):
                        "")
                        }</h2>
                    </div>
                    <div className='ticketBody__dataBlock'>
                        <h2 className={classNames('ticketBody__dataHeading', (this.props.value.segments[1].stops.length === 0)?"dataHeading":"ticketBody__dataHeading")}>{(this.props.value.segments[1].stops.length === 0)?"Без пересадок":((this.props.value.segments[1].stops.length === 1)?(this.props.value.segments[1].stops.length + " пересадка"):(this.props.value.segments[1].stops.length +" пересадки"))}</h2>
                        <h2 className='ticketBody__dataTime'>{
                        this.props.value.segments[1].stops.map((elem, index, arr) => {
                            if (index === arr.length - 1) {
                                return elem;
                            } else {
                                return elem + ", "
                            }
                            })
                        }</h2>
                    </div>
                </div>
            </a>
        )
    }
}
const skeletonTicket = <div className='ticketBody skeletonTicket'>
<div className='ticketBody__headingContainer'>
    <div className='ticketBody__heading'></div>
    <div alt="logo" width="150px" height="60px" className="skeletonTicket__logo"/>
</div>
<div className='ticketBody__data'>
    <div className='ticketBody__dataBlock dataBlock__time'>
        <div className='ticketBody__dataHeading'></div>
        <div className='ticketBody__dataTime'></div>
    </div>
    <div className='ticketBody__dataBlock dataBlock__path'>
        <div className='ticketBody__dataHeading'></div>
        <div className='ticketBody__dataTime'></div>
    </div>
    <div className='ticketBody__dataBlock'>
    <div className="ticketBody__dataHeading"></div>
        <div className='ticketBody__dataTime'></div>
    </div>
</div>
<div className='ticketBody__data'>
    <div className='ticketBody__dataBlock dataBlock__time'>
        <div className='ticketBody__dataHeading'></div>
        <div className='ticketBody__dataTime'></div>
    </div>
    <div className='ticketBody__dataBlock dataBlock__path'>
        <div className='ticketBody__dataHeading'></div>
        <div className='ticketBody__dataTime'></div>
    </div>
    <div className='ticketBody__dataBlock'>
        <div className="ticketBody__dataHeading"></div>
        <div className='ticketBody__dataTime'></div>
    </div>
</div>
</div>
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            stopResponse: false,
            loading: false,
            pageControllerValue: 0,
            allChecked: true,
            withoutTransfer: true,
            oneTransfer: true,
            twoTransfer: true,
            threeTransfer: true,
            renderedTickets: []
        };
    }
    handlingCheckboxChange = (name) => {
        let value = this.state[name];
        if (name === "allChecked") {
            this.setState({allChecked: !value});
            this.setState({withoutTransfer: !value});
            this.setState({oneTransfer: !value})
            this.setState({twoTransfer: !value})
            this.setState({threeTransfer: !value})
        } else {
            this.setState({allChecked: false})
            this.setState({[name]: !value});
        }
        this.render()
    }
    handlingRadioChange = (i) => {
        this.setState({pageControllerValue: i});
        this.render()
    }
    componentDidMount = () => {
        this.showMoreTickets();
    }
    showMoreTickets = async () => {
        this.setState({loading: true});
        const response = await fetch("/api/users/");
        if (!response.ok) return;
        const json = await response.json();
        this.setState({data: [...this.state.data, json]});
        this.setState({stopResponse: json.stop});
        this.setState({loading: false});
    }
    render() {
        const buttonLoading = () => {
            if (((this.state.data === []) && (this.state.loading)) || (this.state.stopResponse)) {
                return;
            } else if ((this.state.data) && !(this.state.loading)) {
                return <button type='moreResultsButton' className='moreResultsButton' onClick={this.showMoreTickets}>Показать еще билеты</button>;
            } else {
                return <div
                //  className='preloader'
                 >
                    {skeletonTicket}
                    {skeletonTicket}
                    {skeletonTicket}
                    {skeletonTicket}
                    {skeletonTicket}
                    {skeletonTicket}
                </div>
            }
        }
        const cheapestSorting = (a, b) => {
            return (Number((a.price).replace(/\s+/g, '')) - Number((b.price).replace(/\s+/g, '')))
        }
        const fastestSorting = (a, b) => {
            return ((Number(a.segments[0].duration) + Number(a.segments[1].duration)) - (Number(b.segments[0].duration) + Number(b.segments[1].duration)))
        }
        const optimalSorting = (a, b) => {
            return (((Number(a.segments[0].duration)+Number(a.segments[1].duration))*Number((a.price).replace(/\s+/g, ''))) - 
            ((Number(b.segments[0].duration)+Number(b.segments[1].duration))*Number((b.price).replace(/\s+/g, ''))))
        }
        const renderingTickets = () => {
            return (this.state.data.map(response => response.tickets.filter(ticket => 
                (((ticket.segments[0].stops.length === 0)&&(this.state.withoutTransfer))||
                ((ticket.segments[0].stops.length === 1)&&(this.state.oneTransfer))||
                ((ticket.segments[0].stops.length === 2)&&(this.state.twoTransfer))||
                ((ticket.segments[0].stops.length === 3)&&(this.state.threeTransfer)))&&
                (((ticket.segments[1].stops.length === 0)&&(this.state.withoutTransfer))||
                ((ticket.segments[1].stops.length === 1)&&(this.state.oneTransfer))||
                ((ticket.segments[1].stops.length === 2)&&(this.state.twoTransfer))||
                ((ticket.segments[1].stops.length === 3)&&(this.state.threeTransfer)))
                ).sort((a, b) => {
                    if (this.state.pageControllerValue === 'cheapest') {
                        return cheapestSorting(a, b)
                    } else if (this.state.pageControllerValue === 'fastest') {
                        return fastestSorting(a, b)
                    } else if (this.state.pageControllerValue === 'optimal') {
                        return optimalSorting(a, b)
                    } else {
                        return this
                    }  
                }
                ).map((ticket, index) => <Ticket key={index} value={ticket}/>)))
        }
        const renderedTickets = renderingTickets();
        return(
            <div className='main'>
                <a href="https://www.aviasales.ru/" className='logo__href'><img className='logo' src={logoImg} alt='logo' width='60px' height='60px'/></a>
                <div className='content'>
                    <div className='filterPanel'>
                        <h2 className='filterPanel__heading'>Количество пересадок</h2>
                        <div className="filterPanel__container">
                            <NewCheckbox id='checkboxFilterPanel1' label="Все" checked={this.state.allChecked} value="allChecked" onChange={() => this.handlingCheckboxChange("allChecked")}/>
                            <NewCheckbox id='checkboxFilterPanel2' label="Без пересадок" checked={this.state.withoutTransfer} value="withoutTransfer" onChange={() => this.handlingCheckboxChange("withoutTransfer")}/>
                            <NewCheckbox id='checkboxFilterPanel3' label="1 пересадка" checked={this.state.oneTransfer} value="oneTransfer" onChange={() => this.handlingCheckboxChange("oneTransfer")}/>
                            <NewCheckbox id='checkboxFilterPanel4' label="2 пересадки" checked={this.state.twoTransfer} value="twoTransfer" onChange={() => this.handlingCheckboxChange("twoTransfer")}/>
                            <NewCheckbox id='checkboxFilterPanel5' label="3 пересадки" checked={this.state.threeTransfer} value="threeTransfer" onChange={() => this.handlingCheckboxChange("threeTransfer")}/>
                        </div>
                    </div>
                    <div className='biletsPanel'>
                    <div className="pageController">
                        <PageSwitch name="radioBiletsPanel" value='cheapest' label="Самый дешевый" checked={this.state.pageControllerValue==='cheapest'} onChange={() => this.handlingRadioChange('cheapest')}></PageSwitch>
                        <PageSwitch name="radioBiletsPanel" value='fastest' label="Самый быстрый" checked={this.state.pageControllerValue==='fastest'} onChange={() => this.handlingRadioChange('fastest')}></PageSwitch>
                        <PageSwitch name="radioBiletsPanel" value='optimal' label="Оптимальный" checked={this.state.pageControllerValue==='optimal'} onChange={() => this.handlingRadioChange('optimal')}></PageSwitch>
                    </div>
                    </div>
                    <div className='ticketsPanel'>
                        <div className='ticketsPanel__container'>
                            {(renderedTickets[0]?((renderedTickets[0].length === 0)?
                            <h2 className='strictFiltersWarning'>
                            Слишком строгие фильтры
                            </h2>
                            :renderedTickets):renderedTickets)}
                        </div>
                        {buttonLoading()}
                    </div>
                </div>
            </div>
        )
    }
}


const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);