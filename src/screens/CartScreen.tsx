import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
} from '../redux/cartSlice';
import QuantityControl from '../molecules/QuantityControl';
import AppButton from '../atoms/AppButton';

export default function CartScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 120 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🛒</Text>
            <Text style={styles.emptyText}>Your cart is empty</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text numberOfLines={2} style={styles.title}>
              {item.title}
            </Text>

            <View style={styles.row}>
              <QuantityControl
                quantity={item.quantity}
                onIncrease={() => dispatch(increaseQty(item.id))}
                onDecrease={() => dispatch(decreaseQty(item.id))}
              />

              <TouchableOpacity
                onPress={() => dispatch(removeFromCart(item.id))}
              >
                <Text style={styles.remove}>Remove</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.price}>
              ${(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        )}
      />

      {items.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              ${total.toFixed(2)}
            </Text>
          </View>

          <AppButton
            title="Proceed to Checkout"
            onPress={() => navigation.navigate('Checkout')}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  price: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },

  remove: {
    color: '#E53935',
    fontSize: 13,
    fontWeight: '600',
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 12,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },

  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
  },

  emptyContainer: {
    alignItems: 'center',
    marginTop: 100,
  },

  emptyIcon: {
    fontSize: 48,
    marginBottom: 10,
  },

  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
