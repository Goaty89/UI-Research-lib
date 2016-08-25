import styles from './myEnquiriesAside.css';

Template.myEnquiriesAside.helpers({
    styles: styles
});

Template.myEnquiriesAside.events({
  "click #btnEnquiries":function(evt, res){
    evt.preventDefault();
    $("#btnEnquiries").css("font-weight","bold");
    $("#btnAccount").css("font-weight","");
    Router.go("MyEnquiries");
  },
  "click #btnAccount":function(evt, res){
    evt.preventDefault();
    $("#btnEnquiries").css("font-weight","");
    $("#btnAccount").css("font-weight","bold");
    Router.go("AccountDetail");
  }
});

if (Meteor.isClient) {

}
