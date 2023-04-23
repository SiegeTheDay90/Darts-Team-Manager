class ChangeTeams2 < ActiveRecord::Migration[7.0]
  def change
    add_column :teams, :requested, :int, array: true, default: []
  end
end
