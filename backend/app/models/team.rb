# == Schema Information
#
# Table name: teams
#
#  id         :bigint           not null, primary key
#  name       :string
#  sponsor    :string
#  wins       :integer          default(0)
#  losses     :integer          default(0)
#  draws      :integer          default(0)
#  manager_id :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Team < ApplicationRecord
    validates :name, presence: true, uniqueness: true
    # validates :sponsor_id, :manager_id

    before_validation :ensure_name

    def ensure_name
        self.name ||= "#{self.sponsor.name} #{self.sponsor.teams.length + 1}"
    end

    def games
        return self.away_games + self.home_games
    end

    def next_game
        last_game = games.sort_by{|game| game.date}.last
        next_game = games.reject{|game| Date.today() - game.date > 0}.sort_by{|game| game.date}.first

        return next_game ? next_game : last_game
    end

    belongs_to(
        :sponsor,
        class_name: 'Venue',
        foreign_key: 'sponsor_id'
    )


    has_many(
        :players,
        class_name: 'User',
        foreign_key: 'team_id',
        primary_key: 'id'
    )

    has_one(
        :manager,
        class_name: 'User',
        foreign_key: 'id',
        primary_key: 'id'
    )

    has_many(
        :away_games,
        class_name: 'Game',
        foreign_key: 'away_team_id',
        primary_key: 'id'
    )

    has_many(
        :home_games,
        class_name: 'Game',
        foreign_key: 'home_team_id',
        primary_key: 'id'
    )

    def games
        return self.away_games + self.home_games
    end
end
