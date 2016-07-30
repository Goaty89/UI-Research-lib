import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  Course = new Mongo.Collection('course');
});
Meteor.methods({
  insertCourse:function(course){
    Course.insert({
      course:course.course,
      qualification:course.qualification,
      courseDurationMax:course.courseDurationMax,
      courseDurationMin:course.courseDurationMin,
      deliveryMode:course.deliveryMode,
      studyMode:course.studyMode,
      intake:course.intake,
      qualificationLevel:course.qualificationLevel,
      qualificationCategory:course.qualificationCategory,
      provider:course.provider,
      location:course.location,
      keyTopic:course.keyTopic,
      careerOutcomes:course.careerOutcomes,
      preRequisites:course.preRequisites,
      partner:course.partner
    });
  }
});
