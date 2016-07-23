import styles from './aside.css';

const DEFAULTMINMONTHS = 1;
const DEFAULTMAXMONTHS = 5;

if (Meteor.isClient) {
    // slider starts at 0 and 100
    Session.setDefault("slider", DEFAULTMINMONTHS);
    Session.setDefault("showLocation", true);
    
    Template.CourseDurationFilter.rendered = function() {
        this.$("#slider").noUiSlider({
            start: DEFAULTMINMONTHS,
            step: 1, // Slider moves in increments of '10'
           // margin: 20, // Handles must be more than '20' apart
            behaviour: 'tap-drag', // Move handle on tap, bar is draggable
            tooltips: true,
            connect: "lower",
            range: {
                'min': DEFAULTMINMONTHS,
                'max': DEFAULTMAXMONTHS
            },
            format: wNumb({
                decimals: 0
            })
        }).on('slide', function(ev, val) {
            // set real values on 'slide' event
            Session.set('slider', val);
        }).on('change', function(ev, val) {
            // round off values on 'change' event
            Session.set('slider', val);
        })
    };

    Template.CourseDurationFilter.helpers({
        slider: function() {
            var sliderString = Session.get("slider");
            sliderString = sliderString > 1 ? sliderString + " years" : sliderString + " year";
            return sliderString;
        }
    });

    Template.registerHelper('styles', function() {
        // code
        return styles;
    });

    Template.asideNav.helpers({
        showLocation: function() {
            return Session.get('showLocation');
        }
    });

    Template.asideNav.events({
        'submit #filter-form': function(e) {
            e.preventDefault();

            var convertToButtonActivedList = function(index, val) {
                var activedList = [];
                activedList.push(val.value);
                return activedList;
            };
            var eduLvlList = $('.btn-eduLvl.active').each(convertToButtonActivedList);
            var studyModeList = $('.btn-studyMode.active').each(convertToButtonActivedList);
            var deliveryModeList = $('.btn-deliveryMode.active').each(convertToButtonActivedList);

            this.collegeName = e.target.cbxCollege.value;
            this.courseCategory = e.target.cbxCourseCategory.value;
            this.courseName = e.target.txtCourseName.value;
            this.eduLevelList = eduLvlList;
            this.location = e.target.txtLocation ? e.target.txtLocation.value : '';
            this.courseDuration = Session.get("slider");
            this.rating = $('#rating').data('userrating');
            this.studyMode = studyModeList;
            this.deliveryMode = deliveryModeList;
            this.intakeMonth = e.target.cbxIntakeMonth.value;
            console.log(this);
        }
    });

    Template.asideNav.onRendered(function() {
        //debugger

    });

    Template.QualificationFilter.helpers({
        buttonGroup: function() {
            var educationLevelList = [{
                title: "Certificate"
            }, {
                title: "PHD"
            }, {
                title: "Masters"
            }, {
                title: "Diploma"
            }, {
                title: "Foundation"
            },{
                title: "Bachelor"
            }
            ];

            return educationLevelList;
        }
    });

    Template.QualificationFilter.events({
        "click .btn-eduLvl": function(e) {
            e.preventDefault();
            e.target.classList.toggle("active");
            var current = e.target.id.toLowerCase();

        }
    });
    Template.StudyModeFilter.helpers({
        buttonGroup: function() {
            var educationLevelList = [{
                title: "Full Time"
            }, {
                title: "Part Time"
            }];

            return educationLevelList;
        }
    });

    Template.StudyModeFilter.events({
        "click .btn-studyMode": function(e) {
            e.preventDefault();
            e.target.classList.toggle("active");
            var current = e.target.id.toLowerCase();

        }
    });

    Template.DeliveryModeFilter.helpers({
        buttonGroup: function() {
            var List = [{
                title: "Online"
            }, {
                title: "Lecturer"
            }, {
                title: "Collaborating"
            }, {
                title: "Self-Paced"
            }];

            return List;
        }
    });
    Template.DeliveryModeFilter.events({
        "click .btn-deliveryMode": function(e) {
            e.preventDefault();
            e.target.classList.toggle("active");
            var current = e.target.id.toLowerCase();
            Session.set('showLocation', true);

            if(current === "online" &&
              e.target.classList.contains("active") &&
              e.target.parentElement.querySelectorAll(".active").length === 1){
                Session.set('showLocation', false);
            }
        }
    })
    
    Template.IntakeMonthsFilter.helpers({
        intakeMonthList: function (){
            const MONTH_LIST = [
                {
                    "monthId": "jan",
                    "monthText": "January"
                },{
                    "monthId": "feb",
                    "monthText": "February"
                },{
                    "monthId": "mar",
                    "monthText": "March"
                },{
                    "monthId": "apr",
                    "monthText": "April"
                },{
                    "monthId": "may",
                    "monthText": "May"
                },{
                    "monthId": "jun",
                    "monthText": "June"
                },{
                    "monthId": "jul",
                    "monthText": "July"
                },{
                    "monthId": "aug",
                    "monthText": "August"
                },{
                    "monthId": "sep",
                    "monthText": "September"
                },{
                    "monthId": "oct",
                    "monthText": "Octorber"
                },{
                    "monthId": "nov",
                    "monthText": "November"
                },{
                    "monthId": "dec",
                    "monthText": "December"
                }

            ];
            return MONTH_LIST;
            console.log(MONTH_LIST);
        }
    })
}