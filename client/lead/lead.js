import styles from './lead.css';

if(Meteor.isClient)
{
  Template.leadPage.onCreated(function() {
  });
  Template.leadPage.helpers({
      styles: styles
  });

  Template.leadPage.onRendered(function(){

  });

  Template.leadPage.events({

  });
}
