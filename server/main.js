import {
    Meteor
} from 'meteor/meteor';

Meteor.publish('allCourses', function() {
    //  console.log("Publishing; ", Course.find());
    return Course.find();
});


Meteor.methods({
    insertCourse: function(course) {
        Course.insert({
            course: course.course,
            courseImgUrl: course.courseImgUrl,
            qualification: course.qualification,
            courseDurationMax: parseInt(course.courseDurationMax),
            courseDurationMin: parseInt(course.courseDurationMin),
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
    },
    insertToUser_data: function(userDetails) {
        User_data.insert({
            createdDate: new Date(),
            createdBy: Meteor.userId(),
            email: userDetails.email,
            phoneNumber: userDetails.phone,
            qualificationLvl: userDetails.qualification
        });
    }
});