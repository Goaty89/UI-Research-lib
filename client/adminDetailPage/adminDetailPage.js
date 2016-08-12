import styles from './adminDetailPage.css';
import {MONTH_LIST} from '../components/constants/FormData';
import {DELIVERY_MODE_LIST} from '../components/constants/FormData';
import {STUDY_MODE_LIST} from '../components/constants/FormData';
import {QUALIFICATION_LIST} from '../components/constants/FormData';
import {PROVIDER_LIST} from '../components/constants/FormData';
import {CATEGORY_LIST} from '../components/constants/FormData';

if(Meteor.isClient)
{
  Template.adminDetailPage.helpers({
      styles: styles,
      studyModeLists:function()
      {
        return STUDY_MODE_LIST;
      },
      deliveryModeLists:function()
      {
        return DELIVERY_MODE_LIST;
      },
      monthLists:function()
      {
        return MONTH_LIST;
      },
      qualificationLevelLists:function()
      {
        return QUALIFICATION_LIST;
      },
      providerLists:function()
      {
        return PROVIDER_LIST;
      },
      qualificationCategoryLists:function()
      {
        CATEGORY_LIST.shift();
        return CATEGORY_LIST;
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

      },
      locationLists:function()
      {
        if(Session.get("location").length > 0 ){
          return Session.get("location");
        }
        else {
          return [];
        }

      },
      partnerLists:function()
      {
        if(Session.get("partner").length > 0 ){
          return Session.get("partner");
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
    Session.set("location",[]);
    Session.set("partner",[]);
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
    'click #btnAddLocation':function(evt, res)
    {
      evt.preventDefault();
      var Item = $("#txtAddLocation");
      if(Session.get("location") && Session.get("location").length > 0 )
      {
        var arr = Session.get("location");
        arr.push({text:Item.val(), id : arr[(arr.length - 1)].id + 1});
        Session.set("location",arr);
      }
      else {
        Session.set("location",[{text:Item.val(),id:0}]);
      }
      Item.val("");
    },
    'click #btnAddPartner':function(evt, res)
    {
      function getPartnerInformation(key,id){
        var returnValue = {};
        $(PROVIDER_LIST).each(function(index,object){
          if(object.key === key)
          {
            object.id = id;
            returnValue = object;
          }
        });
        return returnValue;
      }
      evt.preventDefault();
      var Item = $("#dropDownPartner");
      if(Session.get("partner") && Session.get("partner").length > 0 )
      {
        var arr = Session.get("partner");
        var partnerDetail = getPartnerInformation(Item.val(),arr[(arr.length - 1)].id + 1);
        arr.push(partnerDetail);
        Session.set("partner",arr);
      }
      else {
        var partnerDetail = getPartnerInformation(Item.val(),0);
        Session.set("partner",[partnerDetail]);
      }
      console.log(Session.get("partner"));
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
    },
    'click [name=btnRemovePartner]':function(evt, res)
    {
      evt.preventDefault();
      var arr = Session.get("partner");
      var output = [];
      for (var i = 0, len = arr.length; i < len; i++){
        if(arr[i].id != evt.currentTarget.id)
        {
          output.push(arr[i]);
        }
      }
      Session.set("partner",output);
    },
    'click [name=btnRemoveLocation]':function(evt, res)
    {
      evt.preventDefault();
      var arr = Session.get("location");
      var output = [];
      for (var i = 0, len = arr.length; i < len; i++){
        if(arr[i].id != evt.currentTarget.id)
        {
          output.push(arr[i]);
        }
      }
      Session.set("location",output);
    },
    'submit form':function(evt, res){
      event.preventDefault();
      var selected = res.findAll( "input[type=checkbox]:checked");
      var intake = [];
      var studyMode = [];
      var deliveryMode = [];

      $(selected).each(function(index,object){
        switch(object.name){
          case "deliveryMode":
            deliveryMode.push({"value":object.value});
          break;
          case "studyMode":
            studyMode.push({"value":object.value});
          break;
          case "intake":
            intake.push({"month":object.value});
          break;
          default:
          break;
        }
      });

      var saveCourseInfromation = {};

      saveCourseInfromation.course = $('[name=txtCourse]').val();
      saveCourseInfromation.courseImgUrl = $('[name=txtCourseImageUrl]').val();
      saveCourseInfromation.qualification = $('[name=txtQualification]').val();
      saveCourseInfromation.courseDurationMax = $('[name=txtMaxCourseDuration]').val();
      saveCourseInfromation.courseDurationMin = $('[name=txtMinCourseDuration]').val();

      saveCourseInfromation.deliveryMode = deliveryMode;
      saveCourseInfromation.studyMode = studyMode;
      saveCourseInfromation.intake = intake;

      saveCourseInfromation.qualificationLevel = $('[name=qualificationLevel]').val();
      saveCourseInfromation.qualificationCategory = $('[name=qualificationCategory]').val();
      saveCourseInfromation.provider = $('[name=provider]').val();
      saveCourseInfromation.location = Session.get("location");
      saveCourseInfromation.keyTopic = Session.get("keyTopic");
      saveCourseInfromation.careerOutcomes = Session.get("careerOutcomes");
      saveCourseInfromation.preRequisites = Session.get("preRequisites");
      saveCourseInfromation.partner = Session.get("partner");
      console.log("saveCourseInfromation");
      console.log(saveCourseInfromation);

      Meteor.call("insertCourse",saveCourseInfromation, function (error,results)
      {
          if(error){
            console.log(error);
          }
          else {
            console.log("data been save");
            alert("data been save");
          }
      });

    }
  });
}
