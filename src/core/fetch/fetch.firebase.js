import Firebase from 'firebase';   
import FirebaseAction from '../../actions/FirebaseActions.js'

var FirebaseFetcher = {
 init: function(){
  var firebaseRef = new Firebase("https://ariot2016.firebaseio.com/");
  firebaseRef.child("temperatures").on("child_added", function(dataSnapshot) {
    FirebaseAction.firebaseData(dataSnapshot.val());
  });
  firebaseRef.child("pictures").on("child_added", function(dataSnapshot) {
    FirebaseAction.receivedCameraData(dataSnapshot.val());
  });
  firebaseRef.child("humidity").on("child_added", function(dataSnapshot) {
    FirebaseAction.receivedHumidityData(dataSnapshot.val());
  });
  firebaseRef.child("barometricpressure").on("child_added", function(dataSnapshot) {
    FirebaseAction.receivedBarometerData(dataSnapshot.val());
  });

  }
} 
export default FirebaseFetcher;