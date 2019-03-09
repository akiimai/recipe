import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Main.css';
import * as recipeSearch from './services/recipeSearch';
import { dietRestrictions } from './data';

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recipeName: '',
            dietRestrictions: dietRestrictions,
            data: [],
            include: [],
            exclude: []
        }
    }

    onChange = evt => {
        evt.preventDefault();
        this.setState({
            recipeName: evt.target.value
        })
    };

    handleInclude = (evt, index) => {
        evt.preventDefault();
        let includeIngredients = [...this.state.include]
        includeIngredients[index] = evt.target.value;
        this.setState({
            include: includeIngredients
        })
    };

    handleExclude = (evt, index) => {
        evt.preventDefault();
        let excludeIngredients = [...this.state.exclude]
        excludeIngredients[index] = evt.target.value;
        this.setState({
            exclude: excludeIngredients
        })
    };

    addIncludeField = evt => {
        evt.preventDefault();
        let include = this.state.include.concat([""]);
        this.setState({
            include
        })
    };

    addExcludeField = evt => {
        evt.preventDefault();
        let exclude = this.state.exclude.concat([""]);
        this.setState({
            exclude
        })
    }

    deleteIncludeField = (evt, index) => {
        evt.preventDefault();
        this.state.include.splice(index, 1);
        // let include = [
        //     ...this.state.include.slice(0, index), 
        //     ...this.state.include.slice(index + 1)
        // ] 
        this.setState({
            include: this.state.include
            // include
        })
    };

    deleteExcludeField = (evt, index) => {
        evt.preventDefault();
        this.state.exclude.splice(index, 1);
        this.setState({
            exclude: this.state.exclude
        })
    };

    onSubmit = evt => {
        evt.preventDefault();
        const data = {
            recipeName: this.state.recipeName
        }

        recipeSearch.getRecipeByName(data)
            .then((response) => {
                console.log(response.results);
                this.setState({
                    data: response.results
                })
                // return response;
            })
            // .then((response) => {
            //     for (let i = 0; i < response.results.length; i++) {
            //         console.log(response.results[i].id)
            //         recipeSearch.getRecipeDetailsById(response.results[i].id)
            //     }
            // })
            .catch(console.log)
    };

    render() {
        let addIncludeField = this.state.include.map((item, index) => {
            return (
                <div className="form-group row" key={index}>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-8" style={{ display: "flex" }}>
                        <input type="text" className="form-control" value={item} placeholder="" onChange={e => this.handleInclude(e, index)} />
                        <span onClick={e => this.deleteIncludeField(e, index)}><i className="fas fa-times delete-btn"></i></span>
                    </div>
                </div>
            )
        });

        let addExcludeField = this.state.exclude.map((item, index) => {
            return (
                <div className="form-group row" key={index}>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-8" style={{ display: "flex" }}>
                        <input type="text" className="form-control" value={item} placeholder="" onChange={e => this.handleExclude(e, index)} />
                        <span onClick={e => this.deleteExcludeField(e, index)}><i className="fas fa-times delete-btn"></i></span>
                    </div>
                </div>
            )
        })

        let dietRestrictions = this.state.dietRestrictions.map(item => {
            return (
                <div className="form-check form-check-inline" key={item.value}>
                    <input type="checkbox" className="form-check-input" id={item.value} />
                    <label className="form-check-label" htmlFor={item.name}>{item.name}</label>
                </div>
            )
        });

        let list = this.state.data
            ? this.state.data.map(item => {
                return (
                    <div className="col-sm-4" key={item.id}>
                        <img className="recipeImg" src={"http://webknox.com/recipeImages/" + item.image} alt={item.recipeName} />
                        <h2>{item.title}</h2>
                        <div>
                            <div>Cook Time: {item.readyInMinutes} minutes</div>
                            <div>Servings: {item.servings}</div>
                        </div>
                    </div>

                )
            })
            : "in progress"

        return (
            <React.Fragment>
                <div className="container form-container">
                    <h2 style={{ textAlign: "center", paddingBottom: "30px" }}>What should I cook?</h2>
                    <form>
                        <div className="form-group row">
                            <label htmlFor="recipeName" className="col-sm-4 col-form-label">Find a Recipe:</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="recipeName" placeholder="Find a recipe" defaultValue={this.state.recipeName} onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="restrictions" className="col-sm-4 col-form-label">Dietary Restrictions:</label>
                            <div className="col-sm-8" style={{ fontSize: "15px" }}>
                                {dietRestrictions}
                            </div>
                        </div>
                        {/* Include Block */}
                        <div className="form-group row">
                            <label htmlFor="ingredient-include" className="col-sm-4 col-form-label">Include Ingredients:</label>
                            <div className="col-sm-8 includeIngredient" style={{ display: "flex" }}>
                                <input type="text" className="form-control" id="ingredient-include" placeholder="Optional" />
                                <button type="button" className="btn form-btn" onClick={this.addIncludeField}><i className='fas fa-plus'></i></button>
                            </div>
                        </div>
                        {addIncludeField}
                        {/* Include Block End */}

                        {/* Exclude Block */}
                        <div className="form-group row">
                            <label htmlFor="ingredient-exclude" className="col-sm-4 col-form-label">Exclude Ingredients:</label>
                            <div className="col-sm-8" style={{ display: "flex" }}>
                                <input type="text" className="form-control" id="ingredient-exclude" placeholder="Optional" />
                                <button type="button" className="btn form-btn" onClick={this.addExcludeField}><i className='fas fa-plus'></i></button>
                            </div>
                        </div>
                        {addExcludeField}
                        {/* Exclude Block End */}
                        <div className="form-group row" style={{ display: "flex", justifyContent: "center" }}>
                            <div>
                                <button type="submit" className="btn btn-primary" onClick={this.onSubmit} style={{ width: "150px", marginTop: "40px" }}>Search</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="container">
                    <div className="row recipeItem col-sm-12">
                        {list}
                    </div>
                </div>
            </React.Fragment>
        )
    }
};

export default Main; 