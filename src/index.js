import React, {Component} from 'react';
import { View, AsyncStorage, Text } from 'react-native';

import { Router, Scene } from 'react-native-router-flux';

import Home from './components/home'
import NewTask from './components/new_task'

import Issues from './components/issues'
import NewIssue from './components/issues/new'

import Data from './tasks.json'
import Data_Issue from './issues.json'

import {connect} from 'react-redux';
import { getTasks, getIssues } from './actions'

class Main extends React.Component {

    componentDidMount() {
        //this.clear();        
        
        AsyncStorage.getItem('data', (err, data) => {   
            if (data === null){
                AsyncStorage.setItem('data', JSON.stringify(Data.tasks));
                this.props.getTasks();
            }
        });
        
        AsyncStorage.getItem('issues', (err, data) => {  
            try{            
                if (data === null){                    
                    AsyncStorage.setItem('issues', JSON.stringify(Data_Issue.issues));
                    this.props.getIssues();                
                }
            }catch(ex){
                console.log(ex)
            }
        });
        
    }

    clear = async () => {
        await AsyncStorage.clear()
    }

    render() {
        return (
            // <Router>
            //     <Scene key="root">
            //         <Scene key="home" component={Home} title="Tarefas" initial/>
            //         <Scene key="new_task" component={NewTask} title="Tarefa"/>
            //     </Scene>
            // </Router>
            <Router>
                <Scene key="root">
                    <Scene
                    key="tabbar"
                    tabs={true}
                    hideNavBar={true}
                    tabBarStyle={{ backgroundColor: '#FFFFFF' }}>

                    <Scene key="tasks" title="Tarefas">
                        <Scene key="home"  component={Home} title="Tarefas" initial/>
                        <Scene key="new_task" component={NewTask} title="Tarefa"/>
                    </Scene>

                    <Scene key="issues" title="Problemas">
                        <Scene key="listIssues" component={Issues} title="Problemas"/>
                        <Scene key="new_issue" component={NewIssue} title="Novo"/>
                    </Scene>

                    </Scene>
                </Scene>
            </Router>
        );
    }
}

//Connect everything
export default connect(null, { getTasks, getIssues })(Main);