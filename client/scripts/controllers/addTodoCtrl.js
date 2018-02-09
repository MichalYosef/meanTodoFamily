// tasks controller
"use strict";

clientApp.controller('addTodoCtrl', function($scope,  talkToServer)
{
    
    $scope.newtask={};
    
     // get family members to load into select for creating new task
     talkToServer.getFamilyMembers( 
            function( response){  //onSuccess
                $scope.familyMembers = response.data; 
            }, 
            function(response){  // onError
                console.log('error ' + response.data ); 
                // throw response;
            } 
        )
    
   

    $scope.create = function(){
        
        $scope.newtask.family_member_id = $scope.selectedFamilyMember;    
        var newTask = $scope.newtask;
        talkToServer.createTask( 
            newTask,
            function( response){  // onSuccess)
                console.log('create succeed' ); 
                // $scope.family_members = response.data 
                // $scope.newTask.description =''
            },  //onSuccess
            function(response){ // onError)
                console.log('error ' + response.data ); 
            } 
        )
    
    }

});
