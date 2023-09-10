type Type = {
  name: string;
  signal: string;
};

const TypeCustomEnum: Type[] = [
  {
    name: 'SaleProducer',
    signal: '+',
  },
  {
    name: 'SaleAffiliate',
    signal: '+',
  },
  {
    name: 'CommissionPaid',
    signal: '-',
  },
  {
    name: 'CommissionReceived',
    signal: '+',
  },
];

export default TypeCustomEnum;
