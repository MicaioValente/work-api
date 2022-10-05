import { useEffect, useState } from 'react';
import {
  Container,
  ContainerButtom,
  ContainerLogin,
  Content,
  Image,
} from './styles';
import Banner from '../../components/Banner';
import {
  ClientePost,
  ClientesService,
  ClientesServiceCreate,
  SubTitleClinteService,
} from './service';
import { Button, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { DatePicker } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { ContainerBack } from './styles';
import Header from './../../assets/header.svg';
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

export default function exporta() {
  const [clientes, setClientes] =
    useState<{ name: string; id: string; _Id: string }[]>();
  const [loading, setLoading] = useState<Boolean>(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const [timerTool, setTimerTool] = useState<string>('');
  const [subTitleClinte, setSubTitleClinte] = useState<string[]>();
  const [timerToolDoc, setTimerToolDoc] = useState<string>('');
  const [clientSelected, setClientSelected] = useState<string>('');
  const [tool, setTool] = useState<string>('');

  const onFinish = async (values: ClientePost) => {
    values.startDay = values.startDay.toISOString();
    values.endDay = values.endDay.toISOString();
    console.log('values', values);
    setLoading(true);
    try {
      const response: any = await ClientesServiceCreate(
        values,
        timerToolDoc,
        tool
      );
      setLoading(false);
      console.log('response', response);
      if (response.status === 200) {
        console.log('realtorio');

        // saveAs(response.data, 'relatorio');
        try {
          saveAs(response.data, 'image.xlsx');
        } catch (e) {
          console.log('error', e);
        }
        //  toast.success('Cliente Salvo');
        // form.resetFields();
      }
    } catch {
      setLoading(false);
    }
  };
  useEffect(() => {
    (async () => {
      if (timerTool) {
        const response: any = await ClientesService(timerTool);
        setLoading(false);
        setClientes(response.data);
      }
    })();
  }, [timerTool]);

  useEffect(() => {
    (async () => {
      if (timerTool) {
        const response: any = await ClientesService(timerTool);
        setLoading(false);
        setClientes(response.data);
      }
    })();
  }, [timerTool]);

  // useEffect(() => {
  //   (async () => {
  //     if (subTitleClinte) {
  //       const response: any = await SubTitleClinteService(
  //         timerTool,
  //         clientSelected
  //       );
  //       setLoading(false);
  //       setSubTitleClinte(response.data);
  //     }
  //   })();
  // }, [subTitleClinte]);

  const onChangeTimerTool = (e: any) => {
    setLoading(true);
    setTimerTool(e);
    if (e === 'clockfy') {
      setTimerToolDoc('clockify');
    } else {
      setTimerToolDoc(e);
    }
  };

  const onChangeTool = (e: any) => {
    setTool(e);
  };

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
                    onChange={(e) => onChangeTimerTool(e)}
                  >
                    <Option value="clockfy">Clockfy</Option>
                    <Option value="moviedesk">Moviedesk</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="cliente"
                  label="Cliente"
                  rules={[
                    { required: true, message: 'Please input your username!' },
                  ]}
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
                    {clientes?.map((item) => {
                      return (
                        <Option key={item._Id} value={item.id}>
                          {item.name}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="startDay"
                  rules={[
                    { required: true, message: 'Insira data de inicio!' },
                  ]}
                  label="Inicio"
                >
                  <DatePicker format={'DD/MM/YYYY'} />
                </Form.Item>
                <Form.Item
                  name="endDay"
                  rules={[{ required: true, message: 'Insira data Final!' }]}
                  label="Final"
                >
                  <DatePicker format={'DD/MM/YYYY'} />
                </Form.Item>
                <Form.Item
                  name="tool"
                  label="Ferramenta"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Selecione um Ferramenta"
                    filterOption={(input, option) =>
                      (option!.children as unknown as string)
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    onChange={(e) => onChangeTool(e)}
                  >
                    <Option value="excel">Excel</Option>
                    <Option value="pdf">PDF</Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: '100%' }}
                  >
                    Baixar
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
