class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']

  def create
    @user = User.new({
      username: params[:username], 
      email: params[:email], 
      password: params[:password], 
      team_id: 1
    })

    if params[:team_id]
      @user.team_id = params[:team_id]
    end

    if @user.save
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
