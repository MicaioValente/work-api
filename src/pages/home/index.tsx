import { useEffect, useState } from 'react';
import {
  Container,
  ContainerButtom,
  ContainerLogin,
  Content,
  Image,
} from './styles';
import Banner from '../../components/Banner';
import FormC from './form';
import Header from './../../assets/header.svg';
import { toast } from 'react-toastify';
import { ClientePost, ClientesService, ClientesServiceCreate } from './service';
import { Button, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

export default function Home() {
  const [clientes, setClientes] = useState<{ name: string; id: string }[]>();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<Boolean>(false);

  const onFinish = async (values: ClientePost) => {
    form.resetFields();
    console.log(111);
    // const response: any = await ClientesServiceCreate(values);
    // if (response.status === 200) {
    //   toast.success('Cliente Salvo');
    //   form.resetFields();
    // }
  };

  useEffect(() => {
    (async () => {
      const response: any = ClientesService();
      setClientes(response.data);
    })();
  }, []);

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
              formC={form}
              clientes={clientes}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            />
          </ContainerLogin>
        </Loading>

        <ContainerButtom>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: '100%' }}
            onClick={() => navigate('/exporta')}
            danger
          >
            exporta
          </Button>
        </ContainerButtom>
      </Content>
    </>
  );
}
