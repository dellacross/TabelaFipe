import React, { useState, useEffect } from 'react'
import './styles.css'
import Wrapper from '../../parts/Wrapper'
import LoadingSpin from '../../components/LoadingSpin'
import SelectUF from '../../components/SelectUF'

const Profile = () => {

  const [uf, setUF] = useState(null)
  const [dados, setDados] = useState(null)

  useEffect(() => {
    if(!dados) {
      let dados_JSON = JSON.parse(localStorage.getItem("dados"))
      setDados(dados_JSON)
      setUF(dados_JSON?.estado)
    }
  }, [dados])

  return (
    <Wrapper>       
      <main>
        {
          dados && uf &&
          <section className="profile-section">
            <div id="datas-card">
              <div id="profile-img" />
              <span><h5>Nome:&nbsp;</h5>{dados?.nome}</span>
              <span><h5>E-mail:&nbsp;</h5>{dados?.email}</span>
              <span>
                <h5>Estado:&nbsp;</h5>
                <SelectUF 
                  handleChange={setUF}
                  defaultValue={uf}
                />
              </span>
            </div>
          </section>
        }
        {
          dados &&
          <section className="profile-section">
            <div id="fav-cars-card">
              <h2>Favoritados</h2>
              <main>
                {
                  dados?.favorites && dados?.favorites?.map((item, index) => (
                    <span key={index}>{item?.vehicle_url}</span>
                  ))
                }
              </main>
            </div>
            <div id="updt-datas-card">
              <span>Atualizar Dados <ion-icon name="create-outline"></ion-icon></span>
            </div>
          </section>
        }
      </main>
      {
        (!dados || !uf) && 
        <LoadingSpin />
      }
    </Wrapper>
  )
}

export default Profile