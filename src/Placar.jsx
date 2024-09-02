import './Placar.css';

const Placar = ({vitoriasO, vitoriasX}) => {    
    return (
      <div>
        <table className="table table-dark">
          <thead>
            <tr>
              <th colSpan={2} className="titulo">Placar</th>
            </tr>
          </thead>
          <tbody>
            <tr className="">
              <td>Jogador X</td>
              <td>Jogador O</td>
            </tr>
            <tr>
              <td>{vitoriasX}</td>
              <td>{vitoriasO}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
};
export default Placar;