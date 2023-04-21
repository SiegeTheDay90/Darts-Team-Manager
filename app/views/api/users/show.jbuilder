json.user do
    json.extract!(
        @user,
        :id, 
        :first_name,
        :last_name,
        :email,
        :team_id
    )
end
if @team
    json.team do
        json.set! @team.id do
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
end