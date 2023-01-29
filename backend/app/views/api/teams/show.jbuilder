json.set! @team.id do
    json.extract!(
        @team, 
        :name, 
        :sponsor, 
        :manager_id, 
        :wins, 
        :losses, 
        :draws, 
        :created_at, 
        :updated_at,
        :players,
        :games
    )
end