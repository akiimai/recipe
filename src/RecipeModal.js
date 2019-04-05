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
                            Recipe Title
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Title</h4>
                        <p>
                            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                            ac consectetur ac, vestibulum at eros.
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