import React from 'react';
import cn from 'classnames';
import "./page-switch.scss";

export class PageSwitch extends React.Component {
    render() {
        return(
            <label className={cn('pageSwitch__container', this.props.checked && 'pageSwitch__container-checked')}>
                <h2 className='pageSwitch__heading'>{this.props.label}</h2>
                <div className='pageSwitch__content'></div>
                <input className='pageSwitch__radio' 
                    type="radio" 
                    name={this.props.name} 
                    checked={this.props.checked} 
                    value={this.props.value} 
                    onChange={this.props.onChange}
                />
            </label>
        )
    }
}