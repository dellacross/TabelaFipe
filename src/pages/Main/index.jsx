import React, { useState, useEffect } from 'react'
import './styles.css'
import Wrapper from '../../parts/Wrapper'
import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'

const MainPage = () => {

  const [search, setSearch] = useState("")
  const [autoType, setAutoType] = useState(1)
  const [cars, setCars] = useState(null)
  const [motos, setMotos] = useState(null)
  const [trucks, setTrucks] = useState(null)
  const [autoPreview, setAutoPreview] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    api
    .get("/carros/marcas")
    .then((response) => setCars(response.data))
    .catch((err) => console.error(err))

    api
    .get("/motos/marcas")
    .then((response) => setMotos(response.data))
    .catch((err) => console.error(err))

    api
    .get("/caminhoes/marcas")
    .then((response) => setTrucks(response.data))
    .catch((err) => console.error(err))
  
    sessionStorage.setItem("currentModel", null)
    sessionStorage.setItem("marca", null)

  }, [])

  useEffect(() => {
    let arr = []
    if(autoType === 1) arr = cars
    if(autoType === 2) arr = motos
    if(autoType === 3) arr = trucks

    let filter_arr = arr?.filter(obj => obj.nome.toLowerCase().startsWith(search.toLowerCase()))

    setAutoPreview(filter_arr)
  }, [search, autoType, cars, motos, trucks])

  const handleSearch = (marca) => {
    let type = ""

    if(autoType === 1) type = "carros"
    if(autoType === 2) type = "motos"
    if(autoType === 3) type = "caminhoes"

    sessionStorage.setItem("tipo", type)

    if(marca) {
      let obj = autoPreview?.find(obj => obj.nome.toLowerCase() === marca.toLowerCase())
      sessionStorage.setItem("marca", obj.codigo)
      sessionStorage.setItem("nomeMarca", obj.nome)
      navigate("/result")
    }
    else {
      let obj = autoPreview?.find(obj => obj.nome.toLowerCase() === search.toLowerCase())
      if(obj) {
        sessionStorage.setItem("marca", obj.codigo)
        sessionStorage.setItem("nomeMarca", obj.nome)
        navigate("/result")
      }
    }  
  }

  return (
    <Wrapper>
      <main>
        <nav>
          <button 
            className={autoType === 1 ? "curr-type" : ""}
            onClick={() => setAutoType(1)}
          >
            Carros
          </button>
          <button 
            className={autoType === 2 ? "curr-type" : ""}
            onClick={() => setAutoType(2)}
          >
            Motos
          </button>
          <button 
            className={autoType === 3 ? "curr-type" : ""}
            onClick={() => setAutoType(3)}
          >
            Caminhões
          </button>
        </nav>
        <span id="search-box">
          <label 
            htmlFor="input-search"
            className={(autoPreview?.length > 0 && search !== "") ? "search-return-label" : ""}
          >
            <ion-icon name="search-outline"></ion-icon>
            <input 
              id="input-search"
              name="input-search"
              type="text" 
              placeholder="Digite uma marca"
              defaultValue={search}
              onChange={(e) => setSearch(e.target.value)}
              required
            />
          </label>
          {
            (autoPreview?.length > 0 && search !== "") &&
            <div id="models-search-return">
              {
                search !== "" && autoPreview?.map(({nome, codigo}) => (
                  <span 
                    key={codigo}
                    onClick={() => handleSearch(nome)}
                  >
                    {nome}
                  </span>
                ))
              }
            </div>
          }
        </span>
      </main>
    </Wrapper>
  )
}

export default MainPage