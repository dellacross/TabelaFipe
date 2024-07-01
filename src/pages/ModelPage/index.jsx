import React, { useState, useEffect, useCallback } from 'react'
import './styles.css'
import Wrapper from '../../parts/Wrapper'
import { api } from '../../services/api'
import { favorite, disfavorite } from '../../services/functions'
import axios from 'axios'

const ModelPage = () => {

    const [fav, setFav] = useState(false)
    const [model, setModel] = useState(null)
    const [allModels, setAllModels] = useState([])
    const [currentYear, setCurrentYear] = useState(null)
    const [currentModel, setCurrentModel] = useState(null)
    const [ipva, setIpva] = useState(null)
    const nomeMarca = sessionStorage.getItem("nomeMarca")
    const type = sessionStorage.getItem("tipo")
    const token = localStorage.getItem("token")
    const url = "http://fipefacil.pythonanywhere.com"

    useEffect(() => {
        let currentModel = sessionStorage.getItem("currentModel")
        setModel(JSON.parse(currentModel))
    }, [])

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

    const handleModels = useCallback(async (type, marca, modelYears) => {
        let modelCode = model?.codigo
        let url = "/" + type + "/marcas/" + marca + "/modelos/" + modelCode + "/anos/"
        if(modelYears) {
            let arr = []
            await Promise.all(modelYears.map(async ({codigo}) => {
                let currUrl = url + codigo
                try {
                    const response = await api.get(currUrl)
                    let obj = response.data
                    if(obj?.AnoModelo <= 2025) {
                        obj["Codigo"] = codigo
                        if(!currentYear && !currentModel) {
                            setCurrentYear(obj?.AnoModelo)
                            setCurrentModel(obj)  
                        } 
                        arr.push(obj)
                    }
                    currUrl = url
                } catch (err) {
                    console.error(err)
                }
            }))
            arr.sort((a,b) => b.AnoModelo - a.AnoModelo)
            setAllModels(arr)
        }
    }, [currentYear, currentModel, model])

    useEffect(() => {
        let marca = sessionStorage.getItem("marca")
        let modelCode = model?.codigo
        
        let url = "/" + type + "/marcas/" + marca + "/modelos/" + modelCode + "/anos"
        if(modelCode) {
            api
            .get(url)
            .then((response) => {
                //setModelsYears(response.data)
                handleModels(type, marca, response.data)
            })
            .catch((err) => console.error(err))
        }
    }, [model, handleModels, type])

    useEffect(() => {
        let arr = sessionStorage.getItem("favs")
        //console.log("cm", currentModel)

        if(arr && typeof(arr) !== 'string' && arr.findIndex((obj) => obj.CodigoFipe === currentModel?.CodigoFipe && obj.AnoModelo === currentModel?.AnoModelo) !== -1) setFav(true)
    }, [currentModel])

    useEffect(() => {
        let dados = JSON.parse(localStorage.getItem("dados"))
        let estado = dados?.estado
        let val = parsePrice(currentModel?.Valor)

        axios
        .post(`${url}/ipva`, {
            tipo: type,
            ano_id: currentYear,
            price: val,
            state: estado
        })
        .then((response) => {
            setIpva(response.data?.ipva)
            //console.log("res", response.data)
        })
        .catch((err) => console.error("err", err))
    }, [currentYear, currentModel?.Valor, type])

    const handleClick = (ano) => {
        let obj =  allModels.find(obj => obj.AnoModelo === ano)
        setCurrentModel(obj)
        setCurrentYear(ano)
    }

    const handleFav = () => {
        let type = sessionStorage.getItem("tipo")
        let marca = sessionStorage.getItem("marca")
        let modelCode = model?.codigo
        let codigo = currentModel?.Codigo

        let url = "/" + type + "/marcas/" + marca + "/modelos/" + modelCode + "/anos/" + codigo

        if(fav) disfavorite({vehicle_url: url})
        else favorite({vehicle_url: url, tipo_veiculo: type})

        setFav(!fav)
    }

    return (
        <Wrapper>
            <main id="vehicle-result-container">
                <div 
                    id="vehicle-photo-container"
                    className={"vehicle-"+type}
                >
                    {
                        token &&
                        <span onClick={() => handleFav()}>
                            {
                                fav ?
                                (<ion-icon name="heart"></ion-icon>)
                                :
                                (<ion-icon name="heart-outline"></ion-icon>)
                            }
                        </span>
                    }
                </div>
                <div id="vehicle-datas-container">
                    <header>{nomeMarca}&nbsp;<span>{allModels[0]?.Modelo}</span></header>
                    <div id="mobile-years-bar">
                        {
                            allModels && allModels?.map(({AnoModelo}) => (
                                <button 
                                    key={AnoModelo}
                                    className={currentYear === AnoModelo ? "active-btn":""}
                                    onClick={() => handleClick(AnoModelo)}
                                >
                                    {AnoModelo}
                                </button>
                            ))
                        }
                    </div>
                    <span><h6>Valor FIPE:</h6>{currentModel?.Valor}</span>
                    <span><h6>Valor IPVA:</h6>R$ {ipva}</span>
                    <span><h6>Ano:</h6>{currentModel?.AnoModelo}</span>
                    <span><h6>Combustível:</h6>{currentModel?.Combustivel}</span>
                    <span><h6>Mês de Referência:</h6>{currentModel?.MesReferencia}</span>
                    <span><h6>Código FIPE:</h6>{currentModel?.CodigoFipe}</span>
                </div>
                <div id="years-btns-container">
                    {
                        allModels && allModels?.map(({AnoModelo}) => (
                            <button 
                                key={AnoModelo}
                                className={currentYear === AnoModelo ? "active-btn":""}
                                onClick={() => handleClick(AnoModelo)}
                            >
                                {AnoModelo}
                            </button>
                        ))
                    }
                </div>
            </main>
        </Wrapper>
    )
}

export default ModelPage