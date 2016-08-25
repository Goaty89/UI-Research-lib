import styles from "./header.css";

Template.header.helpers({
    styles: styles
});

Template.header.events({
  "click #btnLogin":function(evt,res){
    evt.preventDefault();
    $('#loginRegisterModal').modal('show');
  }
});

Template.signInSystem.onCreated(function() {

});

Template.signInSystem.helpers({
    isGuest: function(){
        console.log(Meteor.userId());
        if(Meteor.userId()){
            return User_data.findOne(Meteor.userId());
        }
        return "Guest";
    }
});