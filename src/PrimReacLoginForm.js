import React, {Component} from 'react';
import {InputText} from 'primereact/components/inputtext/InputText';


class PrimReacLoginForm extends Component {

    constructor(props, context) {
        super(props, context);

    }

    render() {
        return <div>
            <span className="ui-float-label">
            <InputText id="float-input" type="text" size="30"/>
             <label htmlFor="float-input">Username</label>
                <InputText id="float-input2" type="password" size="30"/>
             <label htmlFor="float-input2">Password</label>
</span></div>
    }

}

export default PrimReacLoginForm;

