@teams.each do |team|
    json.set! team.id do
        json.extract!(
            team,
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
            :games,
            :requested
        )
    end
end