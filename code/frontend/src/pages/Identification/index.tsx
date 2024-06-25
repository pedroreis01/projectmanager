import Button from '../../components/Button';
import Text from '../../components/Text';
import Container from '../../components/Container';
import Input from '../../components/Input';
import * as C from './style';
import managerProjectImg from '../../assets/images/managerproject.png';
import logo from '../../assets/images/logo.png';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import useAlert from '../../hooks/useAlert';
import { useAuth } from '../../hooks/useAuth';

const Identification: React.FC = () => {
  const { addAlert } = useAlert();
  const { signIn, signOut } = useAuth();
  const [formFieldsSignIn, setFormFieldsSignIn] = useState({
    login: '',
    password: '',
  });
  const [formFieldsSignUp, setFormFieldsSignUp] = useState({
    name: '',
    email: '',
    login: '',
    password: '',
  });
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    signIn(formFieldsSignIn.login, formFieldsSignIn.password)
    .finally(() => setIsLoading(false));
  };

  const handleSubmitSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api
      .post('user', {
        name: formFieldsSignUp.name,
        email: formFieldsSignUp.email,
        login: formFieldsSignUp.login,
        password: formFieldsSignUp.password,
      })
      .then(() => {
        addAlert({
          type: 'success',
          title: 'Cadastro realizado com sucesso',
          message: 'Faça login para prosseguir',
        });
        setStep(0);
      })
      .catch((error) => {
        addAlert({
          type: 'danger',
          title: 'Error ao realizar cadastro',
          message: error.response.data.message,
        });
      });
  };

  useEffect(() => signOut(), [signOut]);

  return (
    <Container background="white">
      <C.Logo>{/* <img src={logo} alt="logo" /> */}</C.Logo>
      <C.Content>
        <C.ContentForm>
          {step === 0 ? (
            <>
              <C.Form onSubmit={handleSubmitSignIn}>
                <C.FormTitle>
                  <Text fontSize="titleh2">Entrar</Text>
                  <Text fontSize="paragraph">
                    Entre para gerenciar seus projetos
                  </Text>
                </C.FormTitle>
                <Input
                  id="login"
                  label="Login"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormFieldsSignIn({
                      ...formFieldsSignIn,
                      login: e.target.value,
                    });
                  }}
                  value={formFieldsSignIn.login}
                />
                <Input
                  id="password"
                  label="Senha"
                  type="password"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormFieldsSignIn({
                      ...formFieldsSignIn,
                      password: e.target.value,
                    });
                  }}
                  value={formFieldsSignIn.password}
                />
                <Button fullWidth color="submit" isLoading={isLoading} type="submit">
                  Entrar
                </Button>
              </C.Form>
              <Text fontSize="small">
                Não possui uma conta?{' '}
                <C.Click onClick={() => setStep(1)}>Clique aqui</C.Click>
              </Text>
            </>
          ) : (
            <>
              <C.Form onSubmit={handleSubmitSignUp}>
                <C.FormTitle>
                  <Text fontSize="titleh2">Cadastrar</Text>
                  <Text fontSize="paragraph">
                    Cadastre para gerenciar seus projetos
                  </Text>
                </C.FormTitle>
                <Input
                  id="name"
                  label="Nome"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormFieldsSignUp({
                      ...formFieldsSignUp,
                      name: e.target.value,
                    });
                  }}
                  value={formFieldsSignUp.name}
                />
                <Input
                  id="email"
                  label="E-mail"
                  type="email"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormFieldsSignUp({
                      ...formFieldsSignUp,
                      email: e.target.value,
                    });
                  }}
                  value={formFieldsSignUp.email}
                />
                <Input
                  id="login"
                  label="Login"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormFieldsSignUp({
                      ...formFieldsSignUp,
                      login: e.target.value,
                    });
                  }}
                  value={formFieldsSignUp.login}
                />
                <Input
                  id="password"
                  label="Senha"
                  type="password"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFormFieldsSignUp({
                      ...formFieldsSignUp,
                      password: e.target.value,
                    });
                  }}
                  value={formFieldsSignUp.password}
                />
                <Button fullWidth color="submit" type="submit">
                  Cadastrar
                </Button>
              </C.Form>
              <Text fontSize="small">
                Já possui uma conta?{' '}
                <C.Click onClick={() => setStep(0)}>Clique aqui</C.Click>
              </Text>
            </>
          )}
        </C.ContentForm>
        <C.ContentImage>
          <img src={managerProjectImg} alt="img" />
        </C.ContentImage>
      </C.Content>
    </Container>
  );
};

export default Identification;
