'use client'

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DataGrid from '@/components/DataGridOrders';
import getOrders from '../../../service/getOrders.service';
import { Order } from 'interfaces/order.interface';
import ButtonUpload from '@/components/ButtonUpload';
import formatCurrency from 'utils/formatCurrency';

export default function Gestao() {
  const [orderList, setOrderList] = useState<{ allOrders:Order[], total:number}>();
  
  useEffect(()=>{
    getOrders(setOrderList)
  },[]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'end'
      }}
    >
      <Box 
        sx={{
          borderRight: '1px solid #dcdcdc', 
          borderLeft: '1px solid #dcdcdc', 
          flexGrow: 2, 
          height: '690px',
          position: 'relative'
        }}
      >
        <>
          {
            orderList ?
            <DataGrid rows={orderList}/> :
            <Typography>
              Carregando informações...
            </Typography>
          }
        </>
        <Box display='flex' p={2}>
          {
            orderList?.total &&
            <Typography fontWeight={700} fontSize={20}>Total: {formatCurrency(orderList?.total)}</Typography>
          }
          <ButtonUpload />
        </Box>
      </Box>
    </Box>
  );
}
