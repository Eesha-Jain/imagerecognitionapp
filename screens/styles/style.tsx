import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
const win = Dimensions.get('window');

export default StyleSheet.create({
  captureButton: {
    marginBottom:30,
    width:160,
    borderRadius:10,
    backgroundColor: "white",
  },
  loadingIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
