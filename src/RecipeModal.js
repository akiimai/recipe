import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class RecipeModal extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            modalData: this.props.modaldata
        }
    }

    componentDidMount() {
        console.log(this.props.modaldata)
        console.log(this.state.modalData)
    }

    render() {
        return (
            <React.Fragment>
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {this.state.modalData.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Title</h4>
                        <p>
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }
}

export default RecipeModal; 