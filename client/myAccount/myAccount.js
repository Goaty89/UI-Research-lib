import styles from './myAccount.css';

import {
  NUM_TO_MONTH_MAP,
  QUALIFICATION_LIST
} from '../components/constants/map';

Template.myAccount.created = function() {

}

Template.cardAccount.created = function() {
  Meteor.subscribe('Enquiries', function() {
  });
  Meteor.subscribe('userData', function() {
  });
  var user = User_data.find({createdBy:Meteor.userId()}).fetch();
  console.log("user::"+user);

}
Template.cardAccount.rendered = function(){
  console.log(Meteor.userId());
  var user = User_data.find({createdBy:Meteor.userId()}).fetch();
  console.log("user::"+user);
  $("[name='fname']").val(user.firstName);
  console.log($("[name='fname']"));
  $("[name='lname']").val(user.lastName);
  $("[name='email']").val(user.email);
  $("[name='phoneNumber']").val(user.phoneNumber);
};

Template.cardAccount.helpers({
    styles: styles,
    List: function () {
        return QUALIFICATION_LIST;
    }
});
Template.cardAccount.events({

});
