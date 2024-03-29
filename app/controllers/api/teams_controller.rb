class Api::TeamsController < ApplicationController

  def create
    @team = Team.new({
      name: params[:name], 
      sponsor: params[:sponsor],
      manager_id: params[:manager_id]
    })
    

    if @team.save
      render json: {team: {name: @team.name, sponsor: @team.sponsor, manager: User.find(@team.manager_id).username}}
    else
      render json: {errors: @team.errors.full_messages}, status: 422
    end
  end

  def index
    @teams = Team.all

    render :index
  end

  def show
    @team = Team.find(params[:id])
    if @team
      render :show
    else
      render json: {errors: ["Team does not exist."], status: 422}
    end
  end

  def add_request
    @team = Team.find_by(id: params[:team_id])
    @user = User.find_by(id: params[:user_id])
    if @team && @user
      @team.requested.push(@user.id)
      if @team.save
        render :show
      else
        render json: {errors: @team.errors.full_messages, status: 422}
      end
    else
      render json: {errors: ["Team or User not found."], status: 404}
    end
  end
  
  def remove_request
    @team = Team.find_by(id: params[:team_id])
    if @team
      @team.requested.delete(params[:user_id].to_i)
      if @team.save
        render :show
      else
        render json: {errors: @team.errors.full_messages, status: 422}
      end
    else
      render json: {errors: ["Team or User not found."], status: 404}
    end
  end

  def update
    @team = Team.find(params[:id])
    if @team
      render json: {payload: "This is the team#update route."}
    else
      render json: {errors: ["Team does not exist."], status: 422}
    end
  end
end
