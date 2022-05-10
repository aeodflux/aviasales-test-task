import React from 'react';
import classNames from 'classnames';
import "./page-switch.scss";

export const PageSwitch = class PageSwitch extends React.Component {
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
