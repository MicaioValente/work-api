import { Button, DatePicker, Form, FormInstance, InputNumber } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import Loading from '../../components/Loading';
import { useState } from 'react';
import { ContainerBack, ContainerLogin, Image } from './styles';
import Header from './../../assets/header.svg';

export default function FormC({
  onFinish,
  onFinishFailed,
  clientes,
  formC,
}: {
  onFinish: any;
  onFinishFailed: any;
  clientes: { name: string; id: string }[] | undefined;
  formC: FormInstance;
}) {
  const [loading, setLoading] = useState<Boolean>(false);
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  // qtdDeHorasCadastradas: string;
  //  cliente: string;
  //   tipoDeContrato: string;
  //   startDay: string;
  //   endtDay: string;
  //   qtdDeHorasCadastradas: string;
  // };
  const onChangeTool = () => {
    console.log(1111);
    setLoading(!loading);
    setTimeout(() => {
      console.log(222);
      setLoading(false);
    }, 1000);
  };
  return (
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
            form={formC}
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
                onChange={(e) => onChangeTool()}
              >
                <Option value="clockify">Clockify</Option>
                <Option value="movidesk">Movidesk</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="clinte"
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
                <Option value="Ahgora">Ahgora</Option>
                <Option value="Hitght">Hitght</Option>
                <Option value="My Amazon">My Amazon</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="startDay"
              rules={[{ required: true, message: 'Insira data de inicio!' }]}
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
  );
}
