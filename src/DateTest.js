import React, {Component} from 'react';
import {Calendar} from 'primereact/components/calendar/Calendar';


class DateTest extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {}
    }


    render() {
        return <div>
            <Calendar value={this.state.date} onChange={(e) => this.setState({date: e.value})}></Calendar>
        </div>
    }
}

export default DateTest;

