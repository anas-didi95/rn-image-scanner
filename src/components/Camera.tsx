import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';

const Camera = () => {
  const [camera, setCamera] = useState<RNCamera | null>();

  const onSnap = async () => {
    if (camera) {
      const options = {quality: 0.5, base64: true};
      const data = await camera.takePictureAsync(options);
      console.log('onSnap', data.uri);
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
          <Text style={styles.cameraButton}> SNAP </Text>
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
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
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
