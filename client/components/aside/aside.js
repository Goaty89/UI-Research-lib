import styles from './aside.css';
import {
    MONTH_LIST,
    QUALIFICATION_LIST,
    DELIVERY_MODE_LIST,
    STUDY_MODE_LIST,
    PROVIDER_LIST,
    CATEGORY_LIST
} from '../constants/FormData';

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

            var serachItem = {};
            Session.set("searchCriteria", serachItem);
            serachItem.collegeName = $(".typeahead[name='txtCollege']").tagsinput('items');
            serachItem.courseCategory = e.target.cbxCourseCategory.value;
            serachItem.courseName = e.target.txtCourseName.value;
            serachItem.eduLevelList = []; //eduLvlList;
            serachItem.location = e.target.txtLocation ? e.target.txtLocation.value : '';
            serachItem.courseDuration = Session.get("slider");
            // serachItem.rating = $('#rating').data('userrating');
            serachItem.studyMode = []; //studyModeList;
            serachItem.deliveryMode = []; //deliveryModeList;
            serachItem.intakeMonth = e.target.cbxIntakeMonth.value;
            Session.set("searchCriteria", serachItem);

            //change aside
            e.target.closest('[id^=tabContent]').classList.remove('active');
            document.getElementById("tabContent2").classList.add('active');

            console.log(serachItem);
        },
        'click [class$="btnBackToFilter"]': function(e) {
            e.preventDefault();
            e.target.closest('[id^=tabContent]').classList.remove('active');
            document.getElementById("tabContent1").classList.add('active');
        }
    });

    Template.QualificationFilter.helpers({
        buttonGroup: function() {
            return QUALIFICATION_LIST;
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
            return STUDY_MODE_LIST;
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
            return DELIVERY_MODE_LIST;
        }
    });
    Template.DeliveryModeFilter.events({
        "click .btn-deliveryMode": function(e) {
            e.preventDefault();
            e.target.classList.toggle("active");
            var current = e.target.id.toLowerCase();
            Session.set('showLocation', true);

            if (current === "online" &&
                e.target.classList.contains("active") &&
                e.target.parentElement.querySelectorAll(".active").length === 1) {
                Session.set('showLocation', false);
            }
        }
    })

    Template.IntakeMonthsFilter.helpers({
        intakeMonthList: function() {
            return MONTH_LIST;
        }
    })

    // Template.ProviderFilter.helpers({
    //     List: function() {
    //         return PROVIDER_LIST;
    //     }

    // })

    Template.ProviderFilter.rendered = function() {
        var college = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('key'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: PROVIDER_LIST
        });
        college.initialize();

        $('.typeahead').tagsinput({
            typeaheadjs: {
                name: 'collegeName',
                displayKey: 'label',
                valueKey: 'key',
                source: college.ttAdapter()
            }
        });
    }

    Template.CategoryFilter.helpers({
        List: function() {
            return CATEGORY_LIST;
        }
    })

    Template.filteredList.helpers({
        styles: styles,
        listFilter: function() {
            var getSearchedCriteria = Session.get("searchCriteria");
            var displayCriteria = [{
                    title: 'provider',
                    key: getSearchedCriteria.collegeName,
                    label: null
                }, {
                    title: 'course category',
                    key: getSearchedCriteria.courseCategory,
                    label: getSearchedCriteria.courseCategory
                }, {
                    title: 'course name',
                    key: getSearchedCriteria.courseName,
                    label: getSearchedCriteria.courseName
                }, {
                    title: 'qualification',
                    key: getSearchedCriteria.eduLevelList,
                    label: null
                }, {
                    title: 'study mode',
                    key: getSearchedCriteria.studyMode,
                    label: null
                }, {
                    title: 'intake month',
                    key: getSearchedCriteria.intakeMonth,
                    label: getSearchedCriteria.intakeMonth
                }, {
                    title: 'delivery mode',
                    key: getSearchedCriteria.deliveryMode,
                    label: null
                }, {
                    title: 'location',
                    key: getSearchedCriteria.location,
                    label: getSearchedCriteria.location
                }, {
                    title: 'course dutation',
                    key: getSearchedCriteria.courseDuration,
                    label: getSearchedCriteria.courseDuration
                }

            ];

            var lsFilter = [{
                itemName: "Business Management"
            }, {
                itemName: "Sunway College"
            }, {
                itemName: "MMU"
            }];
            return displayCriteria;
        }
    });

    Template.filteredList.events({
        'click #btnDelete': function(evt, res) {
            evt.preventDefault();
            var Item = evt.currentTarget.parentNode;
            var Parent = Item.parentNode;
            Parent.removeChild(Item);
        }
    });
}