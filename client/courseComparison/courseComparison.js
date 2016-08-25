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
    },
    checkInquiryList:function(id,inquiryList)
    {
      if(inquiryList)
      {
        var list = JSON.stringify(inquiryList);
        if(list && list.indexOf(Meteor.userId())>0){
          return new Handlebars.SafeString("<button name=\""+id+"\" class=\"_client_page_components_list__list__btnInquiryClicked\" style=\"border:0px;\"><i class=\"fa fa-check\" aria-hidden=\"true\" style=\"margin-right:1em;\"></i>Enquired</button>");;
        }
        else {
          return new Handlebars.SafeString("<button id=\"btnInquiry\" name=\""+id+"\" class=\"_client_page_components_list__list__btnInquiry\" style=\"border:0px;\">Enquire</button>");
        }
      }
      else {
          return new Handlebars.SafeString("<button id=\"btnInquiry\" name=\""+id+"\" class=\"_client_page_components_list__list__btnInquiry\" style=\"border:0px;\">Enquire</button>");
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
    if(Meteor.userId())
    {
      var userData = User_data.find({createdBy:Meteor.userId()}).fetch();
      var courseData = Course.find({_id:evt.currentTarget.name}).fetch();
      var Inquiry = {};
      Inquiry.userDetailInfor = userData;
      Inquiry.courseId = evt.currentTarget.name;
      Inquiry.courseDetailInfor = courseData;
      Meteor.call("insertInquiry",Inquiry, function (error,results)
      {
          if(error){
            console.log(error);
          }
          else {
            console.log("data been save");
            Meteor.call("updateInquiryCandidate",evt.currentTarget.name,Meteor.userId(), function (error,results){
                if(error)
            {
                console.log(error);
            }
            else{
                    let compareList = Session.get("selectedCompareList");
                    if (compareList) {
                        let detailList = Course.find({
                            _id: {
                                $in: compareList
                            }
                        }).fetch();
                        Session.set("courseDetails", detailList);
                    }
                }
            });


          }
      });
    }
    else {
      $('#loginRegisterModal').modal('show');
    }
  }
});
