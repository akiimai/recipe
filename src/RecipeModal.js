import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class RecipeModal extends Component {
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
                            {this.props.modaldata.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={this.props.modaldata.image} alt={this.props.modaldata.title} />
                        <div>
                            <h4>Instructions:</h4>
                            <p>{this.props.modaldata.instructions}</p>
                        </div>
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