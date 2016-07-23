import styles from './adminDetailPage.css';

Template.adminDetailPage.helpers({
    styles: styles,
    keyTopicLists:function()
    {
      if(Session.get("keyTopic").length > 0 ){
        return Session.get("keyTopic");
      }
      else {
        return [];
      }

    },
    preRequisitesLists:function()
    {
      if(Session.get("preRequisites").length > 0 ){
        return Session.get("preRequisites");
      }
      else {
        return [];
      }

    },
    careerOutcomesLists:function()
    {
      if(Session.get("careerOutcomes").length > 0 ){
        return Session.get("careerOutcomes");
      }
      else {
        return [];
      }

    }
});

Template.adminDetailPage.onRendered(function(){
  Session.set("preRequisites",[]);
  Session.set("keyTopic",[]);
  Session.set("careerOutcomes",[]);
});

Template.adminDetailPage.events({
  'click #btnAddKeyTopics':function(evt, res)
  {
    evt.preventDefault();
    var Item = $("#txtKeyTopics");
    if(Session.get("keyTopic") && Session.get("keyTopic").length > 0 )
    {
      var arr = Session.get("keyTopic");
      arr.push({text:Item.val(), id : arr[(arr.length - 1)].id + 1});
      Session.set("keyTopic",arr);
    }
    else {
      Session.set("keyTopic",[{text:Item.val(),id:0}]);
    }
    Item.val("");
  },
  'click #btnPreRequisites':function(evt, res)
  {
    evt.preventDefault();
    var Item = $("#txtPreRequisites");
    if(Session.get("preRequisites") && Session.get("preRequisites").length > 0 )
    {
      var arr = Session.get("preRequisites");
      arr.push({text:Item.val(), id : arr[(arr.length - 1)].id + 1});
      Session.set("preRequisites",arr);
    }
    else {
      Session.set("preRequisites",[{text:Item.val(),id:0}]);
    }
    Item.val("");

  },
  'click #btnCareerOutcomes':function(evt, res)
  {
    evt.preventDefault();
    var Item = $("#txtCareerOutcomes");
    if(Session.get("careerOutcomes") && Session.get("careerOutcomes").length > 0 )
    {
      var arr = Session.get("careerOutcomes");
      arr.push({text:Item.val(), id : arr[(arr.length - 1)].id + 1});
      Session.set("careerOutcomes",arr);
    }
    else {
      Session.set("careerOutcomes",[{text:Item.val(),id:0}]);
    }
    Item.val("");
  },
  'click [name=btnCareerOutComes]':function(evt, res)
  {
    evt.preventDefault();
    //evt.currentTarget.id
    var arr = Session.get("careerOutcomes");
    var output = [];
    for (var i = 0, len = arr.length; i < len; i++){
      if(arr[i].id != evt.currentTarget.id)
      {
        output.push(arr[i]);
      }
    }
    Session.set("careerOutcomes",output);
  },
  'click [name=btnPreRequisites]':function(evt, res)
  {
    evt.preventDefault();
    var arr = Session.get("preRequisites");
    var output = [];
    for (var i = 0, len = arr.length; i < len; i++){
      if(arr[i].id != evt.currentTarget.id)
      {
        output.push(arr[i]);
      }
    }
    Session.set("preRequisites",output);
  },
  'click [name=btnKeyTopicRemove]':function(evt, res)
  {
    evt.preventDefault();
    var arr = Session.get("keyTopic");
    var output = [];
    for (var i = 0, len = arr.length; i < len; i++){
      if(arr[i].id != evt.currentTarget.id)
      {
        output.push(arr[i]);
      }
    }
    Session.set("keyTopic",output);
  }
});
