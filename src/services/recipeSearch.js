import axios from 'axios'; 

const headers = {
    "X-RapidAPI-Key": "908ac684e4msh08a4c08f50317abp1a4e19jsn27c44c8339e4"
}

const getRecipeByName = (data) => {
    const url = "https://webknox-recipes.p.rapidapi.com/recipes/search?type=" + data.typeSelect + "&diet=" + data.dietSelect + "&intolerances=" + data.intolerances + "&cuisine=" + data.cuisineSelect + "&query=" + data.recipeName
    console.log(url)
    
    const config = {
        method: "GET", 
        headers
    }

    return axios(url, config)
        .then(responseSuccess)
        .catch(responseError)
}; 

const getRecipeSummary = id => {
    const url = "https://webknox-recipes.p.rapidapi.com/recipes/" + id + "/summary"
    const config = {
        method: "GET", 
        headers
    }

    return axios(url, config)
        .then(responseSuccess)
        .catch(responseError)
}

const getRecipeDetailsById = id => {
    const url = "https://webknox-recipes.p.rapidapi.com/recipes/" + id + "/information"
    const config = {
        method: "GET", 
        headers
    }

    return axios(url, config)
        .then(responseSuccess)
        .catch(responseError)
}

const responseSuccess = (response) => {
    return response.data;
};

const responseError = (error) => {
    return error; 
};

export { getRecipeByName, getRecipeSummary, getRecipeDetailsById }