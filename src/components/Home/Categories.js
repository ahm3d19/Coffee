import React, {useMemo, useCallback} from 'react';
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

const Categories = () => {
  const navigation = useNavigation();
  // Reverse data once to avoid reversing on every render
  const reversedCategoryItems = useMemo(
    () => [...CategoryItemsData].reverse(),
    [CategoryItemsData],
  );

  // Memoized handler for category items
  const handleCategoriesItem = useCallback(({item}) => {
    return (
      <View style={styles.categoryItemContainer}>
        <TouchableOpacity style={styles.categoryItem}>
          <Text style={styles.itemTitleStyle}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    );
  }, []);

  // Memoized handler for subcategory items
  const handleSubCategoriesItem = useCallback(({item}) => {
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
          <TouchableOpacity style={styles.subCategoryAddBtnContainer}>
            <Image
              style={styles.subCategoryAddBtn}
              source={require('../../assets/Icons/add.png')}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.categoryHeader}>Categories</Text>

      {/* FlatList for Categories */}
      <FlatList
        data={CategoryItemsData}
        keyExtractor={item => item.id.toString()} // Ensure unique keys
        renderItem={handleCategoriesItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: 130, // Width of each item
          offset: 130 * index,
          index,
        })}
      />

      {/* FlatList for Subcategories */}
      <FlatList
        data={reversedCategoryItems}
        keyExtractor={item => item.id.toString()} // Ensure unique keys
        renderItem={handleSubCategoriesItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: 190, // Width of each item
          offset: 190 * index,
          index,
        })}
      />
    </View>
  );
};

export default React.memo(Categories); // Memoize the entire component to prevent unnecessary re-renders

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  categoryHeader: {
    fontSize: 20,
    fontWeight: '700',
  },
  categoryItemContainer: {
    height: 60,
    width: 130,
    margin: 10,
  },
  categoryItem: {
    height: 40,
    width: 120,
    backgroundColor: '#ffffff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 100,
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  itemTitleStyle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#00582F',
    textAlign: 'center',
  },
  subCategoryItemContainer: {
    height: 250,
    width: 190,
    marginHorizontal: 10,
  },
  subCategoryItem: {
    height: 200,
    width: 180,
    backgroundColor: '#ffffff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 20,
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  subCategoryItemImg: {
    height: 130,
    width: 160,
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
