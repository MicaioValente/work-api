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
    setLoading(true)
    if (values.email && values.password) {
      await LoginService(values, navigate);
      return
    }
    setLoading(false)
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
            <FormC
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            />
          </ContainerLogin>
        </Loading>
      </Content>
    </>
  );
}
