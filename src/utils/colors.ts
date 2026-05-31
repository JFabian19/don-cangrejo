export const getCategoryColor = (categoria: string) => {
  switch (categoria) {
    case 'Sándwiches / Calientes':
    case 'Calientes':
      return {
        text: 'text-cat-sandwich',
        bg: 'bg-cat-sandwich',
        border: 'border-cat-sandwich'
      };
    case 'Jugos Clásicos':
      return {
        text: 'text-cat-clasicos',
        bg: 'bg-cat-clasicos',
        border: 'border-cat-clasicos'
      };
    case 'Jugos Especiales':
      return {
        text: 'text-cat-especiales',
        bg: 'bg-cat-especiales',
        border: 'border-cat-especiales'
      };
    case 'Bebidas Frías':
      return {
        text: 'text-cat-frias',
        bg: 'bg-cat-frias',
        border: 'border-cat-frias'
      };
    case 'Frozen':
      return {
        text: 'text-cat-frozen',
        bg: 'bg-cat-frozen',
        border: 'border-cat-frozen'
      };
    default:
      return {
        text: 'text-brand-text',
        bg: 'bg-gray-200',
        border: 'border-gray-200'
      };
  }
};
