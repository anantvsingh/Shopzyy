import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CartIcon() {
  const navigation = useNavigation<any>();
  const itemsCount = useSelector(
    (state: RootState) => state.cart.items.length
  );

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Cart')}
      style={{ marginRight: 16, padding: 8 }}
    >
      <Icon name="cart-outline" size={24} color="#000" />

      {itemsCount > 0 && (
        <View
          style={{
            position: 'absolute',
            right: 0,
            top: 6,
            backgroundColor: 'red',
            borderRadius: 10,
            paddingHorizontal: 5,
            minWidth: 16,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 10 }}>
            {itemsCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
