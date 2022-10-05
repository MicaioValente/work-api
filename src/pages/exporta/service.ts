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
  return api.get(`Clients/all-integration-${timerTool}`);
};

export const ClientesServiceCreate = (
  values: ClientePost,
  timerToolDoc: string,
  tool: string
) => {
  return api.post(
    `Reports/${timerToolDoc}/${tool}?cliente=${values.cliente}&dataInicio=${values.startDay}&dataFinal=${values.endDay}`,
    {
      responseType: 'blob',
    }
  );
};

export const SubTitleClinteService = (
  timerToolDoc: string,
  clientSelected: string
) => {
  return api.post(``);
};
// http://20.242.111.210:5000/api/Reports/clockify/excel?cliente=62e7c61a64faff2d0d46038d&dataInicio=2022-09-01T12%3A01%3A57.689Z&dataFinal=2022-09-30T12%3A02%3A00.428Z
// http://20.242.111.210:5000/Api/Reports/clockify/excel?cliente=62e7c61a64faff2d0d46038d&dataInicio=2022-09-01T12:08:01.151Z&dataFinal=2022-09-30T12:08:07.951Z
