import React from 'react';
import cn from 'classnames';
import "./switch.scss";

export class Switch extends React.Component {
    render() {
        return(
            <label className={cn('switch-panel__container', this.props.checked && 'switch-panel__container--checked')}>
                <h2 className='switch-panel__heading'>{this.props.label}</h2>
                <div className='switch-panel__content'></div>
                <input className='switch-panel__radio' 
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