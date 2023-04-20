# == Schema Information
#
# Table name: venues
#
#  id         :bigint           not null, primary key
#  address    :string           default("Unlisted")
#  name       :string           not null
#  lat        :float            not null
#  lng        :float            not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Venue < ApplicationRecord
    validates :name, :address, presence: true, uniqueness: true


    has_many(
        :teams,
        foreign_key: :sponsor_id
    )

    has_many(
        :games,
        foreign_key: :venue_id
    )

end
