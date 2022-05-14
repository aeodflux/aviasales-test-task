import React from 'react';
import { Switch } from "../switch/switch";

export class SwitchPanel extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="pageController">
                <Switch name="radioBiletsPanel"
                    value='cheapest'
                    label="Самый дешевый"
                    checked={this.props.value === 'cheapest'}
                    onChange={this.props.onChange}
                />
                <Switch name="radioBiletsPanel"
                    value='fastest'
                    label="Самый быстрый"
                    checked={this.props.value === 'fastest'}
                    onChange={this.props.onChange}
                />
                <Switch name="radioBiletsPanel"
                    value='optimal'
                    label="Оптимальный"
                    checked={this.props.value === 'optimal'}
                    onChange={this.props.onChange}
                />
            </div>
        )
    }
}

