import axios from "axios";

export const BaseUrl = process.env.REACT_APP_BASE_URL

export const api = axios.create({
    baseURL: BaseUrl
});


export const getData = async (endpoint) => {

    let data = []

    api
    .get(endpoint)
    .then((response) => {data = response.data})
    .catch((err) => { data = err})

    return data
}

/*
export async function getData(endpoint) {

    let url = BaseUrl + endpoint
    let data = []

    try {
        const response = await fetch(url);
        data = await response.json();
        console.log(endpoint, data)
    } catch (error) {
        console.error('Erro ao buscar marcas:', error);
    }

    return data
}
*/