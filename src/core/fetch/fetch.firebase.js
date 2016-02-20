import Firebase from 'firebase';   
import FirebaseAction from '../../actions/FirebaseActions.js'

var FirebaseFetcher = {
 init: function(){
  var firebaseRef = new Firebase("https://ariot2016.firebaseio.com/");
  firebaseRef.child("temperatures").on("child_added", function(dataSnapshot) {
    FirebaseAction.firebaseData(dataSnapshot.val());
  });

  }
} 
export default FirebaseFetcher;