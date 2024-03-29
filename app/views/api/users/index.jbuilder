@users.each do |user|
    json.set! user.id do
        json.extract!(
            user,
            :id, 
            :first_name,
            :last_name,
            :email,
            :team_id,
            :is_manager
        )
    end
end