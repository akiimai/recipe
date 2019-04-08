import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class RecipeModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalData: this.props
        }
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
                    <Modal.Header id="modal-title" closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {this.props.modaldata.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-body">
                        <img className="modal-image" src={this.props.modaldata.image} alt={this.props.modaldata.title} />
                        <div className="modal-text">
                            <div>
                                Cook Time: {this.props.modaldata.readyInMinutes}
                                Servings: {this.props.modaldata.servings}
                            </div>
                            <div>
                                <h5>Ingredients:</h5>
                                {/* <p>{this.props.modaldata.extendedIngredients}</p> */}
                            </div>
                            <div>
                                <h5>Instructions:</h5>
                                <p>{this.props.modaldata.instructions}</p>
                            </div>
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