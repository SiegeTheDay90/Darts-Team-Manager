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
class Venue < ApplicationRecord
    validates :name, :address, presence: true, uniqueness: true


    has_many(
        :teams,
        foreign_key: :sponsor_id
    )

end
