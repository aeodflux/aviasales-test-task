import React from 'react';
import s7Logo from "../../img/s7logo.svg";
import aeroflotLogo from "../../img/aeroflotLogo.svg";
import utairLogo from "../../img/utairLogo.svg";
import "./ticket.scss"

export class Ticket extends React.Component {
    defineTime = (index) => {
        let result = '';
        if (((this.props.value.segments[index].duration) / 60 !== 0)) {
            result += (Math.floor((this.props.value.segments[index].duration) / 60) + "ч ");
        } else {
            result += "";
        }
        if ((this.props.value.segments[index].duration) % 60 !== 0) {
            result += (Math.floor(((this.props.value.segments[index].duration) % 60)) + "м")
        } else {
            result += "";
        }
        return result;
    }
    defineDestination = (index) => {
        return `${this.props.value.segments[index].origin} - ${this.props.value.segments[index].destination}`;
    }
    defineNumberOfTransfers = (index) => {
        const stopsLength = this.props.value.segments[index].stops.length;
        if (stopsLength === 0) {
            return ("Без пересадок");
        } else if (stopsLength === 1) {
            return `${stopsLength} пересадка`;
        } else {
            return `${stopsLength} пересадки`;
        }
    }
    defineTransfersNames = (index) => {
        return this.props.value.segments[index].stops.map((elem, indx, arr) => {
            if (indx === arr.length - 1) {
                return elem;
            } else {
                return elem + ", "
            }
        })
    }
    defineLogo = () => {
        if (this.props.value.carriers === "S7") {
            return s7Logo;
        } else if (this.props.value.carriers === "Aeroflot") {
            return aeroflotLogo;
        } else {
            return utairLogo;
        }
    }
    render() {
        return (
            <a className='ticket-body' href="https://www.aviasales.ru/">
                <div className='ticket-body__heading-container'>
                    <h2 className='ticket-body__heading'>{this.props.value.price} Р</h2>
                    <img src={this.defineLogo()} alt="logo" width="150px" height="60px" className={this.props.value.carriers === "Utair" ? "logo-utair" : "simpleLogo"} />
                </div>
                <div className='ticket-body__data'>
                    <div className='data-block data-block__time'>
                        <h2 className='data-block__heading'>{this.defineDestination(0)}</h2>
                        <h2 className='data-block__date'>{this.props.value.segments[0].date}</h2>
                    </div>
                    <div className='data-block data-block__path'>
                        <h2 className='data-block__heading'>В пути</h2>
                        <h2 className='data-block__date'>{this.defineTime(0)}</h2>
                    </div>
                    <div className='data-block'>
                        <h2 className={'data-block__heading'}>
                            {this.defineNumberOfTransfers(0)}
                        </h2>
                        <h2 className='data-block__date'>{this.defineTransfersNames(0)}</h2>
                    </div>
                </div>
                <div className='ticket-body__data'>
                    <div className='data-block data-block__time'>
                        <h2 className='data-block__heading'>{this.defineDestination(1)}</h2>
                        <h2 className='data-block__date'>{this.props.value.segments[1].date}</h2>
                    </div>
                    <div className='data-block data-block__path'>
                        <h2 className='data-block__heading'>В пути</h2>
                        <h2 className='data-block__date'>{this.defineTime(1)}</h2>
                    </div>
                    <div className='data-block'>
                        <h2 className={'data-block__heading'}>
                            {this.defineNumberOfTransfers(1)}
                        </h2>
                        <h2 className='data-block__date'>{this.defineTransfersNames(1)}</h2>
                    </div>
                </div>
            </a>
        )
    }
}