import styles from './myEnquiries.css';

import {
  NUM_TO_MONTH_MAP
} from '../components/constants/map';

Template.myEnquiries.created = function() {

}

Template.cardEnquiries.created = function() {
  Meteor.subscribe('Enquiries', function() {
  });
}

Template.cardEnquiries.helpers({
    styles: styles,
    inquiryList:function(){
      var returnArr = [];
      var inquiryList = Inquiry.find({"createdBy":Meteor.userId()}).fetch();
      for(var i=0;i<inquiryList.length;i++)
      {
        var dateFormat = new Date(inquiryList[i].createdDate);
        var dateMonthYear = dateFormat.getDate() +" "+ NUM_TO_MONTH_MAP[dateFormat.getMonth()+1] +" "+ dateFormat.getFullYear();
        returnArr.push({createdDate:dateMonthYear,courseName:inquiryList[i].courseDetailInfor[0].qualification,courseId:inquiryList[i].courseId});
      }
      console.log(returnArr);
      return returnArr;
    }
});
Template.cardEnquiries.events({
  "click #btnCourseName":function(evt, res){
    evt.preventDefault();
    Router.go("detailPage",{},{query:"id="+evt.currentTarget.name});
  }
});
