class ChangeGames < ActiveRecord::Migration[7.0]
  def change
    add_reference :games, :venue
  end
end
