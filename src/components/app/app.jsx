import React, { Fragment } from 'react';
import { SwitchPanel } from '../switchPanel/switchPanel';
import { CheckboxPanel } from '../checkboxPanel/checkboxPanel';
import { Ticket } from '../ticket/ticket';
import logoImg from '../../img/logo.svg';
import { compareFastest, compareOptimal, compareCheapest } from '../../lib/sorting';
import "./app.scss";
import { SkeletonTicket } from '../skeleton/skeleton';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            tickets: [],
            showMoreBtnIsHidden: false,
            loading: false,
            pageControllerValue: 0,
            transfers: [0, 1, 2, 3],
            newError: false,
        };
    }

    getTickets = () => {
        this.setState({tickets: this.sortTickets()})
    }

    handlingCheckboxChange = (e) => {
        const value = e.target.value;
        const nextChecked = e.target.checked;
        if (value === "allChecked") {
            if (nextChecked) {
                this.setState({transfers: [0, 1, 2, 3]}, () => {return this.getTickets()})
            } else {
                this.setState({transfers: []}, () => {return this.getTickets()})
            }
        } else {
            if (nextChecked) {
                this.setState({transfers: this.state.transfers.concat(Number(value))}, () => {return this.getTickets()})
            } else {
                this.setState({transfers: this.state.transfers
                .filter((el) => el !== Number(value))}, () => {return this.getTickets()})
            }
        }
    }

    onOnlyChange = (name) => {
        this.setState({transfers: [name]}, () => {return this.getTickets()})
    }

    handlingRadioChange = (e) => {
        this.setState({ pageControllerValue: e.target.value }, () => {return this.getTickets()});
    }

    componentDidMount = () => {
        this.fetchMoreTickets();
    }

    fetchMoreTickets = async () => {
        this.setState({ loading: true });
        const response = await fetch("/api/users/");
        if (!response.ok) {
            return this.setState({newError: response, loading: false, showMoreBtnIsHidden: true});
        } else {
            const json = await response.json();
            this.setState({
            data: [...this.state.data, json.tickets].flat(),
            showMoreBtnIsHidden: json.stop,
            loading: false,
            }, () => {return this.getTickets()});
        }
    }

    transferFiltering = (ticket) => {
        const pathFromStops = ticket.segments[0].stops.length;
        const pathToStops = ticket.segments[1].stops.length;
        if (this.state.transfers.length === 0) {
            return true;
        } else {
            return this.state.transfers.includes(pathFromStops) && this.state.transfers.includes(pathToStops)
        }
    }
    
    sortTickets = () => {
        return this.state.data.filter(n => this.transferFiltering(n))
            .sort((a, b) => {
                if (this.state.pageControllerValue === 'cheapest') {
                    return compareCheapest(a, b)
                } else if (this.state.pageControllerValue === 'fastest') {
                    return compareFastest(a, b)
                } else if (this.state.pageControllerValue === 'optimal') {
                    return compareOptimal(a, b)
                } else {
                    return (a === b)
                }
            }
        )
    }

    render() {
        return (
            <div className='main'>
                <a href="https://www.aviasales.ru/" className='logo__href'>
                    <img className='logo' src={logoImg} alt='logo' width='60px' height='60px' />
                </a>
                <div className='content'>
                    <div className='filter-panel'>
                        <h2 className='filter-panel__heading'>Количество пересадок</h2>
                        <div className="filter-panel__container">
                            <CheckboxPanel 
                                onChange={this.handlingCheckboxChange} 
                                onFilter={this.onOnlyChange} 
                                transfers={this.state.transfers}
                            />
                        </div>
                    </div>
                        <SwitchPanel 
                            onChange={this.handlingRadioChange} 
                            value={this.state.pageControllerValue}
                        />
                    {this.state.newError ? (
                        <div>
                            <div className='errored-window'>Что-то пошло не так ({this.state.newError.headers.map.errors})</div>
                            <button type='button' className='more-results-button more-results-button--errored' onClick={this.fetchMoreTickets}>
                                Повторить попытку
                            </button>
                        </div>
                    ) : (
                        <div className='tickets-panel'>
                            <div className='tickets-panel__container'>
                                {(!this.state.loading && this.state.tickets.length === 0) ? (
                                    <h2 className='strict-filters-warning'>
                                        Не найдено результатов
                                    </h2>
                                ) : this.state.tickets.map((ticket, index) => (
                                    <Ticket key={index} value={ticket} />
                                ))}
                            </div>
                            {this.state.loading && (
                                <SkeletonTicket count={7}/>
                            )}
                            {!this.state.showMoreBtnIsHidden && this.state.data && !this.state.loading && (
                                <button type='button' className='more-results-button' onClick={this.fetchMoreTickets}>
                                    Показать еще билеты
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
