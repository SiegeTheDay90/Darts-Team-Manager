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
require "test_helper"

class GameTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
