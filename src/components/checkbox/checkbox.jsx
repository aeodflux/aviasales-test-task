import React from 'react';
import classNames from 'classnames';
import "./checkbox.scss";

export class Checkbox extends React.Component {
    render() {
        return(
            <label className={classNames("filterPanel__checkbox", this.props.checked?"filterPanel__checkbox-checked":"filterPanel__checkbox")}>
                <input className='filterPanel__input' 
                    type="checkbox" 
                    id={this.props.id} 
                    checked={this.props.checked} 
                    onChange={this.props.onChange}
                    value={this.props.value}
                />
                <div className='filterPanel__content'>
                    {this.props.value !== "allChecked"?
                        <button className='checkbox__onlyFilterButton' 
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