import styles from './list.css';
import {
    COURSE_LIST
} from '../../../components/constants/data';
import {
  MONTH_MAP
} from '../../../components/constants/map';

if (Meteor.isClient) {
    var MAX_COLUMN_PER_PAGE = 6;
    Template.list.onCreated(function() {
        Meteor.subscribe('allCourses', function() {
        });
    });

    Template.list.created = function() {
        Session.set("selectedCompareList", null);
        selectedCompareList = [];
    };

    Template.list.helpers({
        styles: styles,
        allCoursesList:function(){
          var searchCriteria = Session.get("searchCriteria");

          var searchObject = {};
          if(searchCriteria)
          {
            if(searchCriteria.collegeName.length>0){
              searchObject.provider = {$in:searchCriteria.collegeName}
            }
            if(searchCriteria.courseCategory != "ANY"){
              searchObject.qualificationCategory = searchCriteria.courseCategory;
            }
            if(searchCriteria.courseName != ""){
              searchObject.qualification = {$regex:searchCriteria.courseName.toUpperCase()};
            }
            if(searchCriteria.location != ""){
              searchObject.location = {$elemMatch:{"text":{$regex:searchCriteria.location}}};
            }
            if(searchCriteria.courseDuration != ""){
              searchObject.courseDurationMin = {$lte: (searchCriteria.courseDuration * 48) }
            }
            if(searchCriteria.intakeMonth != "")
            {
              var month = MONTH_MAP[searchCriteria.intakeMonth];
              searchObject.intake = {$elemMatch:{"month":MONTH_MAP[searchCriteria.intakeMonth]}};
            }
          }

          var courses = [];
          if(searchObject != {})
          {
            courses = Course.find(searchObject).fetch();
          }
          return courses;
        },
        courseList: function(courses) {
            var returnCourses = [];
            var start = Session.get("pageNum")?Session.get("pageNum")-1:0;

            for(var course = start; course < courses.length;course++){
              if(returnCourses.length<MAX_COLUMN_PER_PAGE)
              {
                var  c = courses[course];
                c.rating = [1,2,3,4,5];
                if(c.courseDurationMax == c.courseDurationMin)
                {
                  if(c.courseDurationMin>=48)
                  {
                    c.courseDurationDisplay = (c.courseDurationMin/48) + " year(s)";
                  }
                  else{
                    c.courseDurationDisplay = c.courseDurationMin + " week(s)"
                  }
                }
                else{
                  if(c.courseDurationMax>=48 && c.courseDurationMin>=48)
                  {
                    c.courseDurationDisplay = (c.courseDurationMin/48) + " ~ " + (c.courseDurationMax/48) + " year(s)";
                  }
                  else {
                    c.courseDurationDisplay = c.courseDurationMin + " ~ " + c.courseDurationMax + " week(s)";
                  }
                }
                returnCourses.push(c);
              }
            }
            return returnCourses;
        },
        setLocation: function(location) {
            var locationString = location.map(function(obj) {
                return obj.text
            });
            return locationString.toString();
        },
        setPaging: function(list)
        {
          if(list.length<MAX_COLUMN_PER_PAGE){
            return [{page:1}];
          }
          else {
            var page = (list.length)/MAX_COLUMN_PER_PAGE;
            var mod = (list.length)%MAX_COLUMN_PER_PAGE;
            page = (mod==0)?page:page+1;
            var returnValue = [];
            for(var i = 0;i < page; i++)
            {
              returnValue.push({page:i+1});
            }
            return returnValue;
          }
        },
        pageNumber:function(num)
        {
          if(Router.current().params.query.page && Router.current().params.query.page != num)
          {
            return false;
          }
          else
          {
            return true;
          }
        }
    });

    Template.list.events({
        'click #compare-link': function(evt, res) {
            evt.preventDefault();
            var compareCount = Session.set("selectedCompareList");

            if(compareCount && compareCount.length>=5){
              alert("Maximun compare only can be 5");
            }
            else {
              var currentId = $(evt.currentTarget).data().id;
              if (selectedCompareList.indexOf(currentId) > -1) {
                  selectedCompareList = selectedCompareList.filter(function(selectedIds) {
                      return selectedIds != currentId
                  });
              } else {
                  selectedCompareList.push(currentId);
              }
              Session.set("selectedCompareList", selectedCompareList);
              var Item = $(evt.currentTarget).find("i");
              if (Item.hasClass("fa-circle-o")) {
                  Item.removeClass("fa-circle-o");
                  Item.addClass("fa-check-circle");
                  Item.css("color", "#4EB947");
              } else {
                  Item.removeClass("fa-check-circle");
                  Item.addClass("fa-circle-o");
                  Item.css("color", "#8A8A8A");
              }
            }
        },
        "click #learnMore":function(evt, res){
          evt.preventDefault();
          Router.go("detailPage",{},{query:"id="+evt.currentTarget.name});
        },
        "click #btnPage":function(evt, res){
          evt.preventDefault();
          Session.set("pageNum",evt.currentTarget.name);
        }
    });

    Template.btnCompare.events({
        "click #btnCompare": function(evt, res) {
            Router.go('courseComparison');
        }
    });
}

if (Meteor.isServer) {

}
