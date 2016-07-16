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
    }
});
