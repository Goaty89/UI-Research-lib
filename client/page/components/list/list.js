import styles from './list.css';
import {
    COURSE_LIST
} from '../../../components/constants/data';

// var COURSE_LIST = [{
//     id: "c1",
//     courseName: "Bachelor Degree in Computer Science",
//     rating: [1, 2, 3, 4, 5],
//     schoolName: "Multimedia University (MMU)",
//     location: "Cyberjaya",
//     minFees: "30,000",
//     maxFees: "60,000"
// }, {
//     id: "c2",
//     courseName: "Bachelor Degree in Information Systems",
//     rating: [1, 2, 3, 4],
//     schoolName: "Multimedia University (MMU)",
//     location: "Melaka",
//     minFees: "30,000",
//     maxFees: "60,000"
// }, {
//     id: "c3",
//     courseName: "Bachelor Degree in Information Technology",
//     rating: [1, 2, 3],
//     schoolName: "Multimedia University (MMU)",
//     location: "Cyberjaya",
//     minFees: "30,000",
//     maxFees: "60,000"
// }, {
//     id: "c4",
//     courseName: "Bachelor Degree in Psychology",
//     rating: [1, 2, 3, 4, 5],
//     schoolName: "Multimedia University (MMU)",
//     location: "Melaka",
//     minFees: "30,000",
//     maxFees: "60,000"
// }];

if (Meteor.isClient) {
    Template.list.onCreated(function() {
        Meteor.subscribe('allCourses', function() {
            console.log(Course.find().count());
        });
    });

    Template.list.created = function() {
        Session.set("selectedCompareList", null);
        selectedCompareList = [];
    };

    Template.list.helpers({
        styles: styles,
        courseList: function() {
            //console.log(COURSE_LIST);
            console.log(Course.find().fetch());
            return Course.find().fetch();
        },
        setLocation: function(location) {
            var locationString = location.map(function(obj) {
                return obj.text
            });
            console.log(locationString);
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
            //console.log(Item);
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