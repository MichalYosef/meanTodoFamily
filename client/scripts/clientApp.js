"use strict";

// Initialize angular client app
const clientApp = angular.module('todoApp',['ngRoute']);
     
 
clientApp.config( function( $routeProvider)
{
    $routeProvider.when("/",{
        templateUrl: '../views/todo.html',
        controller: 'todoCtrl'
    })
    .when("/addTodo",{
        templateUrl: '../views/addTodo.html',
        controller: 'addTodoCtrl'
    })
    .otherwise({redirectTo:'/'});

});
  

