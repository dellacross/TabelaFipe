import React, { useState, useEffect } from 'react'
import './styles.css'
import Wrapper from '../../parts/Wrapper'
import CompareCard from '../../components/CompareCard'
import { api } from '../../services/api'

const ComparePage = () => {

  const [cars, setCars] = useState(null)
  const [motos, setMotos] = useState(null)
  const [trucks, setTrucks] = useState(null)

  //const [selectOp, setSelectOp] = useState(null)
  const [vehicleID, setVehicleID] = useState(1)
  const [typeVec, setTypeVec] = useState(null)

  const [currMarca, setCurrMarca] = useState(null)
  const [currModel, setCurrModel] = useState(null)

  const [vehicle1, setVehicle1] = useState(null)
  const [vehicle2, setVehicle2] = useState(null)

  const [datasCompare, setDatasCompare] = useState(null)

  const data = sessionStorage.getItem("data")
  
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
  }, [])

  useEffect(() => {
    let obj = {
      type: 1,
      marcas: cars
    }

    setTypeVec(obj)
  }, [cars])

  useEffect(() => {
    let valor_obj = 1
    let ano_obj = 1

    if(vehicle1 && vehicle2) {
      if(vehicle1.Valor < vehicle2.Valor) valor_obj = 2
      else if(vehicle1.Valor === vehicle2.Valor) valor_obj = 0

      if(parseInt(vehicle1.AnoModelo) < parseInt(vehicle2.AnoModelo)) ano_obj = 1
      else if(parseInt(vehicle1.AnoModelo) === parseInt(vehicle2.AnoModelo)) ano_obj = 0
    }

    setDatasCompare({max_valor: valor_obj, max_ano: ano_obj})
  }, [vehicle1, vehicle2])

  const handleType = (id) => {
    let arr = cars
    if(id === 2) arr = motos
    if(id === 3) arr = trucks

    let obj = {
      type: id,
      marcas: arr
    }

    setCurrModel(null)
    setCurrMarca(null)
    setTypeVec(obj)
  }

  const handleMarca = (codigo) => {

    let type = "carros"
    if(typeVec?.type === 2) type = "motos"
    if(typeVec?.type === 3) type = "caminhoes"

    let url = "/" + type + "/marcas/" + codigo + "/modelos"

    api
    .get(url)
    .then((response) => {
      setCurrMarca(
        {
          codigo: codigo,
          arr: response.data
        }
      )
    })
    .catch((err) => console.error(err))
  }

  const handleModel = (codigo) => {
    let type = "carros"
    if(typeVec?.type === 2) type = "motos"
    if(typeVec?.type === 3) type = "caminhoes"

    let url = "/" + type + "/marcas/" + currMarca?.codigo + "/modelos/" + codigo + "/anos"

    api
    .get(url)
    .then((response) => {
      setCurrModel(
        {
          codigo: codigo,
          arr: response.data
        }
      )
    })
    .catch((err) => console.error(err))
  }

  const handleYear = (codigo) => {
    let type = "carros"
    if(typeVec?.type === 2) type = "motos"
    if(typeVec?.type === 3) type = "caminhoes"

    let url = "/" + type + "/marcas/" + currMarca?.codigo + "/modelos/" + currModel?.codigo + "/anos/" + codigo 

    api
    .get(url)
    .then((response) => {
      if(vehicleID === 1) setVehicle1(response.data)
      if(vehicleID === 2) setVehicle2(response.data)
    })
    .catch((err) => console.error(err))
  }

  const toggleVehicleID = () => {
    vehicleID === 1 ? setVehicleID(2) : setVehicleID(1)
  }

  const handleFilter = () => {
    if(currModel) setCurrModel(null)
    else if(currMarca) setCurrMarca(null)
  }

  const cleanVehicle = () => {
    if(vehicleID === 1) setVehicle1(null)
    if(vehicleID === 2) setVehicle2(null)
  }

  return (
    <Wrapper>
      <main>
        <aside>
          <button id="mobile-aside-btn"><ion-icon name="arrow-back-outline"></ion-icon></button>
          <div className="vehicle-switch-wrapper">
            <span>Veículo:&nbsp;</span>
            <label 
              className="vehicle-switch" 
              htmlFor="vehicle-switch-checkbox"
            >
              <input 
                type="checkbox" 
                id="vehicle-switch-checkbox" 
                onChange={toggleVehicleID} 
                checked={vehicleID === 2} 
              />
              <div className="slider round">
                <span>1</span>
                <span>2</span>
              </div>
            </label>
          </div>
          <span>
            <button 
              onClick={() => handleType(1, 1)}
              className={typeVec?.type === 1 ? "active-btn" : ""}
            >
              Carro
            </button>

            <button 
              onClick={() => handleType(2, 1)}
              className={typeVec?.type === 2 ? "active-btn" : ""}
            >
              Moto
            </button>

            <button 
              onClick={() => handleType(3, 1)}
              className={typeVec?.type === 3 ? "active-btn" : ""}
            >
              Caminhão
            </button>
          </span>

          <select 
            name="select-vec-1" 
            id="select-vec-1"
            /*onChange={(e) => setSelectOp(e.target.value)}*/
          >
            <option value="todos">Todos</option>
            { data && <option value="favs">Favoritos</option> }
          </select>

          <nav>
            {
              typeVec && !currMarca && !currModel && typeVec?.marcas?.map(({codigo, nome}) => (
                <button 
                  key={codigo}
                  onClick={() => handleMarca(codigo, 1)}
                >
                  {nome}
                </button>
              ))
            }
            {
              currMarca && !currModel && currMarca?.arr?.modelos?.map(({codigo, nome}) => ([
                <button 
                  key={codigo}
                  onClick={() => handleModel(codigo, 1)}
                >
                  {nome}
                </button>
              ]))
            }
            {
              currModel && currModel?.arr?.map(({nome, codigo}) => (
                <button 
                  key={codigo}
                  onClick={() => handleYear(codigo, 1)}
                >
                  {nome}
                </button>
              ))
            }
          </nav>
          {
            currMarca &&
            <button onClick={() => handleFilter()}>
              <ion-icon name="arrow-back-outline"></ion-icon>
            </button>
          } 

          <button
            id="clean-vehicle-card"
            onClick={() => cleanVehicle()}
          >
            Limpar veículo selecionado
          </button>
        </aside>
        <section id="compare-section">
          <CompareCard 
            id={1}
            vehicle={vehicle1} 
            setVehicle={setVehicle1}
            type={typeVec?.type}
            datasCompare={datasCompare}
          />
          <CompareCard 
            id={2}
            vehicle={vehicle2} 
            setVehicle={setVehicle2}
            type={typeVec?.type}
            datasCompare={datasCompare}
          />
        </section>
      </main>
    </Wrapper>
  )
}

export default ComparePage