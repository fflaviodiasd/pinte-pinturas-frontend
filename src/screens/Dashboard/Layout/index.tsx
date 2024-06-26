import { useContext } from 'react';
import { Grid } from '@mui/material';
import ReactApexChart from 'react-apexcharts';

import data from './utils.json';
import { DashboardContext } from '../../../contexts/DashboardContext';

export function Layout(){
  const { listChecklist } = useContext(DashboardContext);
  console.log(listChecklist)
  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      height: 450,
      type: 'heatmap',

    },
    tooltip: {
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        const name = w.globals.initialSeries[seriesIndex].data[dataPointIndex].nome;
        const inicio = w.globals.initialSeries[seriesIndex].data[dataPointIndex].inicio;
        const final = w.globals.initialSeries[seriesIndex].data[dataPointIndex].final;

        function formatDate(date: string){
          const data = new Date(date);
  
          const dia = data.getDate().toString().padStart(2, '0');
          const mes = (data.getMonth() + 1).toString().padStart(2, '0');
          const ano = data.getFullYear().toString().padStart(4, '0');
  
          const hora = data.getHours().toString().padStart(2, '0');
          const minutos = data.getMinutes().toString().padStart(2, '0');
          const segundos = data.getSeconds().toString().padStart(2, '0');
  
          return `(${dia}/${mes}/${ano}, ${hora}:${minutos}:${segundos})`;
        }
        const autoinicio = formatDate(w.globals.initialSeries[seriesIndex].data[dataPointIndex].autoinicio);
        const autofinal = formatDate(w.globals.initialSeries[seriesIndex].data[dataPointIndex].autofinal);


        const content = `
          <div class="custom-tooltip">
            <div class="tooltip-title">Nome: <strong>${name || "-"}</strong></div>
            <div class="tooltip-content">
              <div>Inicio: <strong>${inicio ?? "-"}</strong> ${autoinicio ?? "-"}</div>
              <div>Termino: <strong>${final ?? "-"}</strong> ${autofinal ?? "-"}</div>
            </div>
          </div>
        `;
        return content;
      }
    },
    dataLabels: {
      enabled: true,
      distributed: true,
      formatter: function(value, { seriesIndex, dataPointIndex, w }) {
        const medValue = w.globals.initialSeries[seriesIndex].data[dataPointIndex].med;
        const eqValue = w.globals.initialSeries[seriesIndex].data[dataPointIndex].eq;
        return medValue + eqValue
        
      }
    },
    plotOptions: {
      heatmap: {
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 0,
              color: '#F44336', // Não Liberado (vermelho)
              name: 'Não Liberado'
            },
            {
              from: 1,
              to: 1,
              color: '#FF9800', // Liberado (amarelo)
              name: 'Liberado'
            },
            {
              from: 2,
              to: 2,
              color: '#4CAF50', // Iniciado (verde)
              name: 'Iniciado'
            },
            {
              from: 3,
              to: 3,
              color: '#2196F3', // Finalizado (azul)
              name: 'Finalizado'
            },
            {
              from: 4,
              to: 4,
              color: '#673AB7', // Entregue (roxo)
              name: 'Entregue'
            }
          ]
        }
      }
    },
    grid: {
      padding: {
        right: 20,
      },
    },
  };

  return (
    <Grid
      container
      style={{ paddingRight: 24, paddingLeft: 24, backgroundColor: "#EEE" }}
    >
      <ReactApexChart options={chartOptions} series={data} type="heatmap" height={600} width={1308} />
    </Grid>
  );
};
