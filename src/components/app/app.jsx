import React from 'react';
import { SortOptions} from '../sort-options/sort-options';
import { TicketTransferFilters } from '../ticket-transfer-filters/ticket-transfer-filters';
import { Ticket } from '../ticket/ticket';
import { Button } from '../button/button';
import logoImg from '../../img/logo.svg';
import { compareFastest, compareOptimal, compareCheapest } from '../../lib/sorting';
import "./app.scss";
import { SkeletonTicket } from '../skeleton/skeleton';

const DEFAULT_TRANSFERS = [0, 1, 2, 3];

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            tickets: [],
            lastTicketsReceived: false,
            loading: false,
            sortTicketsBy: 'noSort',
            chosenTicketTransfers: DEFAULT_TRANSFERS,
            error: false,
        };
    }

    updateRenderedTickets = () => {
        this.setState({tickets: this.sortTickets(this.transferFiltering())})
    }

    handleCheckboxChange = (e) => {
        const value = e.target.value;
        const nextChecked = e.target.checked;
        if (value === "allChecked") {
            if (nextChecked) {
                this.setState({ chosenTicketTransfers: DEFAULT_TRANSFERS }, () => this.updateRenderedTickets() )
            } else {
                this.setState({ chosenTicketTransfers: [] }, () => this.updateRenderedTickets() )
            }
        } else {
            if (nextChecked) {
                this.setState({
                    chosenTicketTransfers: this.state.chosenTicketTransfers
                        .concat(Number(value))
                }, () => this.updateRenderedTickets())
            } else {
                this.setState({
                    chosenTicketTransfers: this.state.chosenTicketTransfers
                        .filter((el) => el !== Number(value))
                }, () => this.updateRenderedTickets())
            }
        }
    }

    onOnlyChange = (name) => {
        this.setState({ chosenTicketTransfers: [name]}, () => this.updateRenderedTickets())
    }

    handleRadioChange = (e) => {
        this.setState({ sortTicketsBy: e.target.value }, () => this.updateRenderedTickets());
    }

    componentDidMount = () => {
        this.fetchMoreTickets();
    }

    fetchMoreTickets = async () => {
        this.setState({ loading: true });
        const response = await fetch("/api/users/");
        if (!response.ok) {
            return this.setState({
                error: response,
                loading: false, 
            });
        } else {
            const json = await response.json();
            this.setState({
                data: [...this.state.data, json.tickets].flat(),
                lastTicketsReceived: json.stop,
                loading: false,
                error: false,
            }, () => this.updateRenderedTickets());
        }
    }

    transferFiltering = () => {
        return this.state.data.filter((ticket) => {
            const pathFromStops = ticket.segments[0].stops.length;
            const pathToStops = ticket.segments[1].stops.length;
            const chosenTranfers = this.state.chosenTicketTransfers;
            if (chosenTranfers.length === 0) {
                return true;
            } else {
                return (
                    chosenTranfers.includes(pathFromStops) && chosenTranfers.includes(pathToStops)
                )
            }
        })
    }

    sortMethods = {
        cheapest: compareCheapest,
        fastest: compareFastest,
        optimal: compareOptimal,
        noSort: () => 0,
    }

    sortTickets = (rawTickets) => rawTickets.sort(this.sortMethods[this.state.sortTicketsBy])

    render() {
        return (
            <div className='main'>
                <a href="https://www.aviasales.ru/" className='logo__href'>
                    <img className='logo' src={logoImg} alt='logo' width='60px' height='60px' />
                </a>
                <div className='content'>
                    <div className='filter-panel'>
                        <h2 className='filter-panel__heading'>
                            Количество пересадок
                        </h2>
                        <div className="filter-panel__container">
                            <TicketTransferFilters 
                                onChange={this.handleCheckboxChange} 
                                onFilter={this.onOnlyChange} 
                                transfers={this.state.chosenTicketTransfers}
                            />
                        </div>
                    </div>
                    <SortOptions
                        onChange={this.handleRadioChange} 
                        value={this.state.sortTicketsBy}
                    />
                    <div className='tickets-panel'>
                        <div className='tickets-panel__container'>
                            {(!this.state.loading && this.state.tickets.length === 0 && !this.state.error) ? (
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
                        {!this.state.lastTicketsReceived
                            && this.state.data 
                            && !this.state.loading
                            && !this.state.error && (
                            <Button onClick={this.fetchMoreTickets}>
                                Показать еще билеты
                            </Button>
                        )}
                        {this.state.error && !this.state.loading && (
                            <div>
                                <div className='errored-window'>Что-то пошло не так ({this.state.error.headers.map.errors})</div>
                                <Button variant="error" onClick={this.fetchMoreTickets}>
                                    Повторить попытку
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
