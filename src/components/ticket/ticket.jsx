import React from 'react';
import cn from 'classnames';
import s7Logo from "../../img/s7logo.svg";
import aeroflotLogo from "../../img/aeroflotLogo.svg";
import utairLogo from "../../img/utairLogo.svg";
import "./ticket.scss"

export class Ticket extends React.Component {
    defineTime = (index) => {
        let result = '';
        if (((this.props.value.segments[index].duration)/60 !== 0)) {
            result += (Math.floor((this.props.value.segments[index].duration)/60) + "ч ");
        } else {
            result += "";
        }
        if ((this.props.value.segments[index].duration)%60 !== 0) {
            result += (Math.floor(((this.props.value.segments[index].duration)%60)) + "м")
        } else {
            result += "";
        }
        return result;
    }
    defineDestination = (index) => {
        return (String(this.props.value.segments[index].origin) + '-' + String(this.props.value.segments[index].destination))
    }
    defineNumberOfTransfers = (index) => {
        const stopsLength = this.props.value.segments[index].stops.length;
        if (stopsLength === 0) {
            return ("Без пересадок");
        } else if (stopsLength === 1) {
            return `${stopsLength} пересадка`; // Везде так делать впредь
        } else {
            return (stopsLength +" пересадки")
        }
    }
    defineTransfersNames = (index) => {
        return (this.props.value.segments[index].stops.map((elem, indx, arr) => {
            if (indx === arr.length - 1) {
                return elem;
            } else {
                return elem + ", "
            }
            }))
    }
    defineLogo = () => {
        if (this.props.value.carriers==="S7") {
            return s7Logo;
        } else if (this.props.value.carriers==="Aeroflot") {
            return aeroflotLogo;
        } else {
            return utairLogo;
        }
    }
    render() {
        return(
            <a className='ticketBody' href="https://www.aviasales.ru/">
                <div className='ticketBody__headingContainer'>
                    <h2 className='ticketBody__heading'>{this.props.value.price} Р</h2>
                    <img src={this.defineLogo()} alt="logo" width="150px" height="60px" className={this.props.value.carriers === "Utair"?"logoUtair":"simpleLogo"}/>
                </div>
                <div className='ticketBody__data'>
                    <div className='ticketBody__dataBlock dataBlock__time'>
                        <h2 className='ticketBody__dataHeading'>{this.defineDestination(0)}</h2>
                        <h2 className='ticketBody__dataTime'>{this.props.value.segments[0].date}</h2>
                    </div>
                    <div className='ticketBody__dataBlock dataBlock__path'>
                        <h2 className='ticketBody__dataHeading'>В пути</h2>
                        <h2 className='ticketBody__dataTime'>{this.defineTime(0)}</h2>
                    </div>
                    <div className='ticketBody__dataBlock'>
                        <h2 className={cn('ticketBody__dataHeading', (this.props.value.segments[0].stops.length === 0)&&"dataHeading")}>
                            {this.defineNumberOfTransfers(0)}
                        </h2>
                        <h2 className='ticketBody__dataTime'>{this.defineTransfersNames(0)}</h2>
                    </div>
                </div>
                <div className='ticketBody__data'>
                    <div className='ticketBody__dataBlock dataBlock__time'>
                        <h2 className='ticketBody__dataHeading'>{this.defineDestination(1)}</h2>
                        <h2 className='ticketBody__dataTime'>{this.props.value.segments[1].date}</h2>
                    </div>
                    <div className='ticketBody__dataBlock dataBlock__path'>
                        <h2 className='ticketBody__dataHeading'>В пути</h2>
                        <h2 className='ticketBody__dataTime'>{this.defineTime(1)}</h2>
                    </div>
                    <div className='ticketBody__dataBlock'>
                        <h2 className={cn('ticketBody__dataHeading', (this.props.value.segments[1].stops.length === 0)&&"dataHeading")}>
                            {this.defineNumberOfTransfers(1)}
                        </h2>
                        <h2 className='ticketBody__dataTime'>{this.defineTransfersNames(1)}</h2>
                    </div>
                </div>
            </a> 
        )
    }
}