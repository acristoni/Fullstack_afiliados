import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, ptBR } from '@mui/x-data-grid';
import { Order } from 'interfaces/order.interface';
import { OrderFormated } from 'interfaces/orderFormated.interface';
import { TypeEnum } from '@/enums/type.enum';
import formatCurrency from 'utils/formatCurrency';

type Props =  {
  rows: { allOrders:Order[], total:number };
}

export default function DataGridOrders({ rows }: Props) {
  const [rowsFormated, setRowsFormated] = useState<OrderFormated[]>([])

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'type',
      headerName: 'Tipo',
      width: 200,
    },
    {
      field: 'date',
      headerName: 'Data',
      width: 100,
      type: 'date'
    },
    {
      field: 'product',
      headerName: 'Produto',
      width: 300,
    },
    {
      field: 'seller',
      headerName: 'Vendedor',
      width: 300,
    },
    {
      field: 'price',
      headerName: 'Preço',
      width: 100,
    },
    {
      field: 'updatedAt',
      headerName: 'Atualização',
      description: 'Essa é a data da última atualização do pedido no nosso sistema.',
      width: 100,
      type: 'date'
    },
    {
      field: 'createdAt',
      headerName: 'Criação',
      description: 'Essa é a data que o pedido foi registrado no nosso sistema.',
      width: 100,
      type: 'date'
    },
  ];

  useEffect(()=>{
    if (rows && rows.allOrders && rows.allOrders.length) {
      const arrayRowsFormated = rows.allOrders.map((orderInfo: Order) => {
        let type = 'Não identificado';

        switch (orderInfo.type) {
          case TypeEnum.COMMISSIONPAID:
            type = "Comissão paga"
            break;
          case TypeEnum.COMMISSIONRECEIVED:
            type = "Comissão recebida"
            break;
          case TypeEnum.SALEAFFILIATE:
            type = "Venda afiliado"
            break;
          case TypeEnum.SALEPRODUCER:
            type = "Venda produtor"
            break;
          default:
            break;
        }

        return {
          id: orderInfo.id,
          product: orderInfo.product,
          seller: orderInfo.seller,
          type: type,
          price: formatCurrency(orderInfo.price),
          date: new Date(orderInfo.date),
          updatedAt: new Date(orderInfo.updatedAt),
          createdAt: new Date(orderInfo.createdAt)
        }  
      })
      setRowsFormated(arrayRowsFormated);
    }
  },[rows])

  return (
    <Box sx={{ height: 630, width: '100%' }}>
      <DataGrid
        rows={rowsFormated}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableColumnFilter
        disableRowSelectionOnClick
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
      />
    </Box>
  );
}
