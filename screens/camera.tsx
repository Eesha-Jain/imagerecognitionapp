import React, {useEffect, useState} from 'react';
import { Dimensions, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';
import CaptureButton from './capturebutton.tsx';
import styles from './styles/style';

export default function Camera() {
  const [identifedAs, setIdentifedAs] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    startCamera();
  });

  const startCamera = async () => {
    const {status} = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Access denied');
    }
  }

  const takePicture = async function() {
      if (this.camera) {
        // Pause the camera's preview
        this.camera.pausePreview();
        // Set the activity indicator
        setLoading(true);
        // Set options
        const options = {
            base64: true
        };
        // Get the base64 version of the image
        const data = await this.camera.takePictureAsync(options)
        // Get the identified image
        this.identifyImage(data.base64);
      }
  }

  function identifyImage(imageData) {
    // Initialise Clarifai api
    const Clarifai = require('clarifai');
    const app = new Clarifai.App({
        apiKey: 'RECOGNITION'
    });
    // Identify the image
    app.models.predict(Clarifai.GENERAL_MODEL, {base64: imageData})
    .then((response) => this.displayAnswer(response.outputs[0].data.concepts[0].name)
    .catch((err) => alert(err))
    );
  }

  function displayAnswer(identifiedImage) {
    // Dismiss the acitivty indicator
    setLoading(false);
    setIdentifedAs(identifyImage);
    // Show an alert with the answer on
    Alert.alert(identifedAs, '', { cancelable: false })
    // Resume the preview
    this.camera.resumePreview();
  }

  return (
    <RNCamera ref={ref => {this.camera = ref;}} style={styles.preview}>
      <ActivityIndicator size="large" style={styles.loadingIndicator} color="#fff" animating={loading}/>
      <CaptureButton buttonDisabled={loading} onClick={takePicture}/>
    </RNCamera>
  );
}
