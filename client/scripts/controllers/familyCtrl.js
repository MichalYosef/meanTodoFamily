  // family controller
  "use strict";

  clientApp.controller('familyCtrl', function($scope,  talkToServer)
  {
      // $scope.description ='';
      talkToServer.getFamilyMembers( 
          function( response){ $scope.family_members = response.data },  //onSuccess
          function(response){ console.log('error ' + response.data )} // onError
      )

  })