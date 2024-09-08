import './Dificuldade.css';
import Form from 'react-bootstrap/Form';

const Dificuldade = ({dificuldade, setDificuldade}) => {

  const handleChange = (event) => {
    setDificuldade(event.target.value);
  };

  return(
    <Form.Select id="dificuldade" value={dificuldade} onChange={handleChange}>
      <option value={"Fácil"}>Fácil</option>
      <option value={"Difícil"}>Difícil</option>
    </Form.Select>
  )
};

export default Dificuldade;