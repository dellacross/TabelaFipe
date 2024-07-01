import React from 'react'
import './styles.css'
import { useNavigate } from 'react-router-dom'

const ModelCard = (props) => {

  const navigate = useNavigate()

  const handleClick = () => {
    let obj = {
      nome: props.nome,
      codigo: props.codigo
    }

    sessionStorage.setItem("currentModel", JSON.stringify(obj))

    navigate("/modelo")
  }

  return (
    <div 
      id="model-card"
      onClick={() => handleClick()}
    >
      <header>
        <ion-icon name="car-sport-outline"></ion-icon>
      </header>
      <span>{props.nome}</span>
    </div>
  )
}

export default ModelCard