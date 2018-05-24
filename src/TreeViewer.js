import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {ProgressSpinner} from 'primereact/components/progressspinner/ProgressSpinner';
import {OrganizationChart} from 'primereact/components/organizationchart/OrganizationChart';
import {Tree} from 'primereact/components/tree/Tree';

import "./Login.css";
import request from "superagent";


class TreeViewer extends Component {


    onSelectionChange(selection) {
        this.setState({selection:selection});
        console.log(selection);
    }

    nodeTemplate(node) {
        return node.label
    }

    constructor(props) {
        super(props);

        this.state = {
            dataReceived: false,
            masterNode: ""
        }
        request
            .get("http://127.0.0.1:5000/nodes/tree")
            .then(
                (res) => {
                    this.setState(
                        {
                            dataReceived: true,
                            masterNode: res.body
                        }
                    )
                },
                (err) => {
                    console.log("erreur")
                }
            )
        this.onSelectionChange = this.onSelectionChange.bind(this);
    }


    render() {
        if (this.state.dataReceived) {
            return (
                <div>
                    {/*<OrganizationChart value={this.state.masterNode}></OrganizationChart>*/}
                    <OrganizationChart value={this.state.masterNode} nodeTemplate={this.nodeTemplate.bind(this)}
                                       selectionMode="single" selectionChange={this.onSelectionChange}
                                       className="company"></OrganizationChart>

                    {/*<Tree value={this.state.masterNode} layout="horizontal" />*/}

                </div>
            )
        }
        else {
            return <ProgressSpinner/>


        }
    }

}

export default TreeViewer;

