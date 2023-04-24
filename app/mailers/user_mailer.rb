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

    def add
        @user = params[:user]
        @team = params[:team]
        @url = 'https://team-connect.herokuapp.com/myteams'

        if @user && @team
            mail(to:@user.email, subject: `Request Accepted: #{@team.name}`)
        end
    end
end
