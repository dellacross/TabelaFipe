import React, { useEffect, useState } from 'react'
import './styles.css'
import ModelCard from '../../components/ModelCard'
import Wrapper from '../../parts/Wrapper'
import { api } from '../../services/api'

const SearchResultContainer = () => {

  const [models, setModels] = useState(null)
  const [model, setModel] = useState("")
  const nomeMarca = sessionStorage.getItem("nomeMarca")

  useEffect(() => {
    const getModels = () => {
      let type = sessionStorage.getItem("tipo")
      let marca = sessionStorage.getItem("marca")
  
      let url = "/" + type + "/marcas/" + marca + "/modelos"
  
      api
      .get(url)
      .then((response) => {
        setModels(response.data)
      })
      .catch((err) => console.error(err))
    }

    getModels()
  }, [])

  const handleDisplayCard = (nome) => {
    let lowerCaseName = nome.toLowerCase()
    let lowerCaseModel = model.toLowerCase()
    return lowerCaseName.startsWith(lowerCaseModel) || model === ""
  }

  return (
    <Wrapper>
      <main>
        <div id="result-container">
           <header>
              <span>{nomeMarca}</span>
              <input 
                type="text" 
                placeholder='Digite o nome do modelo'
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </header> 

            <div id="models-cards-container">
              {
                models && models?.modelos?.map(({codigo, nome}) => (
                  handleDisplayCard(nome) &&
                  <ModelCard 
                    key={codigo}
                    codigo={codigo}
                    nome={nome}
                  />
                ))
              }
            </div>
        </div>
      </main>
    </Wrapper>
  )
}

export default SearchResultContainer