import React from 'react';
import classNames from 'classnames';
import s7Logo from "../img/s7logo.svg";
import aeroflotLogo from "../img/aeroflotLogo.svg";
import utairLogo from "../img/utairLogo.svg";

export const Ticket = class Ticket extends React.Component {
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