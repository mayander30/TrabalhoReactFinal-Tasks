import React from 'react'
import { FileSystem } from 'expo'
import { Text, View, TouchableOpacity, Modal } from 'react-native'
import * as Permissions from 'expo-permissions'
import { Camera } from 'expo-camera'

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  }

  async componentDidMount () {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  takePicture = () => {
    //console.log(this.camera)
    if (this.camera) {
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved })      
    }
  }

  onPictureSaved = async photo => {
    this.props.callback(photo.uri)  
    this.props.close();  
  }

  render () {
    const { hasCameraPermission } = this.state
    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    } else {
      return (
        <Modal
          animationType='slide'
          transparent={false}
          visible={this.props.visible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.')
          }}
        >
          <View style={{ flex: 1, marginTop: 20 }}>
            <TouchableOpacity onPress={this.props.close}>
              <Text style={{ color: '#000' }}>fechar</Text>
            </TouchableOpacity>
            <Camera
              ref={ref => {
                this.camera = ref
              }}
              style={{ flex: 1 }}
              type={this.state.type}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row'
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 0.1,
                    alignSelf: 'flex-end',
                    alignItems: 'center'
                  }}
                  onPress={this.takePicture}
                >
                  <Text
                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}
                  >
                    Tirar foto
                  </Text>
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
        </Modal>
      )
    }
  }
}
