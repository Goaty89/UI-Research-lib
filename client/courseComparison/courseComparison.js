Template.courseComparison.created = function() {
    console.log(Session.get("selectedCompareList"));
}

Template.cardContainer.created = function() {
    if (Session.get("selectedCompareList")) {

    }
}