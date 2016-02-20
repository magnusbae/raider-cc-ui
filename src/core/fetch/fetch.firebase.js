import Firebase from 'firebase';
import FirebaseAction from '../../actions/FirebaseActions.js'

var FirebaseFetcher = {
 init: function(){
  var firebaseRef = new Firebase("https://ariot2016.firebaseio.com/");
  firebaseRef.child("temperatures").limitToLast(1).on("child_added", function(dataSnapshot) {
    FirebaseAction.firebaseData(dataSnapshot.val());
  });
  firebaseRef.child("pictures").limitToLast(1).on("child_added", function(dataSnapshot) {
    FirebaseAction.receivedCameraData(dataSnapshot.val());
  });
  firebaseRef.child("humidity").limitToLast(1).on("child_added", function(dataSnapshot) {
    FirebaseAction.receivedHumidityData(dataSnapshot.val());
  });
  firebaseRef.child("barometricpressure").limitToLast(1).on("child_added", function(dataSnapshot) {
    FirebaseAction.receivedBarometerData(dataSnapshot.val());
  });
  firebaseRef.child("luxometer").limitToLast(1).on("child_added", function(dataSnapshot) {
    FirebaseAction.receivedAmbientLightData(dataSnapshot.val());
  });
  firebaseRef.child("droneStatus").limitToLast(1).on("child_added", function(dataSnapshot) {
    FirebaseAction.receivedDroneStatusData(dataSnapshot.val());
  });

  }
};

export default FirebaseFetcher;
