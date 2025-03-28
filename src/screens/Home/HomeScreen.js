import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import TopHeader from '../../components/Home/TopHeader';
import Categories from '../../components/Home/Categories';
import SpecialOffer from '../../components/Home/SpecialOffer';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header */}
      <TopHeader />

      {/* Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <Categories />
          <SpecialOffer />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(HomeScreen); // Memoize the component to prevent unnecessary re-renders

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
