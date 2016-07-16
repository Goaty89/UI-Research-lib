import styles from './filter.css';

Template.filter.helpers({
    styles: styles,
    listFilter:function()
    {
        var lsFilter = [
          {itemName:"Business Management"},
          {itemName:"Sunway College"},
          {itemName:"MMU"}
        ];
        return lsFilter;
    }
});

Template.filter.events({
  'click #btnDelete':function(evt, res)
  {
    evt.preventDefault();
    var Item = evt.currentTarget.parentNode;
    var Parent = Item.parentNode;
    Parent.removeChild(Item);
  }
});
