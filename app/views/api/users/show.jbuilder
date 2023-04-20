json.user do
    json.set! @user.id do
        json.extract!(
            @user, 
            :firstname,
            :lastname,
            :email,
            :team_id
        )
    end
end
