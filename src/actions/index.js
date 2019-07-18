export const TASKS_AVAILABLE = 'TASKS_AVAILABLE';
export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export const ISSUES_AVAILABLE = 'ISSUES_AVAILABLE';
export const ADD_ISSUE = 'ADD_ISSUE';
export const UPDATE_ISSUE = 'UPDATE_ISSUE';
export const DELETE_ISSUE = 'DELETE_ISSUE';

import {AsyncStorage} from "react-native";

// Add Task - CREATE (C)
export function addTask(task){
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, tasks) => {            
            if (tasks !== null){
                tasks = JSON.parse(tasks);
                tasks.unshift(task); //add the new task to the top
                AsyncStorage.setItem('data', JSON.stringify(tasks), () => {
                    dispatch({type: ADD_TASK, task:task});
                });
            }
        });
    };
}

// Get Data - READ (R)
export function getTasks(){
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, tasks) => {      
            if (tasks !== null){
                dispatch({type: TASKS_AVAILABLE, tasks:JSON.parse(tasks)});
            }
        });
    };
}

// Update Task - UPDATE (U)
export function updateTask(task){
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, tasks) => {
            if (tasks !== null){
                tasks = JSON.parse(tasks);
                var index = getIndex(tasks, task.id); //find the index of the task with the id passed
                if (index !== -1) {
                    tasks[index]['description'] = task.description;
                    tasks[index]['text'] = task.text;
                }
                AsyncStorage.setItem('data', JSON.stringify(tasks), () => {
                    dispatch({type: UPDATE_TASK, task:task});
                });
            }
        });
    };
}

// Delete Task - DELETE (D)
export function deleteTask(id){
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, tasks) => {
            if (tasks !== null){
                tasks = JSON.parse(tasks);

                var index = getIndex(tasks, id); //find the index of the task with the id passed
                if(index !== -1) tasks.splice(index, 1);//if yes, undo, remove the TASK
                AsyncStorage.setItem('data', JSON.stringify(tasks), () => {
                    dispatch({type: DELETE_TASK, id:id});
                });
            }
        });
    };
}

function getIndex(data, id){
    let clone = JSON.parse(JSON.stringify(data));
    return clone.findIndex((obj) => parseInt(obj.id) === parseInt(id));
}

// Add Issue - CREATE (C)
export function addIssue(issue){
    return (dispatch) => {
        AsyncStorage.getItem('issues', (err, issues) => {            
            if (issues !== null){
                issues = JSON.parse(issues);
                issues.unshift(issue);
                AsyncStorage.setItem('issues', JSON.stringify(issues), () => {
                    dispatch({type: ADD_ISSUE, issue:issue});
                });
            }
        });
    };
}

// Get Data - READ (R)
export function getIssues(){    
    return (dispatch) => {
        AsyncStorage.getItem('issues', (err, issues) => { 
            console.log(issues)
            if (issues !== null){
                dispatch({type: ISSUES_AVAILABLE, issues: JSON.parse(issues)});
            }
        });
    };
}

// Update Issue - UPDATE (U)
export function updateIssue(issue){
    return (dispatch) => {
        AsyncStorage.getItem('issues', (err, issues) => {
            if (issues !== null){
                issues = JSON.parse(issues);
                var index = getIndex(issues, issue.id); //find the index of the issue with the id passed
                if (index !== -1) {
                    issues[index]['title'] = issue.author;
                    issues[index]['description'] = issue.issue;
                }
                AsyncStorage.setItem('issues', JSON.stringify(issues), () => {
                    dispatch({type: UPDATE_ISSUE, issue:issue});
                });
            }
        });
    };
}

// Delete Issue - DELETE (D)
export function deleteIssue(id){
    return (dispatch) => {
        AsyncStorage.getItem('issues', (err, issues) => {
            if (issues !== null){
                issues = JSON.parse(issues);

                var index = getIndex(issues, id); //find the index of the issue with the id passed
                if(index !== -1) issues.splice(index, 1);//if yes, undo, remove the ISSUE
                AsyncStorage.setItem('issues', JSON.stringify(issues), () => {
                    dispatch({type: DELETE_ISSUE, id:id});
                });
            }
        });
    };
}