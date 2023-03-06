@users.each do |user|
    json.set! user.id do
        json.extract!(
            user, 
            :firstname,
            :lastname,
            :email,
            :team_id
        )
    end
end