import axios from "axios"
const url = "http://fipefacil.pythonanywhere.com"
const token = localStorage.getItem("token")

export const getProfile = () => {

    let data = null

    axios
    .get(`${url}/perfil`, {
        headers: {Authorization: `Bearer ${token}`}
    })
    .then((response) => {
        console.log("response", response)
        return response.data
    })
    .catch((err) => console.error("err", err))

    return data
}

export const favorite = (data) => {
    axios
    .post(`${url}/favorite`,  
    {
        vehicle_url: data?.vehicle_url,
        tipo_veiculo: data?.tipo_veiculo
    },
    {
        headers: {Authorization: `Bearer ${token}`}
    })
    .then((response) => {
        console.log("res", response)
    })
    .catch((err) => console.error("err", err))
}

export const disfavorite = (data) => {
    axios
    .delete(`${url}/favorite`,
    {
        vehicle_url: data?.vehicle_url
    }, 
    {
        headers: {Authorization: `Bearer ${token}`},
    })
    .then((response) => {
        console.log("res", response)
    })
    .catch((err) => console.error("err", err))
}