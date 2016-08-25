import styles from './login.css';

if (Meteor.isClient) {
    Template.login.helpers({
        styles: styles,
        isLogin: function() {
            return !!Meteor.userId();
        }
    });

    Template.login.events({
        'submit form': function (event) {
            event.preventDefault();
            var form = $(event.target);
            var email = form.find('[name=email]').val();
            var password = form.find('[name=password]').val();
            Meteor.loginWithPassword(email, password, function (error) {
                if (error) {
                    console.log(error.reason);
                } else {
                    $('#loginRegisterModal').modal('hide');
                }
            });
        }
    });
}
