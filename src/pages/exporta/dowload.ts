import React, { useState } from 'react'
import {saveAs} from "file-saver";
import * as XLSX from "xlsx";
import FileDownload from 'js-file-download';
// import * as fs from 'fs';
import * as FileSaver from 'file-saver';

export const ExportToExcel = (apiData: any ) => {
    console.log(44,apiData )
    const fileName = "Reports"
    const csvData = [{"Name":"Gowri "}, {"Name":"Siva"},{"Name":"Teja"},{"Name":"USA"}]
    console.log(1 )

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
     console.log(1 )

    const ws = XLSX.utils.json_to_sheet(csvData);
    console.log(11 )
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    console.log(222,apiData )
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array'});
    console.log(333,apiData )
    const data = new Blob([excelBuffer], {type: fileType});
    console.log(444,apiData )
    FileSaver.saveAs(data, fileName + fileExtension);







    // const url = window.URL.createObjectURL(new Blob([apiData]));
    // const link = document.createElement('a');
    // link.href = url;
    // link.setAttribute('download', `${Date.now()}.xlsx`);
    // document.body.appendChild(link);
    // link.click();

    // fs.writeFileSync("test.xlsx", apiData)
    // const url = window.URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.style.display = 'none';
    // a.href = url;
    // // the filename you want
    // a.download = 'todo-1.json';
    // document.body.appendChild(a);
    // a.click();
    // window.URL.revokeObjectURL(url);
    // alert('your file has downloaded!'); // or you know, something with 

    // var blob = new Blob([apiData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    // console.log(233, blob)
    // saveAs(blob, 'dowload.xlsx')
    // new JsFileDownloader({ 
    //     url: `https://report.workdb.com.br/api/Reports/clockfy/excel/porProjeto?cliente=62e7c61a64faff2d0d46038d&dataInicio=2022-12-01T17:05:31.255Z&dataFinal=2022-12-21T17:05:33.588Z&projectId=6zAcroMBPkw3Lv1Q2aFe`
    //   })
    //   .then(function () {
    //     // Called when download ended
    //   })
    //   .catch(function (error) {
    //     // Called when an error occurred
    //   });
    //window.location.href = response.url;
        // const outputFilename = `${Date.now()}.xlsx`;

        // // If you want to download file automatically using link attribute.
        // const url = URL.createObjectURL(new Blob([apiData]));
        // const link = document.createElement('a');
        // link.href = url;
        // link.setAttribute('download', outputFilename);
        // document.body.appendChild(link);
        // link.click();

        // OR you can save/write file locally.
        // saveAs(`https://report.workdb.com.br/api/Reports/clockfy/excel/porProjeto?cliente=62e7c61a64faff2d0d46038d&dataInicio=2022-12-01T17:05:31.255Z&dataFinal=2022-12-21T17:05:33.588Z&projectId=6zAcroMBPkw3Lv1Q2aFe`)
        // fs.writeFileSync(outputFilename, apiData);
};