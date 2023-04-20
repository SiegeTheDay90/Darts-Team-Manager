class ChangeTeams < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :teams, :venues, column: :sponsor_id
  end
end
