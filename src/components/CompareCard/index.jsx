import React, { useState, useEffect } from 'react'
import './styles.css'
import axios from 'axios'

const CompareCard = (props) => {

  const [ipva, setIpva] = useState(null)
  const url = "http://fipefacil.pythonanywhere.com"

  const handleClass = () => {
    if(!props.vehicle) return ""
    if(props.datasCompare) {
      if(props.datasCompare?.max_valor === props.id) return "max-value"
      else return "min-value"
    } else return "equal-value"
  }

  const parsePrice = (priceString) =>  {
    // Remove o prefixo "R$ "
    let priceWithoutSymbol = priceString?.replace("R$ ", "");
  
    // Remove os pontos de separação de milhares
    let priceWithoutDots = priceWithoutSymbol?.replace(/\./g, "");
  
    // Substitui a vírgula decimal por um ponto decimal
    let priceWithDot = priceWithoutDots?.replace(",", ".");
  
    // Converte a string resultante para float
    let priceFloat = parseFloat(priceWithDot);
  
    return priceFloat;
  }
  
  useEffect(() => {
    let dados = JSON.parse(localStorage.getItem("dados"))
    let tipo = sessionStorage.getItem("tipo")
    let estado = dados?.estado
    let val = parsePrice(props.vehicle?.Valor)

    if(props.vehicle) {
      axios
      .post(`${url}/ipva`, {
        tipo: tipo,
        ano_id: props.vehicle?.AnoModelo,
        price: val,
        state: estado
      })
      .then((response) => {
        setIpva(response.data?.ipva?.toFixed(2))
        //console.log("res", response.data)
      })
      .catch((err) => console.error("err", err))
    } else setIpva(null)
  }, [props.vehicle])

  return (
    <div id="compare-card">
      <header className={`vehicle-type-${props.vehicle?.TipoVeiculo}`} />
      <main>
        <span>
          <h6>Valor FIPE:</h6>
          <span className={handleClass()}>
            {props.vehicle?.Valor}
            {!props.vehicle && "-"}
          </span>
        </span>
        <span>
          <h6>Valor IPVA:</h6>
          <span className={handleClass()}>
            {ipva && `R$ ${ipva}`}
            {(!ipva || !props.vehicle) && "-"}
          </span>
        </span>
        <span>
          <h6>Ano:</h6>
          <span>
            {props.vehicle?.AnoModelo}
            {!props.vehicle && "-"}
          </span>
        </span>
        <span>
          <h6>Combustível:</h6>{props.vehicle?.Combustivel}
          {!props.vehicle && "-"}
        </span>
        <span>
          <h6>Mês de Referência:</h6>{props.vehicle?.MesReferencia}
          {!props.vehicle && "-"}
        </span>
        <span>
          <h6>Código FIPE:</h6>{props.vehicle?.CodigoFipe}
          {!props.vehicle && "-"}
        </span>
      </main>
    </div>
  )
}

export default CompareCard