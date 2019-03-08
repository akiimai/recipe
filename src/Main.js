import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Main.css';
import * as recipeSearch from './services/recipeSearch';
import { dietRestrictions } from './data';

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            data: [],
            dietRestrictions: dietRestrictions
        }
    }

    onChange = evt => {
        this.setState({
            title: evt.target.value
        })
    }

    addInput = () => {
        let include = document.getElementsByClassName('includeIngredient'); 

    }

    onSubmit = evt => {
        evt.preventDefault();
        const data = {
            title: this.state.title
        }

        recipeSearch.getRecipeByTitle(data)
            .then((response) => {
                console.log(response.results);
                this.setState({
                    data: response.results
                })
                return response;
            })
            .then((response) => {
                for (let i = 0; i < response.results.length; i++) {
                    console.log(response.results[i].id)
                    recipeSearch.getRecipeDetailsById(response.results[i].id)
                }
            })
            .catch(console.log)
    }

    render() {
        let dietRestrictions = this.state.dietRestrictions.map(item => {
            return (
                <div className="form-check form-check-inline" key={item.value}>
                    <input type="checkbox" class="form-check-input" id={item.value} />
                    <label className="form-check-label" htmlFor={item.name}>{item.name}</label>
                </div>
            )
        });

        let list = this.state.data
            ? this.state.data.map(item => {
                return (
                    <div className="row recipeItem" key={item.id}>
                        <div>
                            <img class="recipeImg" src={"http://webknox.com/recipeImages/" + item.image} alt={item.title} />
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
                    <h2 style={{textAlign: "center", paddingBottom: "30px"}}>What should I cook?</h2>
                    <form>
                        <div className="form-group row">
                            <label htmlFor="title" className="col-sm-4 col-form-label">Find a Recipe:</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="title" placeholder="Find a recipe" value={this.state.title} onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="restrictions" className="col-sm-4 col-form-label">Dietary Restrictions:</label>
                            <div className="col-sm-8" style={{fontSize: "15px"}}>
                                {dietRestrictions}
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="ingr-include" className="col-sm-4 col-form-label">Include Ingredients:</label>
                            <div className="col-sm-8 includeIngrdient" style={{display: "flex"}}>
                                <input type="text" className="form-control" id="ingr-include" placeholder="Optional" />
                                <button onClick={this.addInput}><i class='fas fa-plus'></i></button>
                            </div> 
                        </div>
                        <div className="form-group row">
                            <label htmlFor="ingr-exclude" className="col-sm-4 col-form-label">Exclude Ingredients:</label>
                            <div className="col-sm-8" style={{display: "flex"}}>
                                <input type="text" className="form-control" id="ingr-include" placeholder="Optional" />
                                <button><i class='fas fa-plus'></i></button>
                            </div> 
                        </div>
                        <div className="form-group row" style={{display: "flex", justifyContent: "center"}}>
                            <div>
                                <button type="submit" className="btn btn-primary" onClick={this.onSubmit} style={{width: "150px", marginTop: "40px"}}>Search</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="container">
                    {list}
                </div>
            </React.Fragment>
        )
    }
};

export default Main; 