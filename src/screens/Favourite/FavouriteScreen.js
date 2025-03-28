import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Favourite from '../../components/Favourite/Favourite';

const FavouriteScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Favourite />
    </SafeAreaView>
  );
};

export default FavouriteScreen;
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 20, // Add padding to avoid content being cut off
  },
});
