import api from '../../service/api';

export type ClientePost = {
  cliente: string;
  tipoDeContrato: string;
  startDay: any;
  endDay: any;
  qtdDeHorasCadastradas: string;
  tool: string;
};

export const ClientesService = (timerTool: string) => {
  return api
    .get(`Clients/all-integration-${timerTool}`)
};

export const ClientesServiceCreate = (values: ClientePost, timerToolDoc: string, tool: string) => {
  return api
    .post(`Reports/${timerToolDoc}/${tool}?cliente=${values.cliente}&dataInicio=${values.startDay}&dataFinal=${values.endDay}`)

};
