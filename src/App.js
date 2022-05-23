import {useState} from 'react';
import { FiSearch } from "react-icons/fi";
import './style.css';
import api from './services/api'
function App() {
  const[input, setInput] = useState ('')
  const [cep, setCep] = useState({})
  async function handleSearch(){
    if (input === ''){
    alert('Preencha um CEP válido!')
    return
  }
  try{
    const response = await api.get(`${input}/json`);
    setCep(response.data)
    setInput('')
  }catch{
    alert('Ops! Numero de CEP invalido. ')
    setInput('') //limpa o imput
  }
  
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
        <div className='conteinerInput'>
          <input type='text' value={input} onChange={(e) => setInput(e.target.value)} placeholder="Digite aqui seu CEP."/>
          
          <button className="buttonSearch" onClick={handleSearch}>
             <FiSearch size={20} color='#FFF'/>
          </button>
        </div>
        {Object.keys(cep).length > 0 && (
          <main className="main">
            <h2>CEP:{cep.cep}</h2>
            <span>{cep.logradouro}</span>
            <span>{cep.bairro}</span>
            <span>{cep.localidade} - {cep.uf}</span>
          </main>
        )}
        
    </div>
  );
}

export default App;
