import { useState } from 'react';
import { Alert, View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import Loader from '../atoms/Loader';
import AppButton from '../atoms/AppButton';

export default function CheckoutScreen() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const checkout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (Math.random() > 0.3) {
        dispatch(clearCart());
        Alert.alert('Order successful!', 'Thank you for your purchase.');
      } else {
        Alert.alert('Payment failed', 'Please try again.');
      }
    }, 2000);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
        <Text style={styles.loadingText}>Processing your order...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Checkout</Text>
      <Text style={styles.info}>
        Click below to complete your purchase. You will receive a confirmation
        once payment is successful.
      </Text>

      <AppButton title="Checkout" onPress={checkout}  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    padding: 24,
    justifyContent: 'center',
  },

  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
    marginBottom: 12,
  },

  info: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },

  button: {
    alignSelf: 'center',
    width: '80%',
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
  },

  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});
