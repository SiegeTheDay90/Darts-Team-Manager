class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.date :date, null: false
      t.integer :home_team_id, null: false
      t.integer :away_team_id, null: false
      t.integer :winning_team_id, allow_nil: true
      t.string :score, allow_nil: true
      t.integer :reserved, array: true, default: []
      t.timestamps
    end
    add_foreign_key :games, :teams, column: :home_team_id
    add_foreign_key :games, :teams, column: :away_team_id
  end
end
