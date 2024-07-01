import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ResponseBox from '../components/ResponseBox'

export const AuthContext = createContext({})

export const AuthProvider = ({children}) => {   

    const navigate = useNavigate();
    const [data, setData] = useState(null)
    const [status, setStatus] = useState(null)
    const url = "http://fipefacil.pythonanywhere.com"

    const getPerfil = (token) => {
      axios
      .get(`${url}/perfil`, {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then((response) => {
        localStorage.setItem("dados", JSON.stringify(response.data))
      })
      .catch((err) => console.error("err", err))
    }
   
    const handleLogin = (data, e) => {
      e.preventDefault()

      axios
      .post("http://fipefacil.pythonanywhere.com/login", {
        user_id: data?.user,
        password: data?.password
      })
      .then((response) => {
        localStorage.setItem("token", response.data?.token)
        getPerfil(response.data?.token)
        setData(JSON.stringify(response.data))
        navigate("/")
        setStatus({
          codigo: 200,
          msg: "Login realizado com sucesso!"
        })
      })
      .catch((err) => {
        console.error(err)
        setStatus({
          codigo: 0,
          msg: "Houve um erro"
        })
      })
    }

    const handleRegister = (data, e) => {
      e.preventDefault()

      axios
      .post("http://fipefacil.pythonanywhere.com/register", {
        user_id: data?.user,
        nome: data?.nome,
        password: data?.password,
        estado: data?.estado
      })
      .then((response) => {
        console.log("res", response)
        setStatus({
          codigo: 200,
          msg: "Registro realizado com sucesso!"
        })
      })
      .catch((err) => {
        console.error(err)
        setStatus({
          codigo: 0,
          msg: "Houve um erro"
        })
      })
    }

    const handleLogout = (e) => {
      e.preventDefault()
      localStorage.removeItem("token")
      localStorage.removeItem("data")
      setData(null)
      navigate("/")
    }

    useEffect(() => {
      setTimeout(() => {
        setStatus(null);
      }, 5000);
    }, [status]);

    return (
      <AuthContext.Provider value={{data, handleLogin, handleLogout, handleRegister}}>
        { status && <ResponseBox status={status} /> }
        {children}
      </AuthContext.Provider>
    )
}

export default AuthProvider