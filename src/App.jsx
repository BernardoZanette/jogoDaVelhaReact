import { useState } from 'react'
import Jogo from './Jogo.jsx'
import Modal from './Modal.jsx'
import Placar from './Placar.jsx'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [quadrados, setQuadrados] = useState(Array(9).fill(null));
  const [turno, setTurno] = useState('X');
  const [showModal, setShowModal] = useState(false);
  const [vitoriasX, setVitoriasX] = useState(0);
  const [vitoriasO, setVitoriasO] = useState(0);
  let ganhou = false

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
    if (quadrados[index] !== null) return
    const novoVetor = [...quadrados]
    novoVetor[index] = turno
    setQuadrados(novoVetor)

    verificarVitoria(novoVetor);

    botJogar(novoVetor);
  };

  const verificarVitoria = (novoVetor) => {
    combosVitoria.forEach(combo => {
      const primeiro = novoVetor[combo[0]] 
      const segundo = novoVetor[combo[1]] 
      const terceiro = novoVetor[combo[2]]
      if (primeiro !== null && primeiro == segundo && segundo == terceiro) {
        turno == "X" ? setVitoriasX(vitoriasX+1) : setVitoriasO(vitoriasO+1) 
        setShowModal(true)
        ganhou = true;
      }
    });
  }

  const botJogar = (quadradosPosJogada) => {
    let indexesVazios = [];
    quadradosPosJogada.forEach((quadrado, index) => {
        if (quadrado == null) indexesVazios.push(index);
    });
    let jogadaIndex = Math.floor(Math.random()*indexesVazios.length);
    quadradosPosJogada[jogadaIndex] = "O";
    setQuadrados(quadradosPosJogada)
    if(!ganhou) setTurno(turno === "X" ? "O" : "X");
  }

  const handleJogarNovamente = () => {
    setQuadrados(Array(9).fill(null));
    setTurno('X');
    setShowModal(false);
  };

  return (
    <div>
      <Placar vitoriasO={vitoriasO} vitoriasX={vitoriasX}/>
      <Jogo quadrados={quadrados} clique={handleJogar}/>
      <Modal mostrar={showModal} vencedor={turno} onJogarNovamente={handleJogarNovamente}/>
    </div>
  )
}

export default App