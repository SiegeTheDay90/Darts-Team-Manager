json.user do
    json.extract! @user, :id, :firstname, :lastname, :email, :is_manager, :created_at, :updated_at
end
json.team do
    json.extract! @user.team, :id, :name, :sponsor, :wins, :losses, :draws, :manager_id
end
json.users do
    @user.team.players.each do |player|
        json.set! player.id do
            json.extract! player, :id, :firstname, :lastname, :email
        end
        json.set! @user.id do
            json.extract! @user, :id, :firstname, :lastname, :email
        end
    end
end