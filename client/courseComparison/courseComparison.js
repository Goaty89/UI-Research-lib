import styles from './courseComparison.css';

Template.courseComparison.created = function() {
    console.log(Session.get("selectedCompareList"));
}

Template.cardContainer.created = function() {
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

Template.cardContainer.helpers({
    styles: styles,
    courseList: function() {
        return Session.get("courseDetails");
    }
});