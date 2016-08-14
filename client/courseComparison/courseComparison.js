import styles from './courseComparison.css';
import {
  NUM_TO_MONTH_MAP
} from '../components/constants/map';

Template.courseComparison.created = function() {
    console.log(Session.get("selectedCompareList"));
}

Template.cardContainer.created = function() {
    let compareList = Session.get("selectedCompareList");

    if (compareList) {
        let detailList = Course.find({
            _id: {
                $in: compareList
            }
        }).fetch();
        if(detailList.length<=0)
        {
          Router.go('/');
        }
        Session.set("courseDetails", detailList);
    }
    else {
      Router.go('/');
    }
}

Template.cardContainer.helpers({
    styles: styles,
    courseList: function() {
        return Session.get("courseDetails");
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
    },
    setArrayToList:function(array){
      var returnString = array.map(function(obj) {
        if(obj.month){
          return "- "+NUM_TO_MONTH_MAP[obj.month]+"<br/>";
        }
        else if(obj.text){
          return "- "+obj.text+"<br/>";
        }
        else {
          return "- "+obj.value+"<br/>";
        }
      });
      console.log(returnString.join(""));
      return new Handlebars.SafeString(returnString.join(""));
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
    }
});
