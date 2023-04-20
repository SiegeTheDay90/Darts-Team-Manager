class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password', 'first_name', 'last_name']

  def create
    @user = User.new({
      firstname: params[:first_name], 
      lastname: params[:last_name], 
      email: params[:email],
      password: params[:password]
    })

    @user.team_id = params[:team_id] ? params[:team_id] : 1
    if @user.save
      UserMailer.with(user: @user).welcome_email.deliver_now
      login!(@user)
      render :show
    else
      render json: {errors: @user.errors.full_messages}, status: 422
    end
  end

  def index
    @users = User.all

    render :index
  end

  def show
    @user = User.find(params[:id])
    if @user
      render :show
    else
      render json: {errors: ["User does not exist."], status: 422}
    end
  end

  def update
    @user = User.find(params[:id])
    if @user
      render json: {payload: "This is the user#update route."}
    else
      render json: {errors: ["User does not exist."], status: 422}
    end
  end

  def reset
    confirm = Confirmation.find_by(code: params[:credential])
    
    if confirm
      @user = confirm.user
      @user.password = params[:password]
      if @user.save
          login!(@user)
          render :show
      end
    else
      render json: {errors: ["Code mismatch."], status: 403}
    end
  end

  def request_reset
    @user = User.find_by(email: params[:credential])

    if @user
      confirmation = Confirmation.new(user_id: @user.id)
      if confirmation.save
        UserMailer.with(user: @user).reset_request.deliver_now
        render json: {message: "Success"}
      else
        render json: {errors: confirmation.errors.full_messages}, status: 422
      end
    end
  end
end
