import { useEffect, useState } from 'react';
import Loader from '../atoms/Loader';
import ProductList from '../components/ProductList';
import { fetchProducts } from '../api/productsApi';
import { Product } from '../types/Product';
import { Alert } from 'react-native';

export default function ProductListScreen({ navigation }: any) {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(setData)
      .catch(() => Alert.alert('Failed to load products'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <ProductList
      data={data}
      onSelect={(item) => navigation.navigate('ProductDetail', { item })}
    />
  );
}
