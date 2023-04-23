class UserMailer < ApplicationMailer

    def welcome_email
        @user = params[:user]
        @url = 'https://team-connect.herokuapp.com/account'
        mail(to: @user.email, subject: 'Welcome to Team Connect')
    end

    def reset_request
        @user = params[:user]
        @url = 'https://team-connect.herokuapp.com/reset'
        @confirmation = Confirmation.new(user_id: @user.id)
        if @confirmation.save
            mail(to:@user.email, subject: 'Reset Password')
        end
    end
end
