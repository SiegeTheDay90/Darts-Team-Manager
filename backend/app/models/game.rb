# == Schema Information
#
# Table name: games
#
#  id              :bigint           not null, primary key
#  date            :date             not null
#  home_team_id    :integer          not null
#  away_team_id    :integer          not null
#  winning_team_id :integer
#  score           :string
#  reserved        :integer          default([]), is an Array
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  venue_id        :bigint
#
class Game < ApplicationRecord
    validates :date, :home_team_id, :away_team_id, presence: {message: "must be present."}

    
    def location
        v = venue
        return {lat: v.lat, lng: v.lng}
    end
    
    has_one(
        :away_team,
        class_name: 'Team',
        foreign_key: 'id',
        primary_key: 'id'
    )

    has_one(
        :home_team,
        class_name: 'Team',
        foreign_key: 'id',
        primary_key: 'id'
    )

    belongs_to(
        :venue,
        class_name: 'Venue',
        foreign_key: 'venue_id',
        primary_key: 'id'
    )

end

