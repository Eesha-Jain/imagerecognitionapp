import React from 'react';
import { StyleSheet, Button, TouchableHighlight } from 'react-native';
import styles from './styles/style';

export default function Camera() {
  const [identifedAs, setIdentifedAs] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <TouchableHighlight style={styles.captureButton} disabled={this.props.buttonDisabled}>
      <Button onPress={this.props.onClick} disabled={this.props.buttonDisabled} title="Capture" accessibilityLabel="Learn more about this button"/>
    </TouchableHighlight>
  );
}
