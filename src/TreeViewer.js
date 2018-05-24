import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {ProgressSpinner} from 'primereact/components/progressspinner/ProgressSpinner';
import {OrganizationChart} from 'primereact/components/organizationchart/OrganizationChart';
import {Tree} from 'primereact/components/tree/Tree';
import PopUpCreateNode from './PopUpCreateNode'
import StaffTable from './StaffTable'
import "./Login.css";
import request from "superagent";


class TreeViewer extends Component {


    onSelectionChange(selectedNode) {
        this.setState({selectedNode: selectedNode, showPopUp: true});
        console.log(selectedNode);
    }

    nodeTemplate(node) {
        return node.label
    }

    constructor(props) {
        super(props);

        this.state = {
            dataReceived: false,
            masterNode: "",
            showPopUp: false
        }
        this.getTree = this.getTree.bind(this);
        this.updateAfterNodePost = this.updateAfterNodePost.bind(this);
        this.onSelectionChange = this.onSelectionChange.bind(this);

        this.getTree();
    }

    getTree() {
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
    }

    updateAfterNodePost(){
        this.setState({showPopUp:false})
        this.getTree()
    }

    render() {
        if (this.state.dataReceived) {
            return (
                <div>
                    {/*<OrganizationChart value={this.state.masterNode}></OrganizationChart>*/}
                    <OrganizationChart value={this.state.masterNode} nodeTemplate={this.nodeTemplate.bind(this)}
                                       selectionMode="single" selectionChange={this.onSelectionChange}
                                       className="company"></OrganizationChart>
                    <PopUpCreateNode show={this.state.showPopUp} selectedNode={this.state.selectedNode} updateParentTree={this.updateAfterNodePost}/>
                    {/*<Tree value={this.state.masterNode} layout="horizontal" />*/}
                    <StaffTable/>
                </div>
            )
        }
        else {
            return <ProgressSpinner/>


        }
    }

}

export default TreeViewer;

