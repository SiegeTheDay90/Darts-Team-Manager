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
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class Game < ApplicationRecord
    validates :date, :home_team_id, :away_team_id, presence: {message: "must be present."}

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

end

