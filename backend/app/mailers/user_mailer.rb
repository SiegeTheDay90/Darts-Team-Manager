class UserMailer < ApplicationMailer

    def welcome_email
        @user = params[:user]
        @url = 'https://localhost:3000'
        mail(to: @user.email, subject: 'Welcome to Team Connect')
    end

    def reset_request
        @user = params[:user]
        @url = 'https://localhost:3000/reset'
        @confirmation = Confirmation.new(user_id: @user.id)
        if @confirmation.save
            mail(to:@user.email, subject: 'Reset Password')
        end
    end
end
