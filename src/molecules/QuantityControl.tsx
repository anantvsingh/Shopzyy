import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function QuantityControl({
  quantity,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onDecrease} style={styles.btn}>
        <Text style={styles.btnText}>−</Text>
      </TouchableOpacity>

      <Text style={styles.qty}>{quantity}</Text>

      <TouchableOpacity onPress={onIncrease} style={styles.btn}>
        <Text style={styles.btnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 18,
    fontWeight: '700',
  },
  qty: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});
