import { useState } from 'react'
import Jogo from './Jogo.jsx'
import Modal from './Modal.jsx'
import Placar from './Placar.jsx'
import Button from 'react-bootstrap/Button';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [quadrados, setQuadrados] = useState(Array(9).fill(null));
  const [turno, setTurno] = useState('X');
  const [showModal, setShowModal] = useState(false);
  const [vitoriasX, setVitoriasX] = useState(0);
  const [vitoriasO, setVitoriasO] = useState(0);
  const [empates, setEmpates] = useState(0);
  const [jogadasJogador, setJogadasJogador] = useState(0);
  const [modalFechado, setModalFechado] = useState(false);
  const [empatou, setEmpatou] = useState(false);

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
    setJogadasJogador(jogadasJogador+1);
    
    botJogar(novoVetor);  
    
    verificarVitoria(novoVetor);
  };

  const verificarVitoria = (novoVetor) => {
    combosVitoria.forEach(combo => {
      const primeiro = novoVetor[combo[0]];
      const segundo = novoVetor[combo[1]];
      const terceiro = novoVetor[combo[2]];
      if (primeiro !== null && primeiro == segundo && segundo == terceiro) {
        primeiro == "X" ? setVitoriasX(vitoriasX+1) : setVitoriasO(vitoriasO+1);
        primeiro == "X" ? setTurno("X") : setTurno("O"); 
        setShowModal(true);
        ganhou = true;
      }
    });
    if(jogadasJogador == 4 && !ganhou) {
      setEmpates(empates+1);
      setEmpatou(true);
      setShowModal(true);
    }
    console.log(jogadasJogador)
  }

  const botJogar = (quadradosPosJogada) => {
    if (ganhou) return;
    let indexesVazios = [];
    quadradosPosJogada.forEach((quadrado, index) => {
        if (quadrado == null) indexesVazios.push(index);
    });
    let indexAleatorio = Math.floor(Math.random()*indexesVazios.length);
    let jogadaIndex = indexesVazios[indexAleatorio];
    quadradosPosJogada[jogadaIndex] = "O";
    setQuadrados(quadradosPosJogada)

    verificarVitoria(quadradosPosJogada)
  }

  const resetarPlacar = () => {
    setEmpates(0);
    setVitoriasO(0);
    setVitoriasX(0);
    handleJogarNovamente();
  }

  const handleJogarNovamente = () => {
    setQuadrados(Array(9).fill(null));
    setTurno('X');
    setEmpatou(false);
    setJogadasJogador(0);
    setModalFechado(false);
    setShowModal(false);
  };

  return (
    <div>
      <Placar vitoriasO={vitoriasO} vitoriasX={vitoriasX} empates={empates}/>
      <Button id="resetarPlacar" onClick={resetarPlacar}>Resetar Placar</Button>;
      <Jogo quadrados={quadrados} clique={handleJogar}/>
      <Modal mostrar={showModal} empatou={empatou} vencedor={turno} onJogarNovamente={handleJogarNovamente} modalFechado={modalFechado} setModalFechado={setModalFechado}/>
    </div>
  )
}

export default App