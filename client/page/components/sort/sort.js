import styles from './sort.css';

Template.sort.helpers({
    styles: styles,
    sortLists:function()
    {
        var lsFilter = [
          {text:"Price - Lowest",value:"S1"},
          {text:"Price - Highest",value:"S2"},
          {text:"Rating - Lowest",value:"S3"},
          {text:"Rating - Highest",value:"S4"},
          {text:"Education Level - Lowest",value:"S5"},
          {text:"Education Level - Highest",value:"S6"}
        ];
        return lsFilter;
    },
    compareCount:function(){
      var currentCompareCount = Session.get("selectedCompareList");
      if(currentCompareCount && currentCompareCount.length>0)
      {
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
      if(currentCompareCount && currentCompareCount.length>0)
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
