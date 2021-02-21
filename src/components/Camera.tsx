import {useNavigation} from '@react-navigation/native';
import {Icon} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useCameraContext} from '../utils/contexts/CameraContext';
import useGoogleCloudVision from '../utils/hooks/useGoogleCloudVision';

const Camera = () => {
  const [camera, setCamera] = useState<RNCamera | null>();
  const cameraContext = useCameraContext();
  const navigation = useNavigation();
  const googleCloudVision = useGoogleCloudVision();

  const onSnap = async () => {
    if (camera) {
      const options = {quality: 0.5, base64: true};
      const data = await camera.takePictureAsync(options);
      cameraContext.setUri(data.uri);

      googleCloudVision.getTextDetection(data.base64 ?? '');

      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={(ref) => {
          setCamera(ref);
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onGoogleVisionBarcodesDetected={({barcodes}) => {
          console.log(barcodes);
        }}
      />
      <View style={styles.camera}>
        <TouchableOpacity onPress={onSnap} style={styles.capture}>
          <Icon name="camera" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 100,
    padding: 15,
    alignSelf: 'center',
    margin: 20,
  },
  camera: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cameraButton: {
    fontSize: 14,
  },
});

export default Camera;
