json.game do
    json.set! @game.id do
        json.extract!(
            @game, 
            :date,
            :home_team_id,
            :away_team_id,
            :winning_team_id,
            :score,
            :venue_id,
            :location,
            :reserved,
            :created_at,
            :updated_at
        )
    end
end