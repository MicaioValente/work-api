import { useEffect, useState } from 'react';
import {
  Container,
  ContainerBack,
  ContainerButtom,
  ContainerTable,
  Content,
} from './styles';
import Banner from '../../components/Banner';
import {
  getNormalClientes,
  deleteClientById,
  getMovieDeskClientes,
  getClockiFyClientes,
} from './service';
import Loading from '../../components/Loading';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import TableC from './table';
import { toast } from 'react-toastify';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
export type Cliente = {
  clientId: string;
  nome: string;
  tipoContrato: string;
  inicioContrato: string;
  finalContrato: string;
  quantidadeHoras: number;
  _Id: string;
};

export default function Listagem() {
  const [loading, setLoading] = useState<Boolean>(false);
  const [clientes, setClientes] = useState<Cliente[]>([] as Cliente[]);
  const navigate = useNavigate();

  const NormalClientes = async () => {
    setLoading(true);
    try {
      const response = await getNormalClientes();
      if (response.status === 200) {
        response.data.sort((x: Cliente, y: Cliente) => {
          let a = x.nome.toUpperCase(),
            b = y.nome.toUpperCase();
          return a == b ? 0 : a > b ? 1 : -1;
        });

        setClientes(response.data);
        setLoading(false);
      }
    } catch {
      setLoading(false);
      toast.success('Nao foi possivel buscar clientes');
    }
  };

  const DeleteClientById = async (clientId: string) => {
    setLoading(true);
    try {
      const response = await deleteClientById(clientId);
      if (response.status === 200) {
        setLoading(false);
        toast.success('Cliente apagado com sucesso');
        setClientes(clientes.filter((e) => e._Id !== clientId));
      }
    } catch {
      setLoading(false);
      toast.success('Cliente nao foi apagado ');
    }
  };

  const MovieDeskClientes = async () => {
    const response = await getMovieDeskClientes();
    try {
      const response = await getMovieDeskClientes();
    } catch {}
  };

  const ClockiFyClientes = async () => {
    try {
      const response = await getClockiFyClientes();
    } catch {}
  };

  useEffect(() => {
    (() => {
      NormalClientes();
    })();
  }, []);

  return (
    <>
      <Container>
        <Banner />
      </Container>
      <Content>
        <ContainerBack>
          <Loading loading={loading} setLoading={setLoading}>
            <ContainerTable>
              <TableC data={clientes} deleteCliente={DeleteClientById} />
            </ContainerTable>
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
