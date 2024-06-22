import Button from '../../components/Button';
import Container from '../../components/Container';
import Input from '../../components/Input';
import * as C from './style';
import managerProjectImg from '../../assets/images/managerproject.png';

const Identification: React.FC = () => {
  return (
    <Container background="light">
      <C.Card>
        <C.Form>
          <Input id="login" label="Login" />
          <Input id="password" label="Senha" />
          <Button fullWidth color='submit'>Entrar</Button>
        </C.Form>
        <C.DivInfo>
          <img src={managerProjectImg} alt="img" />
        </C.DivInfo>
      </C.Card>
    </Container>
  );
};

export default Identification;
