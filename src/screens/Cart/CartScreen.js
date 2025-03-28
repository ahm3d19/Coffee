import {SafeAreaView, StyleSheet} from 'react-native';
import Cart from '../../components/Cart/Cart';

const CartScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Cart />
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
