import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import CartIcon from '../components/CartIcon';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
      <Stack.Navigator
        screenOptions={{
          headerRight: () => <CartIcon />,
        }}
      >
        <Stack.Screen
          name="Products"
          component={ProductListScreen}
          options={{ title: 'Products' }}
        />

        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{ title: 'Details' }}
        />

        <Stack.Screen
  name="Cart"
  component={CartScreen}
  options={{
    title: 'My Cart',
    headerRight: () => null,
  }}
/>
<Stack.Screen
  name="Checkout"
  component={CheckoutScreen}
  options={{
    title: 'Checkout',
    headerRight: () => null,
  }}
/>
    </Stack.Navigator>
  );
}
