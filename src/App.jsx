import { useEffect, useState } from 'react'
import Jogo from './Jogo.jsx'
import Modal from './Modal.jsx'
import Placar from './Placar.jsx'
import Dificuldade from './Dificuldade.jsx'
import Button from 'react-bootstrap/Button'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

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
  
  const [dificuldade, setDificuldade] = useState("Fácil");
  
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

  const getNumeroStorage = (key) => {
    const value = localStorage.getItem(key);
    return value ? parseInt(value, 10) : 0;
  };

  useEffect(() => {
    // Verifica se há dados no localStorage e os usa para definir os quadrados
    const jogo = localStorage.getItem('jogo');
    if (jogo) {
      setQuadrados(JSON.parse(jogo));
    }
    setVitoriasX(getNumeroStorage('vitoriasX'));
    setVitoriasO(getNumeroStorage('vitoriasO'));
    setEmpates(getNumeroStorage('empates'));
    setDificuldade(localStorage.getItem('dificuldade'));
    setJogadasJogador(getNumeroStorage('jogadas'));
  }, []); 

  const handleJogar = (index) => {
    if (quadrados[index] !== null) return

    const novoVetor = [...quadrados]
    novoVetor[index] = turno
    setQuadrados(novoVetor)
    setJogadasJogador(jogadasJogador+1);

    verificarVitoria(novoVetor);
    
    botJogar(novoVetor);  

    // armazenamento
    localStorage.setItem('jogo', JSON.stringify(novoVetor));
    localStorage.setItem('vitoriasX', vitoriasX);
    localStorage.setItem('vitoriasO', vitoriasO);
    localStorage.setItem('empates', empates);
    localStorage.setItem('dificuldade', dificuldade);
    localStorage.setItem('jogadas', jogadasJogador);
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
  }

  const impedirOuGanhar = (verificador, quadradosPosJogada, indexJogada) => {
    combosVitoria.forEach(combo => {
      if (indexJogada) return
      const primeiro = quadradosPosJogada[combo[0]];
      const segundo = quadradosPosJogada[combo[1]];
      const terceiro = quadradosPosJogada[combo[2]];

      if (
        (!primeiro || !segundo || !terceiro) &&
        ((primeiro == verificador && primeiro == segundo) ||
        (segundo == verificador && segundo == terceiro) || 
        (primeiro == verificador && primeiro == terceiro))
      ) {
          if (primeiro == verificador && primeiro == segundo) indexJogada = combo[2];
          if (segundo == verificador && segundo == terceiro) indexJogada = combo[0];
          if (primeiro == verificador && primeiro == terceiro) indexJogada = combo[1];

          if (!quadradosPosJogada[indexJogada]) {
            quadradosPosJogada[indexJogada] = "O"
          }
        }
    })
    if (indexJogada != null) return true;
    return false;
  }

  const botJogar = (quadradosPosJogada) => {

    if (ganhou) return;
    let indexesVazios = [];
    let indexJogada = null;
    let jogou = false;

    quadradosPosJogada.forEach((quadrado, index) => {
        if (quadrado == null) indexesVazios.push(index);
    });

    if (dificuldade == "Fácil") {
      indexJogada = Math.floor(Math.random()*indexesVazios.length);
      let jogada = indexesVazios[indexJogada];
      quadradosPosJogada[jogada] = "O";
    }
    else {
      // X pode ganhar? Então impede.
      jogou = impedirOuGanhar("X", quadradosPosJogada, indexJogada)

      // Não tem o que impedir, então: O pode ganhar? Então ganha.
      if (!jogou) jogou = impedirOuGanhar("O", quadradosPosJogada, indexJogada)

      // Não consegue ganhar, então joga aleatório. 
      if(!jogou) {
        indexJogada = Math.floor(Math.random()*indexesVazios.length);
        let jogada = indexesVazios[indexJogada];
        quadradosPosJogada[jogada] = "O";
      }
    }
    
    setQuadrados(quadradosPosJogada);
    
    verificarVitoria(quadradosPosJogada);
  }

  const resetarPlacar = () => {
    localStorage.removeItem("empates");
    localStorage.removeItem("vitoriasO");
    localStorage.removeItem("vitoriasX");
    setEmpates(0);
    setVitoriasO(0);
    setVitoriasX(0);
  }

  const handleJogarNovamente = () => {
    localStorage.removeItem('jogo');
    localStorage.removeItem('jogadas');
    localStorage.removeItem('dificuldade');
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
      <div className='divBotoes'>
        <Button id="resetarPlacar" onClick={resetarPlacar}>Resetar Placar</Button>
        <Button onClick={handleJogarNovamente}> Jogar Novamente </Button>
      </div>
      <Jogo quadrados={quadrados} clique={handleJogar}/>
      <Modal mostrar={showModal} empatou={empatou} vencedor={turno} onJogarNovamente={handleJogarNovamente} modalFechado={modalFechado} setModalFechado={setModalFechado}/>
      <Dificuldade dificuldade={dificuldade} setDificuldade={setDificuldade}/>
    </div>
  )
}

export default App