Template.register.events({
    'submit form': function(event) {
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        const userDetail = {
            email: email
        };

        console.log("Email & password: ", email, password);
        Accounts.createUser({
            email: email,
            password: password
        }, function(error) {
            if (error) {
                console.log(error.reason); // Output error if registration fails
            } else {
                //login 
                Meteor.loginWithPassword(email, password, function(error) {
                    if (error) {
                        console.log(error.reason);
                    } else {
                        userDetail.userId = Meteor.userId();
                        Meteor.call('insertToUser_data', userDetail, function(error, result) {
                            if (error) {
                                console.log(error);
                            }
                        });
                        console.log(Meteor.userId());
                        //Router.go("register");
                    }
                });
            }
        });
        //Router.go('login');
    }
});