import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { Cliente } from '.';

interface DataType {
  nome: string;
  tipoContrato: string;
  inicioContrato: string;
  finalContrato: string;
  quantidadeHoras: number;
  clientId: string;
  _Id: string;
}

type DataIndex = keyof DataType;

const TableC = ({
  deleteCliente,
  data,
}: {
  deleteCliente: Function;
  data: DataType[];
}) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
      width: '30%',
      ...getColumnSearchProps('nome'),
    },
    {
      title: 'Tipo de contrato',
      dataIndex: 'tipoContrato',
      key: 'tipoContrato',
      width: '20%',
      ...getColumnSearchProps('tipoContrato'),
      render: (item: string) => {
        switch (item) {
          case '1':
            return 'Mensal';
          case '2':
            return 'Trimensal';
          case '3':
            return 'Semestral';
          case '4':
            return 'Anual';
          default:
            break;
        }
      },
    },
    {
      title: 'Inicio Contrato',
      dataIndex: 'inicioContrato',
      key: 'inicioContrato',
      ...getColumnSearchProps('inicioContrato'),
      render: (item: string) => {
        return moment(item).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Final Contrato',
      dataIndex: 'finalContrato',
      key: 'finalContrato',
      ...getColumnSearchProps('finalContrato'),
      render: (item: string) => {
        return moment(item).format('DD/MM/YYYY');
      },
    },
    {
      title: 'QTD de Horas',
      dataIndex: 'quantidadeHoras',
      key: 'quantidadeHoras',
      ...getColumnSearchProps('quantidadeHoras'),
      sorter: (a, b) => a.quantidadeHoras - b.quantidadeHoras,
      sortDirections: ['descend', 'ascend'],
      render: (item: string) => {
        return <a>{item}</a>;
      },
    },
    {
      title: 'Ações',
      dataIndex: 'quantidadeHoras',
      key: 'quantidadeHoras',
      ...getColumnSearchProps('quantidadeHoras'),
      render: (Item: any, client: DataType) => (
        <>
          <FaTrashAlt
            onClick={() => deleteCliente(client._Id)}
            color="#F14902"
            style={{ cursor: 'pointer' }}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button>Cliente</Button>
        <Button>Clientes ClockiFy</Button>
        <Button>Clientes MovieDesk</Button>
      </Space>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default TableC;
