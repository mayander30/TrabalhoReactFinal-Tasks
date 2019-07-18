import React, {Component} from 'react';
import {StyleSheet, View, Image, Dimensions, Button, Text, TextInput, TouchableOpacity} from 'react-native';

import { connect } from 'react-redux';
import { addTask, updateTask } from '../actions'
import { Actions } from 'react-native-router-flux';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import Icon from 'react-native-vector-icons/FontAwesome';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

import Camera from '../components/camera'

class NewTask extends Component {

    constructor(props) {
        super(props);

        this.state = {
            description: (props.edit) ? props.task.description : "",
            text: (props.edit) ? props.task.text : "",
            isCameraVisible: false,
            image: (props.edit) ? props.task.image : null,
        };

        this.generateID = this.generateID.bind(this);
        this.addTask = this.addTask.bind(this);
        this.setImage = this.setImage.bind(this);
    }

    generateID() {
        let d = new Date().getTime();
        let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(5);
        });
        return id;
    }

    addTask() {
        if (this.props.edit){
            let task = this.props.task;
            task['description'] = this.state.description;
            task['text'] = this.state.text;
            task['image'] = this.state.image;
            this.props.updateTask(task);
        }else{
            let id = this.generateID();
            let task = {
                "id": id, 
                "description": this.state.description, 
                "text": this.state.text,
                "image": this.state.image
            };
            this.props.addTask(task);
        }
        Actions.pop();
    }

    setImage(img){
        this.setState({image: img})
        console.log('callback ' + img)
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                
                <Camera
                    visible={this.state.isCameraVisible}
                    close={() => this.setState({isCameraVisible: false})}
                    callback={this.setImage}
                />

                <View style={{flex:1, paddingLeft:10, paddingRight:10}}>

                    <View style={styles.container}>
                        <View style={styles.buttonContainer}>
                            <Icon.Button
                                name="save"
                                disabled={(this.state.description.length > 0 && this.state.text.length > 0) ? false : true}
                                backgroundColor="#3b5998"
                                onPress={this.addTask}>
                            Salvar Tarefa
                            </Icon.Button>
                        </View>
                        <View style={styles.buttonContainer}>
                        
                            <Icon.Button
                                name="photo"
                                disabled={(this.state.description.length > 0 && this.state.text.length > 0) ? false : true}
                                backgroundColor="#00FF7F"
                                onPress={() => this.setState({isCameraVisible: true})}>
                                Tirar Foto
                            </Icon.Button>

                        </View>
                    </View>
                
                    <TextInput
                        onChangeText={(text) => this.setState({description: text})}
                        placeholder={"Descrição"}
                        autoFocus={true}
                        style={[styles.title]}
                        value={this.state.description}
                    />
                    <TextInput
                        multiline={true}
                        onChangeText={(text) => this.setState({text: text})}
                        placeholder={"Observação/Tarefa"}
                        style={[styles.text]}
                        value={this.state.text}
                    />

                    <Image source={{ uri: this.state.image }} alt="Logo" style={{ width: 200, height: 200 }} />
                </View>
                
    
                <KeyboardSpacer />
            </View>
        );
    }

}

//Connect everything
export default connect(null, {addTask, updateTask})(NewTask);

var styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
    },

    buttonText:{
        fontWeight: "500",
    },

    textCamera: {
        color: "#fff"
    },

    text: {
        fontSize: 17,
        lineHeight: 38,
        color: "#333333",
        padding: 16,
        paddingLeft:0,
        flex:1,
        height: 200,
        marginBottom:50,
        borderTopWidth: 1,
        borderColor: "rgba(212,211,211, 0.3)",
    },

    title: {
        fontWeight: "400",
        lineHeight: 22,
        fontSize: 16,
        height:25+32,
        padding: 16,
        paddingLeft:0
    },
});