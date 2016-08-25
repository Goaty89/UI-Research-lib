import styles from './register.css';

import { QUALIFICATION_LIST } from '../components/constants/FormData';
if (Meteor.isClient) {
    Template.register.onRendered(function() {
    });

    Template.register.helpers({
        styles: styles,
        notLogin: function(){
            return !Meteor.userId();
        }
    });
    Template.cbxQualificationForSignup.helpers({
      styles: styles
    });

    Template.register.events({
        'submit form': function (event) {
            event.preventDefault();
            var form = $(event.target);
            var email = form.find('[name=email]').val();
            var fname = form.find('[name=fname]').val();
            var phone = form.find('[name=phoneNumber]').val();
            var qualification = form.find('[name=cbxQualificationForSignup]').val();
            var password = (phone && !!(+phone.replace(/ /g,''))) ? phone.substr(phone.length-4): "";
            const userDetail = {
                email: email,
                fname: fname,
                phone: phone,
                qualification: qualification
            };

            console.log("Email & password: ",fname,phone,qualification, email, password);
            Accounts.createUser({
                email: email,
                password: password
            }, function (error) {
                if (error) {
                    console.log(error.reason); // Output error if registration fails
                } else {
                    //login
                    Meteor.loginWithPassword(email, password, function (error) {
                        if (error) {
                            console.log(error.reason);
                        } else {
                            userDetail.userId = Meteor.userId();
                            Meteor.call('insertToUser_data', userDetail, function (error, result) {
                                if (error) {
                                    console.log(error);
                                }
                            });
                        }
                    });
                }
            });
            //Router.go('login');
        }
    });

    Template.cbxQualificationForSignup.helpers({
        List: function () {
            return QUALIFICATION_LIST;
        }
    });
}
