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
            dietRestrictions: dietRestrictions,
            include: []
        }
    }

    onChange = evt => {
        this.setState({
            title: evt.target.value
        })
    }
    
    handleInclude = (evt, index) => {
        evt.preventDefault();
        let includeIngredients = [...this.state.include]
        includeIngredients[index] = evt.target.value; 
        this.setState({
            include: includeIngredients
        })
    }

    addField = evt => {
        evt.preventDefault();
        let include = this.state.include.concat([""])
        this.setState({
            include
        })
    }; 

    deleteField = (evt, index) => {
        evt.preventDefault();
        this.state.include.splice(index, 1)
        // let include = [
        //     ...this.state.include.slice(0, index), 
        //     ...this.state.include.slice(index + 1)
        // ] 
        this.setState({
            include: this.state.include
            // include
        })
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
        let addField = this.state.include.map((item, index) => {
            return (
                <div className="form-group row" key={index}>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-8" style={{ display: "flex" }}>
                        <input type="text" className="form-control" value={item} placeholder="" onChange={e => this.handleInclude(e, index)} />
                        <span onClick={e => this.deleteField(e, index)}><i className="fas fa-times delete-btn"></i></span>
                    </div>
                </div>
            )
        });

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
                    <div className="row recipeItem" key={item.id}>
                        <div>
                            <img className="recipeImg" src={"http://webknox.com/recipeImages/" + item.image} alt={item.title} />
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
                    <h2 style={{ textAlign: "center", paddingBottom: "30px" }}>What should I cook?</h2>
                    <form>
                        <div className="form-group row">
                            <label htmlFor="title" className="col-sm-4 col-form-label">Find a Recipe:</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="title" placeholder="Find a recipe" defaultValue={this.state.title} onChange={this.onChange} />
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
                                <button type="button" className="btn form-btn" onClick={this.addField}><i className='fas fa-plus'></i></button>
                            </div>
                        </div>
                        
                        {addField}
                        
                        {/* Include Block End */}

                        <div className="form-group row">
                            <label htmlFor="ingredient-exclude" className="col-sm-4 col-form-label">Exclude Ingredients:</label>
                            <div className="col-sm-8" style={{ display: "flex" }}>
                                <input type="text" className="form-control" id="ingredient-exclude" placeholder="Optional" />
                                <button type="button" className="btn form-btn"><i className='fas fa-plus'></i></button>
                            </div>
                        </div>
                        <div className="form-group row" style={{ display: "flex", justifyContent: "center" }}>
                            <div>
                                <button type="submit" className="btn btn-primary" onClick={this.onSubmit} style={{ width: "150px", marginTop: "40px" }}>Search</button>
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