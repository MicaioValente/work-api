import { Button, DatePicker, Form, FormInstance, InputNumber } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { Select } from 'antd';

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
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  // qtdDeHorasCadastradas: string;
  //  cliente: string;
  //   tipoDeContrato: string;
  //   startDay: string;
  //   endtDay: string;
  //   qtdDeHorasCadastradas: string;
  // };
  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={formC}
    >
      <Form.Item
        name="clinte"
        label="Cliente"
        rules={[{ required: false, message: 'Please input your username!' }]}
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
          <Option value="lucy">Ahgora</Option>
          <Option value="lucy1">Hitght</Option>
          <Option value="lucy2">My Amazon</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="tipoDeContrato"
        label="Tipo de Contrato"
        rules={[{ required: false, message: 'Please input your password!' }]}
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
        name="startDay"
        rules={[{ required: false, message: 'Insira data de inicio!' }]}
        label="Comeco Contrato"
      >
        <DatePicker format={'DD/MM/YYYY'} />
      </Form.Item>
      <Form.Item
        name="endDay"
        rules={[{ required: false, message: 'Insira data Final!' }]}
        label="Final Contrato"
      >
        <DatePicker format={'DD/MM/YYYY'} />
      </Form.Item>
      <Form.Item
        name="qtdDeHorasCadastradas"
        rules={[{ required: false, message: 'Insira a quantidade de horas!' }]}
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
  );
}
