if (Meteor.isClient) {
    Template.login.helpers({
        isLogin: function() {
            return !!Meteor.userId();
        }
    });

    Template.login.events({
        'submit form': function (event) {
            event.preventDefault();
            var email = $('[name=email]').val();
            var password = $('[name=password]').val();
            Meteor.loginWithPassword(email, password, function (error) {
                if (error) {
                    console.log(error.reason);
                } else {
                    Router.go("register");
                }
            });
        },
        'click .logout': function(event){
            event.preventDefault();
            Meteor.logout();
            Router.go('login');
        }
    });
}