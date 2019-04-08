import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class RecipeModal extends Component {
    render() {
        let ingredients;
        let instructions;
        if (this.props.show === true) {
            ingredients = this.props.modaldata.extendedIngredients.map((item, index) => {
                return (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.measures.metric.amount} {item.measures.metric.unitShort}</td>
                    </tr>
                )
            });

            instructions = this.props.modaldata.analyzedInstructions.map((item, index) => {
                let subitem = item.steps;
                return (
                    <div key={index}>
                        {item.name ? (<div><strong>{item.name}: </strong></div>) : ""}
                        <ul>
                            {subitem.map((subitem, index) => {
                                return (
                                    <li key={index}>{subitem.step}</li>
                                )
                            })}
                        </ul>
                    </div>
                )
            })
        };

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
                        <div className="add-info">
                            <div><strong>Cook Time: </strong>{this.props.modaldata.readyInMinutes} minutes</div>
                            <div><strong>Servings: </strong>{this.props.modaldata.servings}</div>
                        </div>
                        <div className="modal-text">
                            <div className="ingredient-list">
                                <table className="table table-sm">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Ingredient</th>
                                            <th scope="col">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ingredients}
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <h5>Instructions:</h5>
                                <div>{instructions}</div>
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