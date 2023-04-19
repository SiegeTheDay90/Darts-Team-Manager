class UserMailer < ApplicationMailer

    def welcome_email
        @user = params[:user]
        @url = 'https://localhost:3000'
        mail(to: @user.email, subject: 'Welcome to Team Connect')
    end

    def reset_password
        @user = User.find(params[:user_id])
        @url = 'https://localhost:3000/reset_password'
        @confirmation = Confrimation.new(user_id: params[:user_id])
        if @confirmation.save
            mail(to:@user.email, subject: 'Reset Password')
        end
    end
end
