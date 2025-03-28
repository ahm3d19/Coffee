import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CategoryItemsData from '../../redux/store/CategoryItemsData';
import {useNavigation} from '@react-navigation/native';

const Favourite = () => {
  const navigation = useNavigation();
  // Generate reversed data without mutating the original array
  const reversedCategoryItems = CategoryItemsData.map(
    (_, index, array) => array[array.length - 1 - index],
  );

  // State to track favorite items
  const [favoriteItems, setFavoriteItems] = useState({});

  // Toggle favorite state for an item
  const toggleFavorite = useCallback(id => {
    setFavoriteItems(prevFavorites => ({
      ...prevFavorites,
      [id]: !prevFavorites[id], // Toggle the favorite state
    }));
  }, []);

  // Memoized handler for subcategory items
  const handleSubCategoriesItem = useCallback(
    ({item}) => {
      const isFavorite = favoriteItems[item.id]; // Check if the item is marked as favorite
      return (
        <View style={styles.subCategoryItemContainer}>
          <TouchableOpacity
            style={styles.subCategoryItem}
            onPress={() => navigation.navigate('Detail', item)}>
            <Image
              style={styles.subCategoryItemImg}
              source={{
                uri: item.img, // Fallback image
              }}
            />
            <Text style={styles.subItemTitleStyle}>{item.title}</Text>
            <Text style={styles.subItemSubDescStyle}>{item.description}</Text>
            <Text style={styles.subItemPriceStyle}>£{item.price}</Text>
            <TouchableOpacity
              style={styles.subCategoryFvrtBtnContainer}
              onPress={() => toggleFavorite(item.id)} // Toggle favorite on press
            >
              <Image
                style={styles.subCategoryFvrtBtn}
                source={
                  isFavorite
                    ? require('../../assets/Icons/fvrtFilledHeart.png') // Filled heart icon
                    : require('../../assets/Icons/fvrtUnfilledHeart.png') // Unfilled heart icon
                }
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.subCategoryAddBtnContainer}>
              <Image
                style={styles.subCategoryAddBtn}
                source={require('../../assets/Icons/add.png')}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      );
    },
    [favoriteItems, toggleFavorite],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.Header}>Favourite</Text>

      <FlatList
        data={reversedCategoryItems}
        keyExtractor={item => item.id.toString()} // Ensure unique keys
        renderItem={handleSubCategoriesItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: 190, // Width of each item
          offset: 190 * index,
          index,
        })}
      />
    </View>
  );
};

export default React.memo(Favourite); // Memoize the entire component to prevent unnecessary re-renders

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  Header: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
  subCategoryItemContainer: {
    height: 210,
    width: 160,
    marginHorizontal: 10,
  },
  subCategoryItem: {
    height: 190,
    width: 160,
    backgroundColor: '#ffffff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 20,
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  subCategoryItemImg: {
    width: 140,
    height: 110,
    borderRadius: 20,
  },
  subItemTitleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 8,
  },
  subItemSubDescStyle: {
    fontSize: 10,
    fontWeight: '300',
    marginLeft: 8,
  },
  subItemPriceStyle: {
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 8,
  },
  subCategoryFvrtBtn: {
    width: 18,
    height: 18,
  },
  subCategoryFvrtBtnContainer: {
    position: 'absolute',
    bottom: 45,
    right: 13,
  },
  subCategoryAddBtnContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  subCategoryAddBtn: {
    width: 33,
    height: 33,
  },
});
