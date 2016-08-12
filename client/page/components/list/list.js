import styles from './list.css';
import {
    COURSE_LIST
} from '../../../components/constants/data';
import {
  MONTH_MAP
} from '../../../components/constants/map';

if (Meteor.isClient) {
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
        courseList: function() {
            var searchCriteria = Session.get("searchCriteria");
            console.log("searchCriteria in list page");
            console.log(searchCriteria);

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
              console.log(searchObject);
              courses = Course.find(searchObject).fetch();
            }

            for(var course in courses){
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
            }
            return courses;
        },
        setLocation: function(location) {
            var locationString = location.map(function(obj) {
                return obj.text
            });
            return locationString.toString();
        }
    });

    Template.list.events({
        'click #compare-link': function(evt, res) {
            evt.preventDefault();
            var currentId = $(evt.currentTarget).data().id;
            if (selectedCompareList.indexOf(currentId) > -1) {
                selectedCompareList = selectedCompareList.filter(function(selectedIds) {
                    return selectedIds != currentId
                });
            } else {
                selectedCompareList.push(currentId);
            }
            Session.set("selectedCompareList", selectedCompareList);
            console.log(selectedCompareList);
            var Item = $(evt.currentTarget).find("i");
            if (Item.hasClass("fa-check-circle-o")) {
                Item.removeClass("fa-check-circle-o");
                Item.addClass("fa-check-circle");
                Item.css("color", "#4EB947");
            } else {
                Item.removeClass("fa-check-circle");
                Item.addClass("fa-check-circle-o");
                Item.css("color", "#8A8A8A");
            }
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
