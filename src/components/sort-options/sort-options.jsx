import React from 'react';
import { Switch } from "../switch/switch";

export class SortOptions extends React.Component {
    render() {
        return(
            <div className="switch-panel">
                <Switch name="radioTicketsPanel"
                    value='cheapest'
                    label="Самый дешевый"
                    checked={this.props.value === 'cheapest'}
                    onChange={this.props.onChange}
                />
                <Switch name="radioTicketsPanel"
                    value='fastest'
                    label="Самый быстрый"
                    checked={this.props.value === 'fastest'}
                    onChange={this.props.onChange}
                />
                <Switch name="radioTicketsPanel"
                    value='optimal'
                    label="Оптимальный"
                    checked={this.props.value === 'optimal'}
                    onChange={this.props.onChange}
                />
            </div>
        )
    }
}

