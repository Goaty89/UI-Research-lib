import styles from './aside.css';
const MAXPRICE = 1000.00;
const MINPRICE = 0.00;
if (Meteor.isClient) {
    // slider starts at 0 and 100
    Session.setDefault("slider", ["RM " + MINPRICE, "RM " + MAXPRICE]);

    Template.PriceFilter.rendered = function() {
        this.$("#slider").noUiSlider({
            start: Session.get("slider"),
            step: 10, // Slider moves in increments of '10'
            margin: 20, // Handles must be more than '20' apart
            connect: true,
            behaviour: 'tap-drag', // Move handle on tap, bar is draggable
            range: {
                'min': MINPRICE,
                'max': MAXPRICE
            },
            pips: {
                mode: 'range',
                density: 3
            },
            format: wNumb({
                decimals: 2,
                thousand: ',',
                prefix: 'RM ',
            })
        }).on('slide', function(ev, val) {
            // set real values on 'slide' event
            Session.set('slider', val);
        }).on('change', function(ev, val) {
            // round off values on 'change' event
            Session.set('slider', [val[0], val[1]]);
        }).on('update', function(val, handle) {
            // round off values on 'update' event
            Session.set('slider', [val[handle], val[handle]]);
        });
    };

    Template.PriceFilter.helpers({
        slider: function() {
            return Session.get("slider");
        }
    });

    Template.registerHelper('styles', function() {
        // code
        return styles;
    });

    Template.asideNav.events({
        'submit #filter-form': function(e) {
            e.preventDefault();
            var eduLvlList = [];
            var convertToEducationLevelList = function(index, val) {
                eduLvlList.push(val.value);
            };
            $('.btn-eduLvl.active').each(convertToEducationLevelList);
            this.collegeName = e.target.cbxCollege.value;
            this.courseCategory = e.target.cbxCourseCategory.value;
            this.courseName = e.target.txtCourseName.value;
            this.eduLevelList = eduLvlList;
            this.location = e.target.txtLocation.value;
            this.price = Session.get("slider");
            this.rating = $('#rating').data('userrating');

            console.log(this);
        }
    });

    Template.asideNav.onRendered(function() {
        //debugger

    });

    Template.EduLevelFilter.helpers({
        buttonGroup: function() {
            var educationLevelList = [{
                title: "PHD"
            }, {
                title: "Masters"
            }, {
                title: "Bachelor"
            }, {
                title: "Diploma"
            }, {
                title: "Foundation"
            }];

            return educationLevelList;
        }
    });

    Template.EduLevelFilter.events({
        "click .btn-eduLvl": function(e) {
            e.preventDefault();
            e.target.classList.toggle("active");
            var currentEduLvl = e.target.id.toLowerCase();

        }
    });
}