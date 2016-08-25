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
