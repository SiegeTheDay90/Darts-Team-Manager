class CreateTeams < ActiveRecord::Migration[7.0]
  def change
    create_table :teams do |t|
      t.string :name, uniqueness: {message: "is already taken."}, length: {minimum: 6, maximum: 24}, presence: true, allow_nil: false
      t.string :sponsor, presence: true, allow_nil: false
      t.integer :wins, default: 0
      t.integer :losses, default: 0
      t.integer :draws, default: 0
      t.integer :manager_id, allow_nil: true

      t.timestamps
    end
    add_index :teams, :name, unique: true
    add_foreign_key :teams, :users, column: :manager_id
    add_foreign_key :users, :teams, column: :team_id
  end
end