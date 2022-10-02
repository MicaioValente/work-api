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
import { ClientePost, ClientesService, ClientesServiceCreate } from './service';
import { Button, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

export default function exporta() {
  const [clientes, setClientes] = useState<{ name: string; id: string }[]>();
  const [loading, setLoading] = useState<Boolean>(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: ClientePost) => {
    setLoading(true);
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
  console.log(loading);
  return (
    <>
      <Container>
        <Banner />
      </Container>
      <Content>
        <Loading loading={loading} setLoading={setLoading}>
          <FormC
            formC={form}
            clientes={clientes}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          />
        </Loading>

        <ContainerButtom>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: '100%' }}
            onClick={() => navigate('/')}
            danger
          >
            Criar Cliente
          </Button>
        </ContainerButtom>
      </Content>
    </>
  );
}
