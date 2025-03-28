import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {removeItemFromCart, updateQuantity} from '../../redux/slices/cartSlice';

const {width} = Dimensions.get('window');
const TAB_BAR_HEIGHT = 60; // Adjust this based on your actual tab bar height

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleIncreaseQuantity = item => {
    dispatch(updateQuantity({id: item.id, quantity: item.quantity + 1}));
  };

  const handleDecreaseQuantity = item => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({id: item.id, quantity: item.quantity - 1}));
    } else {
      dispatch(removeItemFromCart({id: item.id}));
    }
  };

  const handleRemoveItem = itemId => {
    dispatch(removeItemFromCart({id: itemId}));
  };

  const renderCartItem = ({item}) => (
    <View style={styles.cartItemContainer}>
      <Image
        style={styles.cartItemImage}
        source={{uri: item.img}}
        resizeMode="cover"
        // defaultSource={require('../../assets/default-coffee.png')}
      />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemTitle}>{item.title}</Text>
        <Text style={styles.cartItemDescription}>
          Size: {item.size} • Sugar: {item.sugar}
        </Text>
        <Text style={styles.cartItemPrice}>
          £{(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
      <View style={styles.quantityControls}>
        <TouchableOpacity
          onPress={() => handleDecreaseQuantity(item)}
          style={styles.quantityButton}
          activeOpacity={0.7}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          onPress={() => handleIncreaseQuantity(item)}
          style={styles.quantityButton}
          activeOpacity={0.7}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleRemoveItem(item.id)}
          style={styles.removeButton}
          activeOpacity={0.7}>
          <Text style={styles.removeButtonText}>×</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Your Cart</Text>

        {cartItems.length > 0 ? (
          <>
            <FlatList
              data={cartItems}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              renderItem={renderCartItem}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={<View style={styles.footerSpacer} />}
            />
            <View style={styles.footer}>
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total:</Text>
                <Text style={styles.totalPrice}>£{totalPrice.toFixed(2)}</Text>
              </View>
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => console.log('Proceed to checkout')}>
                <Text style={styles.checkoutButtonText}>
                  Proceed to Checkout
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/10423/10423290.png',
              }}
              style={styles.emptyImage}
            />
            <Text style={styles.emptyCartText}>Your cart is empty</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: TAB_BAR_HEIGHT,
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  emptyCartText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  footerSpacer: {
    height: 160, // Space for footer to prevent clipping
  },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cartItemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 15,
  },
  cartItemDetails: {
    flex: 1,
    marginRight: 10,
  },
  cartItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cartItemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00512C',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    includeFontPadding: false,
  },
  quantityText: {
    width: 30,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  removeButton: {
    marginLeft: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ff4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    lineHeight: 20,
    includeFontPadding: false,
  },
  footer: {
    position: 'absolute',
    bottom: TAB_BAR_HEIGHT,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00512C',
  },
  checkoutButton: {
    backgroundColor: '#00512C',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default React.memo(Cart);
