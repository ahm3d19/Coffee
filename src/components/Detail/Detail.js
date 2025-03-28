import React, {useState, useMemo, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {addItemToCart} from '../../redux/slices/cartSlice';

const {width, height} = Dimensions.get('window'); // Get device dimensions

const Detail = () => {
  const route = useRoute();
  const navigation = useNavigation(); // Access navigation object
  const dispatch = useDispatch(); // Redux dispatch
  const {title, price, img} = route.params; // Destructure the passed data

  // State for selected cup size and sugar level
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [selectedSugar, setSelectedSugar] = useState('Medium');

  // State for modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle Add to Cart function
  const handleAddToCart = useCallback(() => {
    dispatch(
      addItemToCart({
        title,
        size: selectedSize,
        sugar: selectedSugar,
        price,
        img,
      }),
    );
    setIsModalVisible(true); // Show modal
  }, [dispatch, title, selectedSize, selectedSugar, price]);

  // Memoized modal content
  const modalContent = useMemo(
    () => ({
      title,
      description: `Size: ${selectedSize}, Sugar: ${selectedSugar}`,
    }),
    [title, selectedSize, selectedSugar],
  );

  // Close Modal
  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground source={{uri: img}} style={styles.imageBackground}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
          <View style={styles.backButtonBackground}>
            <Text style={styles.backButtonText}>←</Text>
          </View>
        </TouchableOpacity>

        {/* Bottom Content */}
        <View style={styles.detailsContainer}>
          {/* Title and Description */}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>
            Size: {selectedSize}, Sugar: {selectedSugar}
          </Text>
          <Text style={styles.price}>£{price}</Text>

          {/* Cup Size Options */}
          <Options
            title="Select Cup Size"
            options={['Small', 'Medium', 'Large']}
            selectedOption={selectedSize}
            onSelect={setSelectedSize}
          />

          {/* Sugar Level Options */}
          <Options
            title="Select Sugar Level"
            options={['No Sugar', 'Low', 'Medium']}
            selectedOption={selectedSugar}
            onSelect={setSelectedSugar}
          />

          {/* Add to Cart Button */}
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}>
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Lazy Load Modal */}
      {isModalVisible && (
        <CustomModal
          visible={isModalVisible}
          onClose={handleCloseModal}
          content={modalContent}
        />
      )}
    </View>
  );
};

const Options = React.memo(({title, options, selectedOption, onSelect}) => {
  return (
    <View style={styles.optionsContainer}>
      <Text style={styles.optionTitle}>{title}:</Text>
      <View style={styles.optionButtons}>
        {options.map(option => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              selectedOption === option && styles.selectedOptionButton,
            ]}
            onPress={() => onSelect(option)}>
            <Text
              style={[
                styles.optionButtonText,
                selectedOption === option && styles.selectedOptionButtonText,
              ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
});

const CustomModal = React.memo(({visible, onClose, content}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Item Details</Text>
          <Text style={styles.modalDescription}>{content.description}</Text>
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
});

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageBackground: {
    width: width,
    height: height,
    justifyContent: 'flex-end', // Align content to the bottom
  },
  backButton: {
    position: 'absolute',
    top: 50, // Adjust for safe area (e.g., iOS notch)
    left: 20,
    zIndex: 10, // Ensure the button is above other elements
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Ensure the background stays within the rounded button
  },
  backButtonBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
    width: '100%',
    height: '100%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#00512C',
    fontSize: 20,
    fontWeight: 'bold',
  },
  detailsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black background
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // White text for contrast
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#ddd', // Light gray text for contrast
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700', // Gold color for price
    marginBottom: 20,
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  optionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent button background
    marginRight: 10,
  },
  selectedOptionButton: {
    backgroundColor: '#FFD700', // Highlight selected option
  },
  optionButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  selectedOptionButtonText: {
    color: '#000', // Black text for selected option
    fontWeight: 'bold',
  },
  addToCartButton: {
    marginTop: 30,
    backgroundColor: '#FFD700', // Gold background for the button
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addToCartButtonText: {
    fontSize: 18,
    color: '#000', // Black text for the button
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent black background
    padding: 20,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700', // Gold color for the title
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#fff', // White text for contrast
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#FFD700', // Gold background for the button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalButtonText: {
    fontSize: 16,
    color: '#000', // Black text for the button
    fontWeight: 'bold',
  },
});
