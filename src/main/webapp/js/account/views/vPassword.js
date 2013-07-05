/**
 * Created with IntelliJ IDEA.
 * User: Gregoire
 * Date: 26/06/13
 * Time: 18:04
 * To change this template use File | Settings | File Templates.
 */

var VPassword = Marionette.ItemView.extend({
    tagName: 'form',
    template: '#account-password',

    initialize: function(){
        this.$el.addClass('form-horizontal row-fluid');

        this.model = new MPassword();
        this.model.fetch({
            error:_.bind(this.disable, this)
        });

        this.$el.empty();
    },

    events: {
        'submit': 'submit',
        'change [name="newPassword"]' : 'validation',
        'change [name="newPasswordConfirmation"]' : 'validation'
    },

    disable: function(){
        this.$el.find('[name]').attr('disabled', 'disabled');
        this.$el.find('button[type="submit"]').attr('disabled', 'disabled');
        this.$el.find('.return').append($('#form-ldap').html());
    },

    validation: function(){
        var newPassword = this.$el.find('[name="newPassword"]');
        var newPasswordConfirmation = this.$el.find('[name="newPasswordConfirmation"]');
        if(newPassword.val() !== newPasswordConfirmation.val()){
            newPasswordConfirmation[0].setCustomValidity($('#account-password-newPasswordConfirmation').text());
            return;
        }
        newPasswordConfirmation[0].setCustomValidity('');
        return;
    },

    submit: function(e){
        e.preventDefault();

        var form = $(e.target);

        this.model.set('oldPassword', form.find('[name="oldPassword"]').val());
        this.model.set('newPassword', form.find('[name="newPassword"]').val());
        this.model.set('newPasswordConfirmation', form.find('[name="newPasswordConfirmation"]').val());

        var self = this;
        self.model.save(null, {
            success: function(){
                $(e.target)[0].reset();
                //self.$el.find('.return').append($('#form-success').html());
                app.trigger('even-alert-success', app.formSuccess);
            },
            error: function(){
                //self.$el.find('.return').append($('#form-error').html());
                app.trigger('even-alert-error', app.formError);
            }
        });
    }
});