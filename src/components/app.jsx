import React from 'react';
import { PageSwitch } from "../components/page-switch";
import { NewCheckbox } from '../components/new-checkbox';
import { Ticket } from '../components/ticket';
import logoImg from '../img/logo.svg';
import { fastestSorting, optimalSorting, cheapestSorting } from '../lib/sorting'

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

export const App = class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            stopResponse: false,
            loading: false,
            pageControllerValue: 0,
            withoutTransfer: true,
            oneTransfer: true,
            twoTransfer: true,
            threeTransfer: true,
            renderedTickets: []
        };
    }
    changeCheckboxState = (name) => {
        this.setState((state) => {
            return {[name]: !state[name]}
        });
    }
    handlingCheckboxChange = (e) => {
        const nextChecked = e.target.checked;
        if (e.target.value === "allChecked") {
            this.setState({
                withoutTransfer: nextChecked,
                oneTransfer: nextChecked,
                twoTransfer: nextChecked,
                threeTransfer: nextChecked
            })
        } else {
            this.setState({[e.target.value]: nextChecked});
        }
        
    }
    onOnlyChange = (e) => {
        if (this.state.withoutTransfer !== e) {
            this.setState({withoutTransfer: false})
        }
        if (this.state.oneTransfer !== e) {
            this.setState({oneTransfer: false})
        }
        if (this.state.twoTransfer !== e) {
            this.setState({twoTransfer: false})
        }
        if (this.state.threeTransfer !== e) {
            this.setState({threeTransfer: false})
        }
        this.setState({[e]: true})
    }
    
    handlingRadioChange = (i) => {
        this.setState({pageControllerValue: i});
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
    buttonLoading = () => {
        if (((this.state.data === []) && (this.state.loading)) || (this.state.stopResponse)) {
            return;
        } else if ((this.state.data) && !(this.state.loading)) {
            return <button type='moreResultsButton' className='moreResultsButton' onClick={this.showMoreTickets}>Показать еще билеты</button>;
        } else {
            return <div>
                {skeletonTicket}
                {skeletonTicket}
                {skeletonTicket}
                {skeletonTicket}
                {skeletonTicket}
                {skeletonTicket}
            </div>
        }
    }
    render() {
        const renderedTickets = (this.state.data.map(response => response.tickets.filter(ticket => {
                if (this.state.withoutTransfer === this.state.oneTransfer === this.state.twoTransfer === this.state.threeTransfer) {
                    return true;
                } else {
                return((((ticket.segments[0].stops.length === 0)&&(this.state.withoutTransfer))||
                ((ticket.segments[0].stops.length === 1)&&(this.state.oneTransfer))||
                ((ticket.segments[0].stops.length === 2)&&(this.state.twoTransfer))||
                ((ticket.segments[0].stops.length === 3)&&(this.state.threeTransfer)))&&
                (((ticket.segments[1].stops.length === 0)&&(this.state.withoutTransfer))||
                ((ticket.segments[1].stops.length === 1)&&(this.state.oneTransfer))||
                ((ticket.segments[1].stops.length === 2)&&(this.state.twoTransfer))||
                ((ticket.segments[1].stops.length === 3)&&(this.state.threeTransfer))))
                }
                }
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
        return(
            <div className='main'>
                <a href="https://www.aviasales.ru/" className='logo__href'><img className='logo' src={logoImg} alt='logo' width='60px' height='60px'/></a>
                <div className='content'>
                    <div className='filterPanel'>
                        <h2 className='filterPanel__heading'>Количество пересадок</h2>
                        <div className="filterPanel__container">
                            <NewCheckbox id='checkboxFilterPanel1' label="Все" checked={this.state.withoutTransfer && this.state.oneTransfer && this.state.twoTransfer && this.state.threeTransfer} value="allChecked" onChange={this.handlingCheckboxChange} onFilter={() => this.onOnlyChange("allChecked")}/>
                            <NewCheckbox id='checkboxFilterPanel2' label="Без пересадок" checked={this.state.withoutTransfer} value="withoutTransfer" onChange={this.handlingCheckboxChange} onFilter={() => this.onOnlyChange("withoutTransfer")}/>
                            <NewCheckbox id='checkboxFilterPanel3' label="1 пересадка" checked={this.state.oneTransfer} value="oneTransfer" onChange={this.handlingCheckboxChange} onFilter={() => this.onOnlyChange("oneTransfer")}/>
                            <NewCheckbox id='checkboxFilterPanel4' label="2 пересадки" checked={this.state.twoTransfer} value="twoTransfer" onChange={this.handlingCheckboxChange} onFilter={() => this.onOnlyChange("twoTransfer")}/>
                            <NewCheckbox id='checkboxFilterPanel5' label="3 пересадки" checked={this.state.threeTransfer} value="threeTransfer" onChange={this.handlingCheckboxChange} onFilter={() => this.onOnlyChange("threeTransfer")}/>
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
                                Не найдено результатов
                            </h2>
                            :renderedTickets):renderedTickets)}
                        </div>
                        {this.buttonLoading()}
                    </div>
                </div>
            </div>
        )
    }
}
