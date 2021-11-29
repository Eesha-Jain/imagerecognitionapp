import React, {useState, useEffect} from 'react';
import { Dimensions, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
let camera: Camera;
import CaptureButton from './capturebutton';

export default function CameraPage() {
	const [loading, setLoading] = useState(false);

	const takePicture = async () => {
		if (camera) {
			camera.pausePreview();
			setLoading(true);
			const data = await camera.takePictureAsync(options={base64:true});
		}
	}

	const identifyImage = (imageData) => {
		const Clarifai = require('clarifai');
		const app = new Clarifai.App({ apiKey: 'f349ed37dec446c6b8837a3384a73d00' });

		app.models.predict(Clarifai.GENERAL_MODEL, {base64: imageData})
			.then((response) => {displayAnswer(response.outputs[0].data.concepts[0].name);})
			.catch((err) => alert(err));
	}

	const displayAnswer = (identifiedImage) => {
		setLoading(false);
		Alert.alert(identifiedImage, '', { cancelable: false } )
		camera.resumePreview();
	}

	return (
		<Camera ref={(r) => { camera = r }} style={styles.preview} type={Camera.Constants.Type.back} flashMode='off'>
			<ActivityIndicator size="large" style={styles.loadingIndicator} color="#fff" animating={loading}/>
			<CaptureButton buttonDisabled={loading} onClick={(data) => {takePicture(data);}}/>
		</Camera>
	);
}

const styles = StyleSheet.create({
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
    loadingIndicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
