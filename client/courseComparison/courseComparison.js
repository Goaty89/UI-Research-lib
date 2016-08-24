import styles from './courseComparison.css';
import {
  NUM_TO_MONTH_MAP
} from '../components/constants/map';

Template.courseComparison.created = function() {
    console.log(Session.get("selectedCompareList"));
    Meteor.subscribe('allCourses', function() {
    });
}

Template.cardContainer.created = function() {

    function getMaxArrayLength(arr, prop) {
        var max;
        for (var i=0 ; i<arr.length ; i++) {
            if (!max || parseInt(arr[i][prop].length) > parseInt(max[prop].length))
                max = arr[i];
        }
        return max[prop].length;
    }
    function getMin(arr, prop) {
        var min;
        for (var i=0 ; i<arr.length ; i++) {
            if (!min || parseInt(arr[i][prop]) < parseInt(min[prop]))
                min = arr[i];
        }
        return min[prop];
    }

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

        let maxList={};
        maxList.durationMin = getMin(detailList,"courseDurationMin");
        maxList.deliveryMode = getMaxArrayLength(detailList,"deliveryMode");
        maxList.studyMode = getMaxArrayLength(detailList,"studyMode");
        maxList.intake = getMaxArrayLength(detailList,"intake");
        maxList.location = getMaxArrayLength(detailList,"location");
        maxList.careerOutcomes = getMaxArrayLength(detailList,"careerOutcomes");

        Session.set("courseDetails", detailList);
        Session.set("maxListDetails", maxList);
        console.log(maxList);
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
    },
    isBestChoiceArray: function(arr,key){
      var max = Session.get("maxListDetails");
      if(arr.length == max[key])
      {
        return true;
      }
      else {
        return false;
      }
    },
    isBestChoice: function(value,key){
      var max = Session.get("maxListDetails");
      if(max[key] == value){
        return true;
      }
      else {
        return false;
      }

    }
});
Template.cardContainer.events({
  'click #learnMore':function(evt, res){
    evt.preventDefault();
    Router.go("detailPage",{},{query:"id="+evt.currentTarget.name});
  },
  "click #btnInquiry":function(evt,res){
    evt.preventDefault();
    $('#loginRegisterModal').modal('show');
  }
});
