import React, {Component} from 'react';

import "./Login.css";
import {
    Button,
    Modal
} from 'react-bootstrap';
import CreateNodeForm from './CreateNodeForm'

class PopUpCreateNode extends Component {
    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);

        this.state = {
            show: this.props.show
        };
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleHide() {
        this.setState({ show: false });
        // this.props.updateParentTable();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.show){
            this.handleShow()
        }
        else {
            this.handleHide()
        }
    }

    render() {
        var title = "Creation d'un nouveau Noeud"

        return <div className="static-modal">
            <Modal show={this.props.show}
                          onHide={this.props.updateParentTree}
                          dialogClassName="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <CreateNodeForm closeThePopUp={this.props.updateParentTree} fatherNode={this.props.selectedNode}/>
                </Modal.Body>

            </Modal>
        </div>;

    }

}

export default PopUpCreateNode;

