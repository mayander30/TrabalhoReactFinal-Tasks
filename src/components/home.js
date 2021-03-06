import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    Image,
    ActivityIndicator, TouchableHighlight
} from 'react-native';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as ReduxActions from '../actions'; //Import your actions

import {Actions} from 'react-native-router-flux'

//Buttons for Action Sheet
const BUTTONS = [
    "Edit",
    "Delete",
    'Cancel',
];

const CANCEL_INDEX = 2;

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.renderItem = this.renderItem.bind(this);
        this.showOptions = this.showOptions.bind(this);
    }

    componentDidMount() {
        this.props.getTasks(); //call our action
    }

    showOptions(task) {
        // ActionSheetIOS.showActionSheetWithOptions({
        //     options: BUTTONS,
        //     cancelButtonIndex: CANCEL_INDEX,
        //     destructiveButtonIndex: 1,
        // },
        // (buttonIndex) => {
        //     if (buttonIndex === 0) Actions.new_task({task: task, edit: true, title:"Edit Task"})
        //     else if (buttonIndex === 1) this.props.deleteTask(task.id)
        // });
        Actions.new_task({task: task, edit: true, title:"Edit Task"})
    }

    render() {
        if (this.props.loading) {
            return (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <FlatList
                        ref='listRef'
                        data={this.props.tasks}
                        renderItem={this.renderItem}
                        keyExtractor={ (item, index) => index.toString()}/>

                    <TouchableHighlight style={styles.addButton}
                                        underlayColor='#ff7043' onPress={() => Actions.new_task()}>
                        <Text style={{fontSize: 25, color: 'white'}}>+</Text>
                    </TouchableHighlight>
                </View>
            );
        }
    }

    renderItem({item, index}) {
        return (
            <TouchableHighlight onPress={() => this.showOptions(item)} underlayColor='rgba(0,0,0,.2)'>
                <View style={styles.row}>
                    <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />

                    <Text style={styles.text}>
                        {item.text}
                    </Text>
                    <Text style={styles.description}>
                        {item.description}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }
};



// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
    return {
        loading: state.dataReducer.loading,
        tasks: state.dataReducer.tasks
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor: '#F5F5F5'
    },

    activityIndicatorContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    row:{
        borderBottomWidth: 1,
        borderColor: "#ccc",
        padding: 10
    },

    description: {
        fontSize: 14,
        fontWeight: "600",
        marginTop: 8 * 2
    },

    text: {
        marginTop: 5,
        fontSize: 14,
    },

    addButton: {
        backgroundColor: '#ff5722',
        borderColor: '#ff5722',
        borderWidth: 1,
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    }
});