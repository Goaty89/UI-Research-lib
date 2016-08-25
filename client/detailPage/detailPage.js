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
          return new Handlebars.SafeString("<button id=\"btnInquiry\" name=\""+id+"\" class=\"_client_page_components_list__list__btnInquiry\" style=\"border:0px;\">Enquire</button>");;
        }
      }

  });

  Template.detailPage.onRendered(function(){

  });

  Template.detailPage.events({
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
              Meteor.call("updateInquiryCandidate",evt.currentTarget.name,Meteor.userId(), function (error,results){if(error){console.log(error);}});

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
      else {
        $('#loginRegisterModal').modal('show');
      }
    }
  });
}
