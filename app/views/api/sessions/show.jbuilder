json.user do
    json.extract! @user, :id, :first_name, :last_name, :email, :team_id, :is_manager, :created_at, :updated_at
end
json.teams do
    @teams.each do |team|
        json.set! team.id do
            json.extract! team, :id, :name, :sponsor_id, :wins, :losses, :draws, :manager_id, :requested
            json.nextGame team.next_game.id 
        end
    end   
end

if @user.team
    json.users do
        @user.team.players.each do |player|
            json.set! player.id do
                json.extract! player, :id, :first_name, :last_name, :team_id, :is_manager, :email
            end
        end
    end
    json.games do
        @user.team.games.each do |game|
            json.set! game.id do
                json.extract! game, :id, :date, :home_team_id, :away_team_id, :winning_team_id, :score, :reserved, :venue_id, :location
            end
        end
    end
end