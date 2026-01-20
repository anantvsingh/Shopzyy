import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Share,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, increaseQty, decreaseQty } from '../redux/cartSlice';
import { RootState } from '../redux/store';
import { Product } from '../types/Product';
import AppButton from '../atoms/AppButton';
import QuantityControl from '../molecules/QuantityControl';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen({ route }: any) {
  const { item }: { item: Product } = route.params;
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find(i => i.id === item.id)
  );
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${item.title} - $${item.price}\n${item.description}`,
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Product Image */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Product Info */}
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>

        <Text style={styles.price}>${item.price}</Text>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{item.description}</Text>

        {/* Quantity Control */}
        {quantity > 0 && (
          <View style={{ marginTop: 20 }}>
            <QuantityControl
              quantity={quantity}
              onIncrease={() => dispatch(increaseQty(item.id))}
              onDecrease={() => dispatch(decreaseQty(item.id))}
            />
          </View>
        )}
      </View>

      {/* Buttons */}
      <View style={styles.buttonWrapper}>
        <AppButton
          title={quantity === 0 ? 'Add to Cart' : 'Update Cart'}
          onPress={() => dispatch(addToCart(item))}
        />

        <AppButton
          title="Share"
          onPress={handleShare}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageWrapper: {
    width,
    height: 320,
    backgroundColor: '#f6f6f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
  },
  price: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0a7cff',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666',
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    marginTop: 16,

    gap: 12,
  },
});
