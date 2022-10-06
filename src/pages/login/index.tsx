import { Container, ContainerLogin, Content, Image } from './styles';
import Banner from '../../components/Banner';
import FormC from './form';
import Header from './../../assets/header.svg';
import { toast } from 'react-toastify';
import LoginService from './service';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { useState } from 'react';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

export default function Login() {
  const [loading, setLoading] = useState<Boolean>(false);
  const navigate = useNavigate();
  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    if (values.email && values.password) {
      try {
        const response: any = await LoginService(values);
        setLoading(false);
        if (response?.status === 200) {
          console.log(3);
          localStorage.setItem('@user', JSON.stringify(response.data));
          return navigate('/home');
        } else {
          toast.error('Digite email ou senha');
        }
      } catch {
        console.log(4);
        setLoading(false);
        toast.error('Erro inesperado');
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Container>
        <Banner />
      </Container>
      <Content>
        <Loading loading={loading} setLoading={setLoading}>
          <ContainerLogin>
            <Image src={Header} alt="React Logo" />
            <FormC onFinish={onFinish} onFinishFailed={onFinishFailed} />
          </ContainerLogin>
        </Loading>
      </Content>
    </>
  );
}
