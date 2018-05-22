import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import "./Login.css";
import request from "superagent";
import {ProgressSpinner} from 'primereact/components/progressspinner/ProgressSpinner';
import OnePatientWindow from "./OnePatientWindow";


class PatientListTable extends Component {


    constructor(props) {

        super(props);
        this.fromNodeIdToLabel = this.fromNodeIdToLabel.bind(this)
    }


    fromNodeIdToLabel(cell, row) {
        return this.props.node_dict[cell]
    }


    render() {

        return (
            <BootstrapTable
                data={this.props.patientList}
                selectRow={{mode: 'checkbox', clickToSelect: true, onSelect: this.props.onRowSelect}}
                striped hover>
                <TableHeaderColumn isKey dataField='id'>Patient ID</TableHeaderColumn>
                <TableHeaderColumn dataField='firstName'>Prenom</TableHeaderColumn>
                <TableHeaderColumn dataField='lastName'>Nom</TableHeaderColumn>
                <TableHeaderColumn dataField='social_security_number'>Numéro de sécurité sociale</TableHeaderColumn>
                <TableHeaderColumn dataField='address'>Adresse </TableHeaderColumn>
                <TableHeaderColumn dataField='place_of_birth'>Lieu de Naissance</TableHeaderColumn>
                <TableHeaderColumn dataField='birthdate'>Date de naissance</TableHeaderColumn>
                <TableHeaderColumn dataField='node_id' dataFormat={this.fromNodeIdToLabel}>Unité de soins</TableHeaderColumn>
            </BootstrapTable>
        )


    }

}

export default PatientListTable;

