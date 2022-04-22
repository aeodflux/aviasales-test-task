import React from 'react';
import { createRoot } from 'react-dom/client';
import './scss/index.scss';
import logoImg from './img/logo.svg';
import s7Logo from "./img/s7logo.svg";
import classNames from 'classnames';
import { Server } from "miragejs";
import ticketsResponse1 from "./tikets.json";
import ticketsResponse2 from "./tikets2.json";

let fetchCounter = 0;
new Server({
  routes() {
    this.namespace = "api";
    this.get("/users/", () => {
        if (fetchCounter === 0) {
            fetchCounter += 1;
            return ticketsResponse1;
        } else {
            fetchCounter += 1;
            return ticketsResponse2;
        } 
    });
}});

let ticketsResponse;

fetch("/api/users/").then(response => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    }).then((json) => {
        console.log(json);
        ticketsResponse = json;
    });

console.log(ticketsResponse)

class PageSwitch extends React.Component {
    handlingChange = () => {
        this.props.onChange();
    }
    render() {
        return(
            <div className={classNames('pageSwitch__container', this.props.checked?'pageSwitch__container-checked':'pageSwitch__container')} onClick={() => this.handlingChange()}>
            <h2 className='pageSwitch__heading'>{this.props.label}</h2>
            <div className='pageSwitch__content'></div>
                <input className='pageSwitch__radio' type="button" name={this.props.name} checked={this.props.checked} value={this.props.value} onChange={this.props.onChange}></input>
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

class FilterPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allChecked: false,
            withoutTransfer: false,
            oneTransfer: true,
            twoTransfer: false,
            threeTransfer: false,
        }
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
    }
    render() {
        return(
            <div className="filterPanel__container">
                <NewCheckbox id='checkboxFilterPanel1' label="Все" checked={this.state.allChecked} value="allChecked" onChange={() => this.handlingCheckboxChange("allChecked")}/>
                <NewCheckbox id='checkboxFilterPanel2' label="Без пересадок" checked={this.state.withoutTransfer} value="withoutTransfer" onChange={() => this.handlingCheckboxChange("withoutTransfer")}/>
                <NewCheckbox id='checkboxFilterPanel3' label="1 пересадка" checked={this.state.oneTransfer} value="oneTransfer" onChange={() => this.handlingCheckboxChange("oneTransfer")}/>
                <NewCheckbox id='checkboxFilterPanel4' label="2 пересадки" checked={this.state.twoTransfer} value="twoTransfer" onChange={() => this.handlingCheckboxChange("twoTransfer")}/>
                <NewCheckbox id='checkboxFilterPanel5' label="3 пересадки" checked={this.state.threeTransfer} value="threeTransfer" onChange={() => this.handlingCheckboxChange("threeTransfer")}/>
            </div>
        )
    }
}

class PageController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageControllerValue: 0,
        }
    }
    handlingRadioChange = (i) => {
        this.setState({pageControllerValue: i})
    }
    render() {
        return(
            <div className="pageController">
                <PageSwitch name="radioBiletsPanel" value='cheapest' label="Самый дешевый" checked={this.state.pageControllerValue==='cheapest'} onChange={() => this.handlingRadioChange('cheapest')}></PageSwitch>
                <PageSwitch name="radioBiletsPanel" value='fastest' label="Самый быстрый" checked={this.state.pageControllerValue==='fastest'} onChange={() => this.handlingRadioChange('fastest')}></PageSwitch>
                <PageSwitch name="radioBiletsPanel" value='optimal' label="Оптимальный" checked={this.state.pageControllerValue==='optimal'} onChange={() => this.handlingRadioChange('optimal')}></PageSwitch>
            </div>
        )
    }
}

class Ticket extends React.Component {
    render() {
        return(
            <div className='ticketBody'>
                <div className='ticketBody__headingContainer'>
                    <h2 className='ticketBody__heading'>17 500 Р</h2>
                    <img src={s7Logo} alt="logo" width="150px" height="60px"/>
                </div>
                <div className='ticketBody__data'>
                    <div className='ticketBody__dataBlock'>
                        <h2 className='ticketBody__dataHeading'>MOW-HKT</h2>
                        <h2 className='ticketBody__dataTime'>10:45-08:00</h2>
                    </div>
                    <div className='ticketBody__dataBlock'>
                        <h2 className='ticketBody__dataHeading'>В пути</h2>
                        <h2 className='ticketBody__dataTime'>21ч 15м</h2>
                    </div>
                    <div className='ticketBody__dataBlock'>
                        <h2 className='ticketBody__dataHeading'>2 пересадки</h2>
                        <h2 className='ticketBody__dataTime'>HKG, JNB</h2>
                    </div>
                </div>
                <div className='ticketBody__data'>
                    <div className='ticketBody__dataBlock'>
                        <h2 className='ticketBody__dataHeading'>MOW-HKT</h2>
                        <h2 className='ticketBody__dataTime'>10:45-08:00</h2>
                    </div>
                    <div className='ticketBody__dataBlock'>
                        <h2 className='ticketBody__dataHeading'>В пути</h2>
                        <h2 className='ticketBody__dataTime'>21ч 15м</h2>
                    </div>
                    <div className='ticketBody__dataBlock'>
                        <h2 className='ticketBody__dataHeading'>2 пересадки</h2>
                        <h2 className='ticketBody__dataTime'>HKG, JNB</h2>
                    </div>
                </div>
            </div>
        )
    }
}

class App extends React.Component {
    render() {
        return(
            <div className='main'>
                <a href="https://www.aviasales.ru/"><img className='logo' src={logoImg} alt='logo' width='60px' height='60px'/></a>
                <div className='content'>
                    <div className='filterPanel'>
                        <h2 className='filterPanel__heading'>Количество пересадок</h2>
                        <FilterPanel/>
                    </div>
                    <div className='biletsPanel'>
                        <PageController/>
                    </div>
                    <div className='ticketsPanel'>
                        <div className='ticketsPanel__container'>
                            <Ticket/>
                            <Ticket/>
                            <Ticket/>
                            <Ticket/>
                        </div>
                        <button type='button' className='moreResultsButton'>Показать еще 5 билетов</button>
                    </div>
                </div>
            </div>
        )
    }
}


const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);