import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Main.css';
import * as recipeSearch from './services/recipeSearch';

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '', 
            data: []
        }
    }

    onChange = (evt) => {
        this.setState({
            title: evt.target.value
        })
    }

    onSubmit = (evt) => {
        evt.preventDefault(); 
        const data = {
            title: this.state.title
        }

        recipeSearch.getRecipeByTitle(data)
            .then((response) => {
                this.setState({
                    data: response
                })
            })
            .catch(console.log)
    }

    render() {
        let list = this.state.data 
        ? this.state.data.map(item => {
            return (
                <div key={item.id}>
                    <div>
                        <img src={item.image} />
                    </div>
                    <div>
                        <h2>{item.title}</h2>
                    </div>
                </div>
            )
        }) 
        : "in progress"

        return (
            <React.Fragment>
                <div className="container form-container">
                <form>
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-2 col-form-label">Recipe Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="title" placeholder="Recipe Name" value={this.state.title} onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Search</button>
                        </div>
                    </div>
                </form>
                </div>

                <div>
                    {list}
                </div>
            </React.Fragment>
        )
    }
};

export default Main; 