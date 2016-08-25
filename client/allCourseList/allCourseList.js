import styles from './allCourseList.css';

if(Meteor.isClient)
{
  Template.allCourseList.onCreated(function() {
    Meteor.subscribe('allCourses', function() {
    });
    Meteor.subscribe('userData', function() {
    });
  });
  Template.allCourseList.helpers({
      styles: styles,
      allCourse:function(){
        var courses = [];
        courses = Course.find({}).fetch();
        console.log(courses);
        return courses;
      },
      countList:function(arr){
        console.log(arr.length);
        var count = arr.length;
        return count.toString();
      },
      getUserData:function(arr){
        var arrList = [];
        for(var i = 0;i<arr.length;i++){
          arrList.push(arr[i].createdBy);
        }
        arrList = User_data.find({"createdBy":{$in:arrList}}).fetch();
        for(var j = 0 ; j < arrList.length ; j++){
          arrList[j].follower = "Iskandar";
        }
        return arrList;
      }

  });

  Template.allCourseList.onRendered(function(){

  });

  Template.allCourseList.events({
    "click #addNewCourse":function(evt, res) {
        evt.preventDefault();
        Router.go("adminDetailPage");
    },
    "click #showLead":function(evt, res) {
        evt.preventDefault();
        console.log("#td_detail_"+evt.currentTarget.name);
        console.log($("#td_detail_"+evt.currentTarget.name));
        $("#td_detail_"+evt.currentTarget.name).css("display","inline");
    }
  });
}
