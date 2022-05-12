import React, { Fragment } from 'react';
import { PageSwitch } from "../page-switch/page-switch";
import { NewCheckbox } from '../new-checkbox/new-checkbox';
import { Ticket } from '../ticket/ticket';
import logoImg from '../../img/logo.svg';
import { compareFastest, compareOptimal, compareCheapest } from '../../lib/sorting';
import "./app.scss";
import { SkeletonTicket } from '../skeleton/skeleton';

export const App = class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            showMoreBtnIsHidden: false,
            loading: false,
            pageControllerValue: 0,
            transfersFilter: [0, 1, 2, 3],
            newError: false,
        };
    }

    handlingCheckboxChange = (e) => {
        const value = e.target.value;
        const nextChecked = e.target.checked;
        if (value === "allChecked") {
            if (nextChecked) {
                this.setState({transfersFilter: [0, 1, 2, 3]})
            } else {
                this.setState({transfersFilter: []})
            }
        } else {
            if (nextChecked) {
                this.setState({transfersFilter: this.state.transfersFilter.concat(Number(value))})
            } else {
                this.setState({transfersFilter: this.state.transfersFilter.filter((el) => el !== Number(value))})
            }
        }
    }

    onOnlyChange = (name) => {
        this.setState({transfersFilter: [name]})
    }

    handlingRadioChange = (e) => {
        this.setState({ pageControllerValue: e.target.value });
    }

    componentDidMount = () => {
        this.showMoreTickets();
    }

    showMoreTickets = async () => {
        this.setState({ loading: true });
        const response = await fetch("/api/users/");
        if (!response.ok) {
            return this.setState({newError: response});
        } else {
            const json = await response.json();
            this.setState({
            data: [...this.state.data, json],
            showMoreBtnIsHidden: json.stop,
            loading: false
        });
        }
    }

    transferFiltering = (ticket) => {
        const pathFromStops = ticket.segments[0].stops.length;
        const pathToStops = ticket.segments[1].stops.length;
        if (this.state.transfersFilter.length === 0) {
            return true;
        } else {
            return this.state.transfersFilter.includes(pathFromStops) && this.state.transfersFilter.includes(pathToStops)
        }
    }

    sortTickets = () => {
        return this.state.data
            .map(response => response.tickets
                .filter(n => this.transferFiltering(n))
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
                })
            )
    }

    render() {
        let filteredSortedTickets = [];
        if (!this.state.newError) {filteredSortedTickets = this.sortTickets()
            .flat()
            .map((ticket, index) => <Ticket key={index} value={ticket} />)}
        return (
            (this.state.newError) ? 
            <Fragment>
                {alert(this.state.newError.headers.map.errors)}
                <div className='erroredWindow'>Упс... Произошла ошибка</div>
            </Fragment> :
            <div className='main'>
                {this.state.newError && alert(error)}
                <a href="https://www.aviasales.ru/" className='logo__href'>
                    <img className='logo' src={logoImg} alt='logo' width='60px' height='60px' />
                </a>
                <div className='content'>
                    <div className='filterPanel'>
                        <h2 className='filterPanel__heading'>Количество пересадок</h2>
                        <div className="filterPanel__container">
                            <NewCheckbox id='checkboxFilterPanel1'
                                label="Все"
                                checked={this.state.transfersFilter.includes(0) && this.state.transfersFilter.includes(1) && 
                                    this.state.transfersFilter.includes(2) && this.state.transfersFilter.includes(3)}
                                value="allChecked"
                                onChange={this.handlingCheckboxChange}
                            />
                            <NewCheckbox id='checkboxFilterPanel2'
                                label="Без пересадок"
                                checked={this.state.transfersFilter.includes(0)}
                                value={0}
                                onChange={this.handlingCheckboxChange}
                                onFilter={() => this.onOnlyChange(0)}
                            />
                            <NewCheckbox id='checkboxFilterPanel3'
                                label="1 пересадка"
                                checked={this.state.transfersFilter.includes(1)}
                                value={1}
                                onChange={this.handlingCheckboxChange}
                                onFilter={() => this.onOnlyChange(1)}
                            />
                            <NewCheckbox id='checkboxFilterPanel4'
                                label="2 пересадки"
                                checked={this.state.transfersFilter.includes(2)}
                                value={2}
                                onChange={this.handlingCheckboxChange}
                                onFilter={() => this.onOnlyChange(2)}
                            />
                            <NewCheckbox id='checkboxFilterPanel5'
                                label="3 пересадки"
                                checked={this.state.transfersFilter.includes(3)}
                                value={3}
                                onChange={this.handlingCheckboxChange}
                                onFilter={() => this.onOnlyChange(3)}
                            />
                        </div>
                    </div>
                    <div className='biletsPanel'>
                        <div className="pageController">
                            <PageSwitch name="radioBiletsPanel"
                                value='cheapest'
                                label="Самый дешевый"
                                checked={this.state.pageControllerValue === 'cheapest'}
                                onChange={this.handlingRadioChange}
                            />
                            <PageSwitch name="radioBiletsPanel"
                                value='fastest'
                                label="Самый быстрый"
                                checked={this.state.pageControllerValue === 'fastest'}
                                onChange={this.handlingRadioChange}
                            />
                            <PageSwitch name="radioBiletsPanel"
                                value='optimal'
                                label="Оптимальный"
                                checked={this.state.pageControllerValue === 'optimal'}
                                onChange={this.handlingRadioChange}
                            />
                        </div>
                    </div>
                    <div className='ticketsPanel'>
                        <div className='ticketsPanel__container'>
                            {(!this.state.loading && filteredSortedTickets.length === 0) ? (
                                <h2 className='strictFiltersWarning'>
                                    Не найдено результатов
                                </h2>
                            ) : filteredSortedTickets}
                        </div>
                        {this.state.loading && (
                            <SkeletonTicket count={7}/>
                        )}
                        {!this.state.showMoreBtnIsHidden && this.state.data && !this.state.loading && (
                            <button type='button' className='moreResultsButton' onClick={this.showMoreTickets}>
                                Показать еще билеты
                            </button>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
