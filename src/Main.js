import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Main.css';
import * as recipeSearch from './services/recipeSearch';
import { diet, intolerances, cuisines, type } from './data';
import RecipeModal from './RecipeModal';
class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            diet: diet,
            intolerances: intolerances,
            cuisines: cuisines,
            type: type,

            list: [],
            include: [],
            exclude: [],

            data: {
                recipeName: '',
                dietSelect: '',
                cuisineSelect: '',
                typeSelect: '',
                excludeIngredients: '',
                intolerances: ''
            },
            modalShow: false
        }
    }

    onRecipeName = (evt) => {
        this.setState({
            data: { recipeName: evt.target.value }
        })
    };

    dietSelect = (evt) => {
        console.log(evt.target.getAttribute('value'))

        console.log(this.state.diet)
        let data = { ...this.state.data };
        data.dietSelect = evt.target.value;
        this.setState({
            data
        })
    };

    cuisineSelect = (evt) => {
        let data = { ...this.state.data };
        data.cuisineSelect = evt.target.value;
        this.setState({
            data
        })
    };

    typeSelect = (evt) => {
        this.setState({
            data: { recipeName: evt.target.value }
        })
    };

    onCheckIntolerances = (evt, index) => {
        let intolerances = [...this.state.intolerances]
        intolerances[index].checked = evt.target.checked;

        let data = { ...this.state.data };
        data.intolerances = intolerances;

        this.setState({
            data
        })

        // this.setState({
        //     intolerances
        // })

        // console.log(this.state.intolerances)
    }

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

    onSelect = (e, id) => {
        console.log(id)
        
        this.setState({
            modalShow: true
        })
    }

    modalClose = () => {
        this.setState({
            modalShow: false
        })
    }

    onSubmit = evt => {
        evt.preventDefault();

        console.log(this.state.data)


        // const data = {
        //     recipeName: this.state.recipeName
        // }

        // let intolerances = [];
        // for (let i = 0; i < this.state.intolerances.length; i++) {
        //     if (this.state.intolerances[i].checked === true) {
        //         intolerances.push(this.state.intolerances[i].name)
        //     }
        // }
        // let str_2 = intolerances.toString().replace(",", "%2C+");

        // let str = this.state.list.dietSelect
        // console.log(str)

        // console.log(this.state.data)
        // recipeSearch.getRecipeByName(data, str, str_2)
        //     .then((response) => {
        //         console.log(response.results);
        //         this.setState({
        //             data: response.results
        //         })
        //         return response;
        //     })
        // .then((response) => {
        //     for (let i = 0; i < response.results.length; i++) {
        //         console.log(response.results[i].id)
        //         recipeSearch.getRecipeDetailsById(response.results[i].id)
        //     }
        // })
        // .catch(console.log)
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
        });

        let diet = this.state.diet.map((item, index) => {
            console.log(item.category)
            return (
                <option data-category={item.category} key={index}>{item.name}</option>
            )
        });

        let intolerances = this.state.intolerances.map((item, index) => {
            return (
                <div className="form-check form-check-inline" key={index}>
                    <input type="checkbox" className="form-check-input" checked={this.state.intolerances[index].checked} onChange={e => this.onCheckIntolerances(e, index)} />
                    <label className="form-check-label" htmlFor={item.name}>{item.name}</label>
                </div>
            )
        });

        let cuisines = this.state.cuisines.map((item, index) => {
            return (
                <option key={index}>{item.name}</option>
            )
        });

        let type = this.state.type.map((item, index) => {
            return (
                <option key={index}>{item.name}</option>
            )
        });

        let list = this.state.list
            ? this.state.list.map(item => {
                return (
                    <div className="col-sm-4 recipe-item" key={item.id} onClick={this.onSelect(item.id)}>
                        <img className="recipe-img" src={"http://webknox.com/recipeImages/" + item.image} alt={item.recipeName} />
                        <h3 className="recipe-title">{item.title}</h3>
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
                            <div className="col-sm-8 space">
                                <input type="text" className="form-control" id="recipeName" placeholder="Find a recipe" defaultValue={this.state.recipeName} onChange={this.onRecipeName} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="restrictions" className="col-sm-4 col-form-label">Diet:</label>
                            <select className="col-sm-8 form-control" onChange={this.dietSelect}>
                                <option>Choose...</option>
                                {diet}
                            </select>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="restrictions" className="col-sm-4 col-form-label">Intolerances:</label>
                            <div className="col-sm-8" style={{ fontSize: "15px", paddingTop: "8px" }}>
                                {intolerances}
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="restrictions" className="col-sm-4 col-form-label">Cuisine:</label>
                            <select className="col-sm-8 form-control" onChange={this.cuisineSelect}>
                                <option>Choose...</option>
                                {cuisines}
                            </select>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="restrictions" className="col-sm-4 col-form-label">Type:</label>
                            <select className="col-sm-8 form-control" onChange={this.typeSelect}>
                                <option>Choose...</option>
                                {type}
                            </select>
                        </div>
                        {/* Include Block */}
                        <div className="form-group row">
                            <label htmlFor="ingredient-include" className="col-sm-4 col-form-label">Include Ingredients:</label>
                            <div className="col-sm-8 includeIngredient space" style={{ display: "flex" }}>
                                <input type="text" className="form-control" id="ingredient-include" placeholder="Optional" />
                                <button type="button" className="btn form-btn" onClick={this.addIncludeField}><i className='fas fa-plus'></i></button>
                            </div>
                        </div>
                        {addIncludeField}
                        {/* Include Block End */}

                        {/* Exclude Block */}
                        <div className="form-group row">
                            <label htmlFor="ingredient-exclude" className="col-sm-4 col-form-label">Exclude Ingredients:</label>
                            <div className="col-sm-8 space" style={{ display: "flex" }}>
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
                    <div className="row recipe-ctn col-sm-12">
                        {list}

                        <div className="col-sm-4 recipe-item" onClick={e => this.onSelect(e, 'test')}>
                            <img className="recipe-img" src="https://upload.wikimedia.org/wikipedia/commons/5/54/Pasta-2802156_1920.jpg"/>
                            <h3 className="recipe-title">Test Recipe Title</h3>
                            <div>
                                <div>Cook Time: 10 minutes</div>
                                <div>Servings: 12</div>
                            </div>
                        </div>
                    </div>
                </div>

                <RecipeModal show={this.state.modalShow} onHide={this.modalClose} />

            </React.Fragment>
        )
    }
};

export default Main; 