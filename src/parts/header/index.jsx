import React, { useContext, useEffect, useState } from 'react'
import './styles.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/provider'

const Header = () => {

  const navigate = useNavigate()
  const { data, handleLogout } = useContext(AuthContext)
  const [logged, setLogged] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)

  useEffect(() => {
    (data || localStorage.getItem("dados")) ? setLogged(true) : setLogged(false)
  }, [data])

  const handleMobileNavigate = (endpoint) => {
    setMobileMenu(false)
    navigate(endpoint)
  }

  return (
    <header id="page-header">
      <span onClick={() => navigate("/")}>
        <ion-icon name="car-sport-outline"></ion-icon>&nbsp;Fipe<strong>Fácil</strong>
      </span>
      <nav id="web-nav">
        <button onClick={() => navigate("/")}>Buscar</button>
        <button onClick={() => navigate("/compare")}>Comparar</button>
        <button onClick={() => navigate("/rankings")}>Rankings</button>
      </nav>
      {
        logged ?
        (
          <span id="fav-logout">
            <button onClick={() => navigate("/perfil")}><ion-icon name="person-outline"></ion-icon></button>
            <button onClick={(e) => handleLogout(e)}><ion-icon name="log-out-outline"></ion-icon></button>
          </span>
        )
        :
        (
          <button 
            onClick={() => navigate("/login")}
            id="login-btn"
          >
            <span>Entrar</span>
            <ion-icon name="log-in-outline"></ion-icon>
          </button>
        )
      }
      <button 
        id="mobile-nav-btn"
        onClick={() => setMobileMenu(true)}
      >
        <ion-icon name="menu-outline"></ion-icon>
      </button>
      {
        mobileMenu &&
        <nav id="nav-mobile">
          <header>
            <span onClick={() => handleMobileNavigate("/")}><ion-icon name="car-sport-outline"></ion-icon>&nbsp;Fipe<strong>Fácil</strong></span>
            <button onClick={() => setMobileMenu(false)}><ion-icon name="close-outline"></ion-icon></button>
          </header>
          <main>
            <button onClick={() => handleMobileNavigate("/perfil")}>Entrar ou cadastrar</button>
            <button onClick={() => handleMobileNavigate("/")}>Buscar</button>
            <button onClick={() => handleMobileNavigate("/compare")}>Comparar</button>
            <button onClick={() => handleMobileNavigate("/rankings")}>Rankings</button>
          </main>
          <footer />
        </nav>
      }
    </header>
  )
}

export default Header