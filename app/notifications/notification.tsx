import { View, Text, Button,Modal, StyleSheet } from 'react-native'
import React, { useState } from 'react'

const AppModal = ({ isModalVisible, setIsModalVisible }: { isModalVisible: boolean, setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>> }) => {

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      {/* Button to toggle the modal */}
      <Button title="Open Modal" onPress={toggleModal} />

      {/* Modal Component */}
      <Modal
        animationType="slide"  // You can use 'fade' or 'slide'
        transparent={true}      // Makes the background behind modal semi-transparent
        visible={isModalVisible}
        onRequestClose={toggleModal}  // For Android back button functionality
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>This is a modal!</Text>
            <Button title="Close" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

const notification = () => {
  const [show,setShow]=useState(true)
  return (
    <View>
      <Text>notification</Text>
      <Button title='Click' onPress={()=>setShow(!show)}></Button>
      <AppModal isModalVisible={show} setIsModalVisible={setShow}/>
    </View>
  )
}

export default notification