// This is the SERVICE that sends requests to the server
"use strict";


clientApp.service('talkToServer', function($http)
{
    this.getFamilyMembers = function( onSuccess, onError ) 
    {
        $http.get('/family').then( onSuccess, onError);
    }

    this.getTasks = function( onSuccess, onError ) 
    {
        $http.get('/tasks').then(  onSuccess, onError);
    }

    this.createTask = function( newTask, onSuccess, onError ) 
    {
       $http.post('/tasks', {'description': newTask.description, 'family_member_id': newTask.family_member_id} ).then(  onSuccess, onError);
    }

    this.delete = function(id, onSuccess, onError ) 
    {
        let params = {'id': id};
        $http.delete('/tasks', params).then(  onSuccess, onError);
    }

    

});