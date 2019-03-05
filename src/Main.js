import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Main.css';

class Main extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="container form-container">
                <form>
                    <div className="form-group row">
                        <label for="cuisine" className="col-sm-2 col-form-label">Cuisine</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="cuisine" placeholder="Cuisine" />
                        </div>
                    </div>
                    <fieldset className="form-group">
                        <div className="row">
                            <legend className="col-form-label col-sm-2 pt-0">Radios</legend>
                            <div className="col-sm-10">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked />
                                    <label className="form-check-label" for="gridRadios1">
                                        First radio
                                    </label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label for="inputState">State</label>
                                    <select id="inputState" className="form-control">
                                        <option selected>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <button type="submit" className="btn btn-primary">Sign in</button>
                        </div>
                    </div>
                </form>
                </div>
            </React.Fragment>
        )
    }
};

export default Main; 