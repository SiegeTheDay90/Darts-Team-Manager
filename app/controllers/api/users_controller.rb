class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password', 'first_name', 'last_name']

  def create
    @user = User.new({
      first_name: params[:first_name], 
      last_name: params[:last_name], 
      email: params[:email].downcase,
      password: params[:password]
    })

    if @user.save
      UserMailer.with(user: @user).welcome_email.deliver_now
      login!(@user)
      render :show
    else
      render json: {errors: @user.errors.full_messages}, status: 422
    end
  end

  def index
    if !params[:users]
      @users = User.all
    else
      begin
        @users = User.find(JSON.parse(params[:users]))
      rescue
        @users = User.all
      end
    end
  end

  def show
    @user = User.find(params[:id])
    if @user
      render :show
    else
      render json: {errors: ["User does not exist."], status: 404}
    end
  end

  def update
    @user = User.find(params[:id])
    if @user
      for k in params.keys
        if @user[k]
          @user[k] = params[k]
        end
      end

      if @user.save
        @team = nil
        render :show
      else
        render json: {errors: @user.errors.full_messages}, status: 422
      end
    else
      render json: {errors: ["User does not exist."], status: 404}
    end
  end

  def add_to_team
    @user = User.find_by(id: params[:user_id])
    @team = Team.find_by(id: params[:team_id])
    if @user && @team
      @user.team_id = @team.id
      @team.requested.delete(@user.id)
      if @user.save && @team.save
        UserMailer.with(user: @user, team: @team).add.deliver_now
        render :show
      else
        render json: {errors: @user.errors.full_messages+@team.errors.full_messages}, status: 422
      end
    else
      render json: {errors: ["User does not exist."], status: 404}
    end
  end

  def reset_password
    confirm = Confirmation.find_by(code: params[:credential])
    
    if confirm
      @user = confirm.user
      @user.password = params[:password]
      if @user.save
          login!(@user)
          render :show
      end
    else
      render json: {errors: ["Code mismatch."], status: 401}
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
