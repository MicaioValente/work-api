import { Container, ContainerLogin, Image } from './styles';
import Banner from '../../components/Banner';
import FormC from './form';
import Header from './../../assets/header.svg';
import { toast } from 'react-toastify';
import LoginService from './service';
import { useNavigate } from 'react-router-dom';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

export default function Login() {
  const navigate = useNavigate();
  const onFinish = async (values: { email: string; password: string }) => {
    if (values.email && values.password) {
      const response: any = await LoginService(values);
      navigate('/');
      if (response.status === 200) {
        navigate('/');
      }
    } else {
      toast.error('Digite email ou senha');
    }
  };

  return (
    <>
      <Container>
        <Banner />
      </Container>
      <ContainerLogin>
        <Image src={Header} alt="React Logo" />
        <FormC onFinish={onFinish} onFinishFailed={onFinishFailed} />
      </ContainerLogin>
    </>
  );
}
