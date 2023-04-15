json.team do
    json.extract!(
        @team,
        :id, 
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