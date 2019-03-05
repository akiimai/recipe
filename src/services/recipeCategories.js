import axios from 'axios'; 

const getRecipeByCuisine = (type) => {
    return axios.get("https://webknox-recipes.p.rapidapi.com/recipes/search?query=" + type )
        .then(responseSuccess)
        .catch(responseError)
}; 

const responseSuccess = () => {

}

const responseError = () => {

}

export { getRecipeByCuisine}