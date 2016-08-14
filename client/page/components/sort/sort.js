import styles from './sort.css';

Template.sort.helpers({
    styles: styles,
    sortLists:function()
    {
        var lsFilter = [
          {text:"Rating - Lowest",value:"S1"},
          {text:"Rating - Highest",value:"S2"},
          {text:"Education Level - Lowest",value:"S3"},
          {text:"Education Level - Highest",value:"S4"}
        ];
        return lsFilter;
    },
    compareCount:function(){
      var currentCompareCount = Session.get("selectedCompareList");
      if(currentCompareCount && currentCompareCount.length>0)
      {
        if(currentCompareCount.length>=2){
          $("#btnCompare").removeClass("_client_page_components_sort__sort__btnCompare");
          $("#btnCompare").addClass("_client_page_components_sort__sort__btnCompareGreen");
        }
        else {
          $("#btnCompare").removeClass("_client_page_components_sort__sort__btnCompareGreen");
          $("#btnCompare").addClass("_client_page_components_sort__sort__btnCompare");
        }
        return currentCompareCount.length;
      }
      else {
        return null;
      }

    }
});

Template.sort.events({

    "click #btnCompare": function(evt, res) {
      var currentCompareCount = Session.get("selectedCompareList");
      if(currentCompareCount && currentCompareCount.length>=2)
      {
        if(currentCompareCount.length<5)
        {
          Router.go('courseComparison');
        }
        else {
          alert("Maximun only can compare 5 courses at the same time.");
        }
      }
      else {
        alert("Please at least select more than 2 for compare.");
      }
    }
});
