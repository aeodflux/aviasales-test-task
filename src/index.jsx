import React from 'react';
import { createRoot } from 'react-dom/client';
import './scss/index.scss';
import logoImg from './img/logo.svg';
import classNames from 'classnames';

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

class App extends React.Component {
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
            <div className='main'>
                <img className='logo' src={logoImg} alt='logo' width='60px' height='60px'/>
                <div className='content'>
                    <div className='filterPanel'>
                        <h2 className='filterPanel__heading'>Количество пересадок</h2>
                        <div className="filterPanel__container">
                            <div className="filterPanel__checkbox"><input type="checkbox" id='checkboxFilterPanel1'/><label className='filterPanel__label' htmlFor="checkboxFilterPanel1">Все</label></div>
                            <div className="filterPanel__checkbox"><input type="checkbox" id='checkboxFilterPanel2'/><label className='filterPanel__label' htmlFor="checkboxFilterPanel2">Без пересадок</label></div>
                            <div className="filterPanel__checkbox"><input type="checkbox" id='checkboxFilterPanel3'/><label className='filterPanel__label' htmlFor="checkboxFilterPanel3">1 пересадка</label></div>
                            <div className="filterPanel__checkbox"><input type="checkbox" id='checkboxFilterPanel4'/><label className='filterPanel__label' htmlFor="checkboxFilterPanel4">2 пересадки</label></div>
                            <div className="filterPanel__checkbox"><input type="checkbox" id='checkboxFilterPanel5'/><label className='filterPanel__label' htmlFor="checkboxFilterPanel5">3 пересадки</label></div>
                        </div>
                    </div>
                    <div className='biletsPanel'>
                        <div className='pageController'>
                            <PageSwitch name="radioBiletsPanel" value={0} label="Самый дешевый" checked={this.state.pageControllerValue===0} onChange={() => this.handlingRadioChange(0)}></PageSwitch>
                            <PageSwitch name="radioBiletsPanel" value={1} label="Самый быстрый" checked={this.state.pageControllerValue===1} onChange={() => this.handlingRadioChange(1)}></PageSwitch>
                            <PageSwitch name="radioBiletsPanel" value={2} label="Оптимальный" checked={this.state.pageControllerValue===2} onChange={() => this.handlingRadioChange(2)}></PageSwitch>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);