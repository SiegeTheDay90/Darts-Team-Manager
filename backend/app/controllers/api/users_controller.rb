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
end
