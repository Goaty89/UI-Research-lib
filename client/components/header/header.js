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
    Meteor.subscribe('userData', function() {
    });
});

Template.signInSystem.helpers({
    isGuest: function(){
        if(Meteor.userId()){
            return User_data.findOne({createdBy: Meteor.userId()});
        }
        return null;
    }
});

Template.signInSystem.events({
   'click #mt-command-dd': function (evt){
       $(evt.target.parentNode.parentElement).find(".dropdown-menu").toggle();
   },
    'click .urlRedirect': function (evt){
        $(evt.target.parentNode.parentElement).toggle();
    },
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});