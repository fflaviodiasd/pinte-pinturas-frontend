import React from 'react';
import { Grid, Box, Paper, Typography, CardContent } from '@mui/material';

interface ReportGeneralProps {
  ranking: number;
  totalChecklist: number;
  totalPackages: number;
  totalPriceCompany: string;
  totalPriceEmployee: string;
  teammates: string[];
}

const ReportGeneral: React.FC<ReportGeneralProps> = ({
  ranking,
  totalChecklist,
  totalPackages,
  totalPriceCompany,
  totalPriceEmployee,
  teammates,
}) => {
  const cardHeight = 100; 

  return (
    <>
      <Grid item xs={12} sm={3} md={1} lg={1} style={{ padding: 12 }}>
        <Paper elevation={3} sx={{ padding: '8px', height: cardHeight }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="subtitle2"
                fontWeight={600}
                color={"#a1a1a1"}
              >
                Ranking
              </Typography>
              <Typography variant="h6" fontWeight={700}>
                {ranking}
              </Typography>
              <Typography variant="body2" color={"#a1a1a1"}>
                Atual
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={5} md={3} lg={3} style={{ padding: 12 }}>
        <Paper elevation={3} sx={{ padding: '8px', height: cardHeight }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRight: '1px solid #ccc',
                paddingRight: 2,
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                width: '50%', 
              }}
            >
              <Typography
                variant="subtitle2"
                fontWeight={600}
                color={"#a1a1a1"}
              >
                Empresa
              </Typography>
              <Typography variant="h6" fontWeight={700}>
                {totalPriceCompany}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                paddingLeft: 2,
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                width: '50%', 
              }}
            >
              <Typography
                variant="subtitle2"
                fontWeight={600}
                color={"#a1a1a1"}
              >
                Funcionário
              </Typography>
              <Typography variant="h6" fontWeight={700}>
                {totalPriceEmployee}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={5} md={2} lg={2} style={{ padding: 12 }}>
        <Paper elevation={3} sx={{ padding: '8px', height: cardHeight }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRight: '1px solid #ccc',
                paddingRight: 2,
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                width: '50%', 
              }}
            >
              <Typography
                variant="subtitle2"
                fontWeight={600}
                color={"#a1a1a1"}
              >
                Checklists
              </Typography>
              <Typography variant="h6" fontWeight={700}>
                {totalChecklist}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                paddingLeft: 2,
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                width: '50%', 
              }}
            >
              <Typography
                variant="subtitle2"
                fontWeight={600}
                color={"#a1a1a1"}
              >
                Pacotes
              </Typography>
              <Typography variant="h6" fontWeight={700}>
                {totalPackages}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={6} style={{ padding: 12 }}>
        <Paper
          elevation={3}
          sx={{
            padding: '8px',
            height: cardHeight,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <CardContent
            sx={{
              padding: '8px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="subtitle2" color={"#a1a1a1"}>
              Companheiros de Equipe
            </Typography>
            <Box
              sx={{
                maxHeight: '60px', // Ajuste conforme necessário
                overflowY: teammates.length > 0 ? 'auto' : 'hidden',
                marginTop: '8px',
              }}
            >
              {teammates.length > 0 ? (
                teammates.map((member, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    fontWeight={300}
                    sx={{ marginRight: 2, whiteSpace: 'nowrap' }}
                  >
                    •{member}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2" color={"#a1a1a1"}>
                  Não há dados
                </Typography>
              )}
            </Box>
          </CardContent>
        </Paper>
      </Grid>
    </>
  );
};

export default ReportGeneral;
