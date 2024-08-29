import { useState } from 'react'
import Jogo from './Jogo.jsx'
import Modal from './Modal.jsx'
import './App.css'

function App() {
  const [quadrados, setQuadrados] = useState(Array(9).fill(null));
  const [turno, setTurno] = useState('X');
  const [vitoria, setVitoria] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const combosVitoria = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
  ]

  const handleJogar = (index) => {
    if (quadrados[index] !== null) return;
    const novoVetor = [...quadrados];
    novoVetor[index] = turno;
    setQuadrados(novoVetor);
    setTurno(turno === "X" ? "O" : "X");
    combosVitoria.forEach(combo => {
      const primeiro = novoVetor[combo[0]] 
      const segundo = novoVetor[combo[1]] 
      const terceiro = novoVetor[combo[2]]
      if (primeiro !== null && primeiro == segundo && segundo == terceiro) {
        setVitoria(1)
        setShowModal(true)
      }
    });
    console.log(showModal)
  };
  return (
    <div>
      <Jogo quadrados={quadrados} clique={handleJogar}/>
      <Modal mostrar={showModal}>
          <p>Modal</p>
      </Modal>
    </div>
  )
}

export default App