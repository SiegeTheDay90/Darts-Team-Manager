class DropTables < ActiveRecord::Migration[7.0]
  def change
    drop_table :games, force: :cascade
    drop_table :users, force: :cascade
    drop_table :venues, force: :cascade
    drop_table :teams, force: :cascade
  end
end
