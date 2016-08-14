import styles from './detailPage.css';
import {
  NUM_TO_MONTH_MAP
} from '../components/constants/map';

if(Meteor.isClient)
{
  Template.detailPage.onCreated(function() {
      Meteor.subscribe('allCourses', function() {
      });
  });
  Template.detailPage.helpers({
      styles: styles,
      courseInformation:function(){
        if(Router.current().params.query.id != "")
        {
          let detail = Course.find({
              _id: Router.current().params.query.id
          }).fetch();
          return detail;
        }
        else {
          Router.go('/');
        }
      },
      setCourseDuration: function(max,min){
        var word = "";
        if(min>48 && max>48){
          var word = " year(s)";
        }
        else {
          var word = " week(s)";
        }
        if(min!=max){
          return (min/48)+"~"+(max/48) + word ;
        }
        else {
          return (min/48) + word ;
        }
      },
      setArrayToString:function(array){
        var returnString = array.map(function(obj) {
          if(obj.month){
            return " "+NUM_TO_MONTH_MAP[obj.month];
          }
          else if(obj.text){
            return " "+obj.text;
          }
          else {
            return " "+obj.value;
          }
        });
        return returnString.toString();
      }

  });

  Template.detailPage.onRendered(function(){

  });

  Template.detailPage.events({

  });
}
