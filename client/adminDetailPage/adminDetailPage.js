import styles from './adminDetailPage.css';
import {MONTH_LIST} from '../components/constants/FormData';
import {DELIVERY_MODE_LIST} from '../components/constants/FormData';
import {STUDY_MODE_LIST} from '../components/constants/FormData';
import {QUALIFICATION_LIST} from '../components/constants/FormData';

Template.adminDetailPage.helpers({
    styles: styles,
    studyModeLists:function()
    {
      // var ls = [
      //   {text:"Full Time",value:"FT"},
      //   {text:"Part Time",value:"PT"},
      //   {text:"Self-Paced",value: "SP"}
      // ];
      return STUDY_MODE_LIST;
    },
    deliveryModeLists:function()
    {
      // var ls = [
      //   {text:"Online",value:"O"},
      //   {text:"Lecture",value:"L"},
      //   {text:"Collaborating",value: "C"}
      // ];
      return DELIVERY_MODE_LIST;
    },
    monthLists:function()
    {
      // var ls = [
      //   {text:"January",value:"1"},
      //   {text:"February",value:"2"},
      //   {text:"March",value: "3"},
      //   {text:"April",value:"4"},
      //   {text:"May",value:"5"},
      //   {text:"June",value: "6"},
      //   {text:"July",value:"7"},
      //   {text:"August",value:"8"},
      //   {text:"September",value: "9"},
      //   {text:"October",value:"10"},
      //   {text:"November",value:"11"},
      //   {text:"December",value: "12"}
      // ];
      return MONTH_LIST;
    },
    qualificationLevelLists:function()
    {
      // var ls = [
      //   {text:"PHD",value:"1"},
      //   {text:"Masters",value:"2"},
      //   {text:"Bachelor",value: "3"},
      //   {text:"Diploma",value:"4"},
      //   {text:"Foundation",value:"5"},
      //   {text:"Certificate",value: "6"}
      // ];
      return QUALIFICATION_LIST;
    },
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
  'mouseenter .addHoverEvent':function(evt, res){
    $(evt.currentTarget).removeClass('fa-plus-square');
    $(evt.currentTarget).addClass('fa-plus-square-o');
  },
  'mouseleave .addHoverEvent':function(evt, res){
    $(evt.currentTarget).removeClass('fa-plus-square-o');
    $(evt.currentTarget).addClass('fa-plus-square');
  },
  'mouseenter .removeHoverEvent':function(evt, res){
    $(evt.currentTarget).removeClass('fa-minus-square');
    $(evt.currentTarget).addClass('fa-minus-square-o');
  },
  'mouseleave .removeHoverEvent':function(evt, res){
    $(evt.currentTarget).removeClass('fa-minus-square-o');
    $(evt.currentTarget).addClass('fa-minus-square');
  },

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
