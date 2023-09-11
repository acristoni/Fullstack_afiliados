'use client'

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DataGrid from '@/components/DataGridOrders';
import getOrders from '../../../service/getOrders.service';
import { Order } from 'interfaces/order.interface';
import { User } from 'interfaces/user.interface';
import getUsers from 'service/getUsers.service';
import ButtonUpload from '@/components/ButtonUpload';

export default function Gestao() {
  const [orderList, setOrderList] = useState<Order[]>();
  const [userList, setUserList] = useState<User[]>()
  
  useEffect(()=>{
    getOrders(setOrderList)
    getUsers(setUserList)
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
        <ButtonUpload />
      </Box>
    </Box>
  );
}
