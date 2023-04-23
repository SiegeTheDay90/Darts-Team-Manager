# == Schema Information
#
# Table name: teams
#
#  id         :bigint           not null, primary key
#  name       :string
#  sponsor_id :integer          default(0)
#  wins       :integer          default(0)
#  losses     :integer          default(0)
#  draws      :integer          default(0)
#  manager_id :integer          default(0)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  requested  :integer          default([]), is an Array
#
require "test_helper"

class TeamTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
