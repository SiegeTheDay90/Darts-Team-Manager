class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :email, null: false
      t.boolean :is_manager, default: false, null: false
      t.string :password_digest
      t.string :session_token
      t.integer :team_id, allow_nil: true

      t.timestamps
    end
    add_index :users, :username, unique: true
    add_index :users, :email, unique: true
  end
end
