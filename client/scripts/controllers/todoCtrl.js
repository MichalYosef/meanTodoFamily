// tasks controller

"use strict";

clientApp.controller('todoCtrl', function($scope,  talkToServer)
{
    
    talkToServer.getTasks( 
        function( response){ $scope.tasks = response.data },  //onSuccess
        function(response){ console.log('error ' + response.data )} // onError
    )

   
    $scope.remove = function(id){

        talkToServer.delete( 
            id, 
            function( response){ //onSuccess
                $scope.family_members = response.data 
            },  
            function(response){  // onError
                console.log('error ' + response.data ); 
                throw response;
            }
        );    
    }   
});
