import { useContext, useEffect, useState } from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import ReactApexChart from 'react-apexcharts';

import data from './utils.json';
import { DashboardContext } from '../../../contexts/DashboardContext';
import { useStyles } from "../FollowUp/components/BarGraph/styles";


export function Layout(){
  const { listChecklist, listMeasurements, selectedConstruction, getAllMeasurements } = useContext(DashboardContext);
  const { classes } = useStyles();

  const chartOptions: any = {
    chart: {
      events: {
        dataPointSelection: function(event:any, chartContext:any, obj:any) {
          return window.open("http://10.10.5.240:8686" + obj.w.config.series[obj.seriesIndex].data[obj.dataPointIndex].link);
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40,
      fontSize: '14px',
      fontWeight: 400,
      onItemClick: {
        toggleDataSeries: true
      },
    },
    tooltip: {
      custom: function({ series, seriesIndex, dataPointIndex, w }: any) {
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
        const autoinicio = w.globals.initialSeries[seriesIndex].data[dataPointIndex].autoinicio == "" ? "" : formatDate(w.globals.initialSeries[seriesIndex].data[dataPointIndex].autoinicio);
        const autofinal = w.globals.initialSeries[seriesIndex].data[dataPointIndex].autofinal == "" ? "" : formatDate(w.globals.initialSeries[seriesIndex].data[dataPointIndex].autofinal);
        
        const content = `
          <div class="custom-tooltip">
            <div class="tooltip-title">Nome: <strong>${name || ""}</strong></div>
            <div class="tooltip-content">
              <div>Inicio: <strong>${inicio || ""}</strong> ${autoinicio || ""}</div>
              <div>Termino: <strong>${final || ""}</strong> ${autofinal || ""}</div>
            </div>
          </div>
        `;
        return content;
      }
    },
    dataLabels: {
      enabled: true,
      distributed: true,
      offsetY: -3,
      style: {
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        //colors: undefined
      },

      formatter: function(value: any, { seriesIndex, dataPointIndex, w }: any) {
        const medValue = w.globals.initialSeries[seriesIndex].data[dataPointIndex].med;
        const eqValue = w.globals.initialSeries[seriesIndex].data[dataPointIndex].eq;
        if (medValue == null) {
          return eqValue;
        }
        else {
          return [medValue, eqValue];
        }

        
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

  const [selectedMeasurement, setSelectedMeasurement] = useState("");
  const [filteredMeasurements, setFilteredMeasurements] = useState<any[]>([]);

  useEffect(() => {
    if (selectedConstruction.id) {
      getAllMeasurements();
    }
  }, [selectedConstruction.id]);
  return (
    <Grid
    container
    style={{ paddingRight: 24, paddingLeft: 24, backgroundColor: "#EEE" }}
  >
    <div className={classes.content}>
      <ReactApexChart options={chartOptions} series={listChecklist} type="heatmap" height={600} width={1500} />
    </div>
  </Grid>

  );
};
