class Api::SessionsController < ApplicationController

    def show
        if current_user
          @user = current_user
          render :show
        else
          render json: {user: nil}
        end
    end

    def create
        @user = User.find_by_credentials(session_params[:credential], session_params[:password])
        if @user
          login!(@user)
          render :show
        else
          @user = nil
          render json: {errors: ["Email or Password was incorrect"]}, status: 422
        end
    end

    def destroy
        user = current_user
    
        if user
          user.reset_session_token!
          session['_darts_manager_session'] = nil
          render json: {messages: ['Successful']}, status: 200
        else
          render json: {errors: ['Unsuccessful']}, status: 422
        end
    end
  end
  