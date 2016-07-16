import styles from './list.css';

Template.list.helpers({
    styles: styles,
    courseList:function()
    {
        var courseList = [
          {
            id:"c1",
            courseName:"Bachelor Degree in Computer Science",
            rating: [1,2,3,4,5],
            schoolName: "Multimedia University (MMU)",
            location: "Cyberjaya",
            minFees: "30,000",
            maxFees: "60,000"
          },
          {
            id:"c2",
            courseName:"Bachelor Degree in Information Systems",
            rating: [1,2,3,4],
            schoolName: "Multimedia University (MMU)",
            location: "Melaka",
            minFees: "30,000",
            maxFees: "60,000"
          },
          {
            id:"c3",
            courseName:"Bachelor Degree in Information Technology",
            rating: [1,2,3],
            schoolName: "Multimedia University (MMU)",
            location: "Cyberjaya",
            minFees: "30,000",
            maxFees: "60,000"
          },
          {
            id:"c4",
            courseName:"Bachelor Degree in Psychology",
            rating: [1,2,3,4,5],
            schoolName: "Multimedia University (MMU)",
            location: "Melaka",
            minFees: "30,000",
            maxFees: "60,000"
          }
        ];
        return courseList;
    }
});


Template.list.events({
  'click #btnCompare':function(evt, res)
  {
    evt.preventDefault();
    var Item = $(evt.currentTarget.childNodes[0]);
    if(Item.hasClass("fa-check-circle-o")){
      Item.removeClass("fa-check-circle-o");
      Item.addClass("fa-check-circle");
      Item.css( "color", "#4EB947");
    }
    else {
      Item.removeClass("fa-check-circle");
      Item.addClass("fa-check-circle-o");
      Item.css( "color", "#8A8A8A");
    }
    console.log(Item);
  }
});