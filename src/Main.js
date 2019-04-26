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
            data: {
                recipeName: '',
                dietSelect: '',
                intolerances: '',
                cuisineSelect: '',
                typeSelect: '',
                excludeIngredients: '',
                itemCount: 6,
                offset: 0
            },
            modalShow: false,
            modalData: [],
            currentPage: 1,
        }
    }

    onRecipeName = (evt) => {
        let name = evt.target.value.toLowerCase().replace(" ", "+");
        let data = { ...this.state.data };
        data.recipeName = name;
        this.setState({
            data
        })
    };

    dietSelect = (evt) => {
        let diet = evt.target.value.toLowerCase().replace(" ", "+");
        let data = { ...this.state.data };
        data.dietSelect = diet;
        this.setState({
            data
        })
    };

    cuisineSelect = (evt) => {
        let cuisine = evt.target.value.toLowerCase().replace(" ", "+");
        let data = { ...this.state.data };
        data.cuisineSelect = cuisine;
        this.setState({
            data
        })
    };

    typeSelect = (evt) => {
        let type = evt.target.value.toLowerCase().replace(" ", "+");
        let data = { ...this.state.data };
        data.typeSelect = type;
        this.setState({
            data
        })
    };

    onCheckIntolerances = (evt, index) => {
        let list = [];
        let intolerances = [...this.state.intolerances]
        intolerances[index].checked = evt.target.checked;

        for (let i = 0; i < intolerances.length; i++) {
            if (intolerances[i].checked === true) {
                list.push(intolerances[i].name)
            }
        };

        let data = { ...this.state.data };
        data.intolerances = list.toString().replace(",", "%2C+").toLowerCase();

        this.setState({
            data
        });
    };

    handleExclude = (evt, index) => {
        evt.preventDefault();
        let data = { ...this.state.data };
        let exclude = evt.target.value.toLowerCase().replace(/\s+/g, '').replace(/,/g, '%2C+');
        data.excludeIngredients = exclude;

        this.setState({
            data
        })
    };

    onSelect = (evt, id) => {
        recipeSearch.getRecipeDetailsById(id)
            .then((response) => {
                console.log(response)

                this.setState({
                    modalData: response
                })
            })
            .then(() => {
                this.setState({
                    modalShow: true
                })
            })
            .catch(console.log)
    };

    modalClose = () => {
        this.setState({
            modalShow: false
        })
    };

    onSubmit = evt => {
        evt.preventDefault();

        recipeSearch.getRecipeByName(this.state.data)
            .then((response) => {
                console.log(response.results);
                this.setState({
                    list: response.results
                })
                return response;
            })
            .catch(console.log)

        document.getElementById('nav').classList.remove('hide');
    };

    prevPage = (evt) => {
        let currentPage = this.state.currentPage;
        let data = { ...this.state.data };

        if (currentPage === 1) {
            data.offset = 0

            this.setState({
                data
            }, () => this.onSubmit(evt))
        } else {
            currentPage -= 1;
            data.offset = data.offset - 6;
            this.pageActive(this.state.currentPage - 1);

            this.setState({
                currentPage,
                data
            }, () => this.onSubmit(evt))
        }
    };

    nextPage = (evt) => {
        let currentPage = this.state.currentPage;
        let data = { ...this.state.data };
        currentPage += 1;
        data.offset = 6 * this.state.currentPage;

        this.pageActive(this.state.currentPage + 1);

        this.setState({
            currentPage,
            data
        }, () => this.onSubmit(evt))
    }

    thisPage = (evt) => {
        let currentPage = evt.currentTarget.value;
        let data = { ...this.state.data };
        data.offset = (6 * currentPage) - 6;

        this.pageActive(evt.currentTarget.value);

        this.setState({
            currentPage,
            data
        }, () => this.onSubmit(evt))
    }

    pageActive = (current) => {
        let pageLink = document.getElementsByClassName('page-item');

        for (let i = 0; i < pageLink.length; i++) {
            if (current === pageLink[i].value) {
                pageLink[i].className += " active"
            } else {
                pageLink[i].classList.remove("active");
            }
        }
    }

    render() {
        let diet = this.state.diet.map((item, index) => {
            return (
                <option data-category={item.category} key={index}>{item.name}</option>
            )
        });

        let intolerances = this.state.intolerances.map((item, index) => {
            return (
                <div className="form-check form-check-inline" key={index}>
                    <input type="checkbox" className="form-check-input" name={item.name} checked={this.state.intolerances[index].checked} onChange={e => this.onCheckIntolerances(e, index)} />
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
                    <div className="col-sm-4 recipe-item" value={item.id} key={item.id} onClick={(e) => this.onSelect(e, item.id)}>
                        <img className="recipe-img" src={"http://webknox.com/recipeImages/" + item.image} alt={item.recipeName} />
                        <h4 className="recipe-title">{item.title}</h4>
                        <div>
                            <div><strong>Cook Time: </strong>{item.readyInMinutes} minutes</div>
                            <div><strong>Servings: </strong>{item.servings}</div>
                        </div>
                    </div>

                )
            })
            : "in progress"

        return (
            <React.Fragment>
                <div className="container form-container">
                    <div className="form-description">
                        <h1>What to cook?</h1>
                        <p style={{ fontSize: "18px" }}>For the adventurous cook seeking new recipe ideas</p>
                    </div>
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
                        <div className="form-group row">
                            <label htmlFor="ingredient-exclude" className="col-sm-4 col-form-label">Exclude Ingredients:
                            <div><small>(separate ingredients with a comma)</small></div>
                            </label>
                            <div className="col-sm-8 space" style={{ display: "flex" }}>
                                <textarea type="text" className="form-control" id="ingredient-exclude" onChange={this.handleExclude} placeholder="Optional" />
                            </div>
                        </div>
                        <div className="form-group row submit-ctn">
                            <div>
                                <button type="submit" className="btn btn-secondary" onClick={this.onSubmit}>Search</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="image-credit">
                    Image by <a className="credit-link" href="https://pixabay.com/users/OpenClipart-Vectors-30363/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1296432">OpenClipart-Vectors</a> from <a className="credit-link" href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1296432">Pixabay</a>
                </div>

                <div className="container" id="list">
                    <div className="row recipe-ctn col-sm-12">
                        {list}
                    </div>

                    <nav id="nav" className="nav-pag hide" aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item" onClick={this.prevPage}>
                                <div className="page-link" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Previous</span>
                                </div>
                            </li>
                            <li id="page-1" className="page-item active" onClick={this.thisPage} value={1}><div className="page-link">1</div></li>
                            <li id="page-2" className="page-item" onClick={this.thisPage} value={2}><div className="page-link">2</div></li>
                            <li id="page-3" className="page-item" onClick={this.thisPage} value={3}><div className="page-link">3</div></li>
                            <li className="page-item" onClick={this.nextPage}>
                                <div className="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                    <span className="sr-only">Next</span>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div id="bottom"></div>

                <RecipeModal modaldata={this.state.modalData} show={this.state.modalShow} onHide={this.modalClose} />

            </React.Fragment>
        )
    }
};

export default Main; 