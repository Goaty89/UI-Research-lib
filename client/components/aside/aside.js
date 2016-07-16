import styles from './aside.css';

if (Meteor.isClient) {
    Template.registerHelper('styles', function() {
        // code
       return styles;
    });

    Template.asideNav.events({
        'submit #filter-form': function(e) {
            e.preventDefault();
            this.collegeName = e.target.cbxCollege.value;
            this.courseCategory = e.target.cbxCourseCategory.value;
            this.courseName = e.target.txtCourseName.value;
            this.eduLevel = e.target.txtEduLevel.value;
            this.location = e.target.txtLocation.value;
            this.price = e.target.txtPrice.value;
            this.rating = e.target.txtRating.value;
            console.log(this);
        }
    });

    Template.asideNav.onRendered( function() {
        //debugger

    });
}

