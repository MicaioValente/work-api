import { useEffect, useState } from 'react';
import { Container, ContainerButtom, Content, ContainerBack } from './styles';
import Banner from '../../components/Banner';
import { toast } from 'react-toastify';
import { putCliente, ClientesService } from './service';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, DatePicker, Form, FormInstance, InputNumber } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import Loading from '../../components/Loading';
import { ContainerLogin, Image } from './styles';
import Header from './../../assets/header.svg';
import moment from 'moment';
import { DataType } from '../listagem/table';
import { ClientePost } from '../home/service';

const onFinishFailed = (errorInfo: any) => {};

export default function edicao({ home }: any) {
  const { state }: { state: DataType } = useLocation();
  const [clientes, setClientes] =
    useState<{ name: string; id: string; _Id: string }[]>();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<Boolean>(false);
  const [cliente, setCliente] = useState();
  const [timerTool, setTimerTool] = useState<string>('moviedesk');
  const [tipoContrato, setTipoContrato] = useState<string>();
  const [dataFinal, setDataFinal] = useState<moment.Moment>();
  const [dataInicio, setDataInicio] = useState<moment.Moment>();
  const { Option } = Select;
  useEffect(() => {
    form.setFieldsValue({
      nome: state.nome,
      tipoContrato: state.tipoContrato,
      inicioContrato: moment(state.inicioContrato),
      finalContrato: moment(state.finalContrato),
      quantidadeHoras: state.quantidadeHoras,
      dataRenovacao: moment(state.dataRenovacao),
    });
  }, []);

  const onFinish = async (values: ClientePost) => {
    console.log(values);
    let putClientData = {
      id: state._Id,
      clientId: clientes?.filter((e) => e.name === values.nome)[0].id,
      nome: values.nome,
      tipoContrato: values.tipoContrato,
      dataRenovacao: values.dataRenovacao?.toISOString(),
      inicioContrato: values.inicioContrato?.toISOString(),
      finalContrato: values.finalContrato?.toISOString(),
      quantidadeHoras: values.quantidadeHoras,
    };

    try {
      const response: any = await putCliente(putClientData);
      setLoading(false);
      if (response.status === 200) {
        toast.success('Cliente Editado');
        form.resetFields();
        navigate('/listagem');
      } else {
        setLoading(false);
        toast.error('Erro ao Editar Cliente');
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      toast.error('Erro ao Editar Cliente');
    }

    console.log({ putClientData });
    // setLoading(true);
    // values.finalContrato = values.finalContrato.toISOString();
    // values.inicioContrato = dataInicio?.toISOString();
    // values.quantidadeHoras = values.quantidadeHoras.toString();
    // values.dataRenovacao = values.dataRenovacao.toISOString();
    // let nome = {
    //   clientId: clientes?.filter((e) => e.name === values.nome)[0].id,
    // };
    // let dataC = Object.assign(nome, values);
    // console.log('data', dataC);

    // try {
    //   const response: any = await ClientesServiceCreate(dataC);
    //   setLoading(false);
    //   if (response.status === 200) {
    //     toast.success('Cliente Salvo');
    //     form.resetFields();
    //     setTimerTool('');
    //   } else {
    //     setLoading(false);
    //     toast.error('Erro ao Criar Cliente Salvo');
    //   }
    // } catch (e) {
    //   setLoading(false);
    //   toast.error('Erro ao Criar Cliente Salvo');
    // }
  };
  const onChangeTool = (e: any) => {
    setLoading(true);
    setTimerTool(e);
  };

  useEffect(() => {
    (async () => {
      if (timerTool) {
        const response: any = await ClientesService(timerTool);
        let Novos: any = [];
        if (timerTool === 'moviedesk') {
          response.data.forEach((item: any) => {
            if (item.nome) {
              Novos.push({
                name: item.nome,
                id: item.clienteId,
                _Id: item._Id,
              });
            }
          });
          Novos.sort((x: any, y: any) => {
            let a = x.name.toUpperCase(),
              b = y.name.toUpperCase();
            return a == b ? 0 : a > b ? 1 : -1;
          });
          setLoading(false);

          setClientes(Novos);
          return;
        }

        setLoading(false);

        setClientes(response.data);
      }
    })();
  }, [timerTool]);

  const InitialDate = (e: moment.Moment | null) => {
    if (e) {
      setDataInicio(e);
    }
  };
  useEffect(() => {
    console.log('dataInicio 2 ', dataInicio?.toISOString());
    let data = moment(dataInicio);
    switch (tipoContrato) {
      case '1':
        setDataFinal(data?.add(1, 'M'));
        form.setFieldValue('finalContrato', data);
        break;
      case '2':
        setDataFinal(data?.add(3, 'M'));
        form.setFieldValue('finalContrato', data);
        break;
      case '3':
        setDataFinal(data?.add(6, 'M'));
        form.setFieldValue('finalContrato', data);
        break;
      case '4':
        setDataFinal(data?.add(12, 'M'));
        form.setFieldValue('finalContrato', data);
        break;
      default:
        break;
    }
  }, [dataInicio]);
  console.log('dataInicio', dataInicio?.toISOString());

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
                {/* <Form.Item
                  name="timer"
                  label="Timer Tool"
                  // rules={[{ required: true, message: 'Insira o timer tool' }]}
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
                    defaultValue="moviedesk"
                  >
                    <Option value="clockfy">Clockify</Option>
                    <Option value="moviedesk">MoviDesk</Option>
                  </Select>
                </Form.Item> */}
                <Form.Item
                  name="nome"
                  label="Cliente"
                  rules={[{ required: true, message: 'Insita o cliente' }]}
                >
                  <Select
                    showSearch
                    disabled
                    placeholder="Selecione um cliente"
                    filterOption={(input, option) =>
                      (option!.children as unknown as string)
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {clientes?.map((item) => {
                      return (
                        <Option key={item._Id} value={item.name}>
                          {item.name}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="tipoContrato"
                  label="Tipo de Contrato"
                  rules={[
                    { required: true, message: 'Insira o tipo de contrato' },
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
                    onChange={(e) => setTipoContrato(e)}
                  >
                    <Option value="1">Tipo 1 : Mensal</Option>
                    <Option value="2">Tipo 2 : Trimensal</Option>
                    <Option value="3">Tipo 3 : Semestral</Option>
                    <Option value="4">Tipo 4 : Anual</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="inicioContrato"
                  rules={[
                    { required: true, message: 'Insira data de inicio!' },
                  ]}
                  label="Comeco Contrato"
                >
                  <DatePicker
                    onChange={(e) => InitialDate(e)}
                    defaultValue={dataInicio}
                    format={'DD/MM/YYYY'}
                  />
                </Form.Item>
                <Form.Item
                  name="finalContrato"
                  rules={[{ required: true, message: 'Insira data Final!' }]}
                  label="Final Contrato"
                >
                  <DatePicker defaultValue={dataFinal} format={'DD/MM/YYYY'} />
                </Form.Item>
                <Form.Item
                  name="dataRenovacao"
                  rules={[
                    {
                      required: true,
                      message: 'Insira a de Atulização Contrato!',
                    },
                  ]}
                  label="Atulização Contrato"
                >
                  <DatePicker format={'DD/MM/YYYY'} />
                </Form.Item>
                <Form.Item
                  name="quantidadeHoras"
                  rules={[
                    {
                      required: true,
                      message: 'Insira a quantidade de horas!',
                    },
                  ]}
                  label="Quantidade de horas cadastradas"
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: '100%' }}
                  >
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
            style={{ width: '100%', marginTop: '10px' }}
            onClick={() => navigate('/listagem')}
          >
            Listagem
          </Button>
        </ContainerButtom>
      </Content>
    </>
  );
}
