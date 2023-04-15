class Api::GamesController < ApplicationController

    
    def reserve
        @game = Game.find(params[:id])
        if @game
            if current_user.id == params[:user_id]

                @game.reserved << current_user.id unless @game.reserved.delete(current_user.id)

                if @game.save
                    render :show
                else
                    render json: {errors: @game.errors.full_messages}, status: 422
                end

            else
                render json: {errors: ["Not authorized"]}, status: 403
            end
        else
            render json: {errors: ["Game not found."]}, status: 422
        end
    end

    def create
        @game = Game.new({
          #game_attrs]
        })
        
    
        if @game.save
          render :show
        else
          render json: {errors: @game.errors.full_messages}, status: 422
        end
      end
  
    def index
      @games = Game.all
      render :index
    end
  
    def show
      @game = Game.find(params[:id])
      if @game
        render :show
      else
        render json: {errors: ["Game does not exist."], status: 422}
      end
    end
  
    def update
      @game = Game.find(params[:id])
      if @game
        render json: {payload: "This is the game#update route."}
      else
        render json: {errors: ["Game does not exist."], status: 422}
      end
    end
  end
  