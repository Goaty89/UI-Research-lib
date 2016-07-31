import { Meteor } from 'meteor/meteor';

Meteor.publish('allCourses', function() {
    //  console.log("Publishing; ", Course.find());
    return Course.find();
});


Meteor.methods({
    insertCourse: function(course) {
        Course.insert({
            course: course.course,
            qualification: course.qualification,
            courseDurationMax: course.courseDurationMax,
            courseDurationMin: course.courseDurationMin,
            deliveryMode: course.deliveryMode,
            studyMode: course.studyMode,
            intake: course.intake,
            qualificationLevel: course.qualificationLevel,
            qualificationCategory: course.qualificationCategory,
            provider: course.provider,
            location: course.location,
            keyTopic: course.keyTopic,
            careerOutcomes: course.careerOutcomes,
            preRequisites: course.preRequisites,
            partner: course.partner,
            createdDate: new Date()
        });
    }
});