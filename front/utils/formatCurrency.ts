export default function formatCurrency(value: string | number): string {
    let number;

    if (typeof value === "string") {
        number = parseFloat(value);
    } else if (typeof value === "number") {
        number = value;
    }
  
    if (number && !isNaN(number)) {
      const formattedValue = number.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
      });
  
      return formattedValue;
    } else {
      return 'Valor inválido';
    }
};
  