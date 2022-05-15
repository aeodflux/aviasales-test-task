import React from 'react';
import classNames from 'classnames';
import "./checkbox.scss";

export class Checkbox extends React.Component {
    render() {
        return(
            <label className={classNames("filter-panel__checkbox", this.props.checked?"filter-panel__checkbox-checked":"filter-panel__checkbox")}>
                <input className='filter-panel__input' 
                    type="checkbox" 
                    id={this.props.id} 
                    checked={this.props.checked} 
                    onChange={this.props.onChange}
                    value={this.props.value}
                />
                <div className='filter-panel__content'>
                    {this.props.value !== "allChecked"?
                        <button className='filter-panel__only-filter-button' 
                            type='button'
                            onClick={this.props.onFilter}>Только
                        </button>
                    :""}
                </div>
                {this.props.label}
            </label>
        )
    }
}