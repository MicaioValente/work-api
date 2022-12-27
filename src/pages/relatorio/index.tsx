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
  clientsService,
  clientsServiceCreate,
  dowloadWithProjectService,
  ProjectsClinteService,
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
import { Projects } from '../../models';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

export default function relatorio() {
  const [clients, setClients] =
    useState<{ name: string; id: string; _Id: string }[]>();
  const [loading, setLoading] = useState<Boolean>(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const [timerTool, setTimerTool] = useState<string>('');
  const [projects, setProjects] = useState<Projects[]>();
  const [timerToolDoc, setTimerToolDoc] = useState<string>('');
  const [clientSelected, setClientSelected] = useState<string>('');
  const [tool, setTool] = useState<string>('');
  const [client, setClient] = useState<string>('');

  const dowloadExcel = (data: any) => {
    try {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${Date.now()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      setTimerTool('');
      form.resetFields();

      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast.error('Erro ao baixar excel');
    }
  };

  const dowloadPDF = (values: any) => {
    try {
      const file = new Blob([values], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = fileURL;
      link.download = 'fileName.pdf';
      link.click();
      URL.revokeObjectURL(fileURL);
      setTimerTool('');

      form.resetFields();

      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast.error('Erro ao baixar pdf');
    }
  };

  const dowloadWithProject = async (values: ClientePost) => {
    try {
      const response = await dowloadWithProjectService(
        values.tool,
        values.cliente,
        values.startDay,
        values.endDay,
        values.project
      );
      if (values.tool === 'excel') {
        dowloadExcel(response.data);
        return;
      }
      dowloadPDF(response.data);
    } catch (e) {
      toast.error('Erro ao buscar relatorio');
    }
  };

  const dowloadNormal = async (values: ClientePost) => {
    try {
      const response = await clientsServiceCreate(
        values,
        values.timer,
        values.tool
      );

      if (values.tool === 'excel') {
        dowloadExcel(response.data);
        return;
      }
      dowloadPDF(response.data);
    } catch {}
  };

  const onFinish = async (values: ClientePost) => {
    values.startDay = values.startDay.toISOString();
    values.endDay = values.endDay.toISOString();
    setLoading(true);
    if (values?.project) {
      dowloadWithProject(values);
    } else {
      dowloadNormal(values);
    }
  };

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

  useEffect(() => {
    (async () => {
      if (timerTool) {
        try {
          const response: any = await clientsService(timerTool);
          setLoading(false);
          setClients(response.data);
        } catch {
          toast.error('Erro ao selecionar Timer Tool  ');
          setLoading(false);
        }
      }
    })();
  }, [timerTool]);

  useEffect(() => {
    (async () => {
      if (timerTool) {
        const response: any = await clientsService(timerTool);
        setLoading(false);
        setClients(response.data);
      }
    })();
  }, [timerTool]);

  useEffect(() => {
    (async () => {
      if (clientSelected && timerTool) {
        try {
          const response: any = await ProjectsClinteService(clientSelected);
          setLoading(false);
          setProjects(response.data);
        } catch {
          toast.error('Erro ao buscar projetos');
        }
      }
    })();
  }, [clientSelected]);

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
                  rules={[{ required: true, message: 'Insira um Timer Tool!' }]}
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
                    <Option value="clockfy">Clockify</Option>
                    <Option value="moviedesk">MoviDesk</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="cliente"
                  label="Cliente"
                  rules={[{ required: true, message: 'insira um cliente' }]}
                >
                  <Select
                    showSearch
                    placeholder="Selecione um cliente"
                    filterOption={(input, option) =>
                      (option!.children as unknown as string)
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    onChange={(e) => setClientSelected(e)}
                  >
                    {clients?.map((item) => {
                      return (
                        <Option key={item._Id} value={item.id}>
                          {item.name}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  rules={[{ required: false, message: 'Insira um projeto' }]}
                  name="project"
                  label="Projeto"
                >
                  <Select
                    showSearch
                    placeholder="Selecione um cliente"
                    filterOption={(input, option) =>
                      (option!.children as unknown as string)
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    onChange={(e) => setClient(e)}
                    defaultValue="all"
                  >
                    <Option value={'all'}>Todos</Option>
                    {projects?.map((item) => {
                      return (
                        <Option key={item._Id} value={item._Id}>
                          {item.projectName}
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
                  rules={[{ required: true, message: 'Insira uma Ferramenta' }]}
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
            onClick={() => navigate('/home')}
            danger
          >
            Criar Cliente
          </Button>
        </ContainerButtom>
      </Content>
    </>
  );
}
