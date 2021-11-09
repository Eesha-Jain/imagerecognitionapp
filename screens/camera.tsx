import React from 'react';
import { Dimensions, Alert, Stylesheet, ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';
import styles from './styles/style';

export default function Camera() {
  const [identifedAs, setIdentifedAs] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <RNCamera ref={ref => {this.camera = ref;}} style={styles.preview}></RNCamera>
  );
}
