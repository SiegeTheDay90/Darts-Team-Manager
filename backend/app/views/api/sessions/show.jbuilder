json.user do
    json.extract! @user, :id, :firstname, :lastname, :email, :team_id, :is_manager, :created_at, :updated_at
end
json.team do
    json.extract! @user.team, :id, :name, :sponsor, :wins, :losses, :draws, :manager_id
    json.nextGame @user.team.next_game.id       
end
json.users do
    @user.team.players.each do |player|
        json.set! player.id do
            json.extract! player, :id, :firstname, :lastname, :team_id, :is_manager, :email
        end
    end
end
json.games do
    @user.team.games.each do |game|
        json.set! game.id do
            json.extract! game, :id, :date, :home_team_id, :away_team_id, :winning_team_id, :score, :reserved
        end
    end
end