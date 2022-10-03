import { useEffect, useState } from 'react';
import {
  Container,
  ContainerButtom,
  Content,
  ContainerBack
} from './styles';
import Banner from '../../components/Banner';
import { toast } from 'react-toastify';
import { ClientePost, ClientesService, ClientesServiceCreate } from './service';
import { useNavigate } from 'react-router-dom';
import { Button, DatePicker, Form, FormInstance, InputNumber } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import Loading from '../../components/Loading';
import { ContainerLogin, Image } from './styles';
import Header from './../../assets/header.svg';
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

export default function Home() {
  const [clientes, setClientes] = useState<{ name: string; id: string, _Id: string }[]>();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<Boolean>(false);
  const [timerTool, setTimerTool] = useState<string>('');
  const { Option } = Select;

  const onFinish = async (values: ClientePost) => {
    setLoading(true)
    values.finalContrato = values.finalContrato.toISOString()
    values.inicioContrato = values.inicioContrato.toISOString()
    values.quantidadeHoras = values.quantidadeHoras.toString()
    try {
      const response: any = await ClientesServiceCreate(values);
      setLoading(false)
      if (response.status === 200) {
        toast.success('Cliente Salvo');
        form.resetFields();
      } else {
        setLoading(false)
        toast.error('Erro ao Criar Cliente Salvo');

      }
    } catch {
      setLoading(false)
      toast.error('Erro ao Criar Cliente Salvo');

    }

  };
  const onChangeTool = (e: any) => {
    setLoading(true)
    setTimerTool(e)
  };
  useEffect(() => {
    (async () => {
      if (timerTool) {
        console.log('get 1')
        const response: any = await ClientesService(timerTool);
        console.log('response', response.data)

        setLoading(false)

        setClientes(response.data);
      }
    })();
  }, [timerTool]);
  return (
    <>
      <Container>
        <Banner />
      </Container>
      <Content>
        <ContainerBack>
          <Loading loading={loading} setLoading={setLoading}>
            <ContainerLogin>
              <Image src={Header} alt="React Logo" />
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
              >
                <Form.Item
                  name="timer"
                  label="Timer Tool"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Selecione um Contrato"
                    filterOption={(input, option) =>
                      (option!.children as unknown as string)
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    onChange={(e) => onChangeTool(e)}
                  >
                    <Option value="clockfy">Clockfy</Option>
                    <Option value="moviedesk">Moviedesk</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="nome"
                  label="Cliente"
                  rules={[{ required: true, message: 'Insita o cliente' }]}
                >
                  <Select
                    showSearch
                    placeholder="Selecione um cliente"
                    filterOption={(input, option) =>
                      (option!.children as unknown as string)
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {clientes?.map(item => {
                      return <Option key={item._Id} value={item.id}>{item.name}</Option>
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="tipoContrato"
                  label="Tipo de Contrato"
                  rules={[{ required: true, message: 'Insira o tipo de contrato' }]}
                >
                  <Select
                    showSearch
                    placeholder="Selecione um Contrato"
                    filterOption={(input, option) =>
                      (option!.children as unknown as string)
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    <Option value="lucy">Tipo 1 : Semanal</Option>
                    <Option value="lucy1">Tipo 2 : Mensal</Option>
                    <Option value="lucy2">Tipo 3 : Trimensal</Option>
                    <Option value="lucy3">Tipo 4 : Anual</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="inicioContrato"
                  rules={[{ required: true, message: 'Insira data de inicio!' }]}
                  label="Comeco Contrato"
                >
                  <DatePicker format={'DD/MM/YYYY'} />
                </Form.Item>
                <Form.Item
                  name="finalContrato"
                  rules={[{ required: true, message: 'Insira data Final!' }]}
                  label="Final Contrato"
                >
                  <DatePicker format={'DD/MM/YYYY'} />
                </Form.Item>
                <Form.Item
                  name="quantidadeHoras"
                  rules={[{ required: true, message: 'Insira a quantidade de horas!' }]}
                  label="Quantidade de horas cadastradas"
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    Salvar
                  </Button>
                </Form.Item>
              </Form>
            </ContainerLogin>
          </Loading>
        </ContainerBack>

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
