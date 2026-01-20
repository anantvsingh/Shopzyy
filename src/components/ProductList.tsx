import { FlatList } from 'react-native';
import ProductCard from '../molecules/ProductCard';
import { Product } from '../types/Product';

interface Props {
  data: Product[];
  onSelect: (item: Product) => void;
}

export default function ProductList({ data, onSelect }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={i => i.id.toString()}
      numColumns={2}
      renderItem={({ item }) => (
        <ProductCard item={item} onPress={() => onSelect(item)} />
      )}
    />
  );
}

