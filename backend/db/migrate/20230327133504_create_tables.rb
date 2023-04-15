class CreateTables < ActiveRecord::Migration[7.0]
  def change
    create_table :venues do |t|
      t.string :address, default: "Unlisted"
      t.string :name, null: false, index: {unique: {message: "is already taken."}}, length: {minimum: 6, maximum: 24}
      t.float :lat, null: false
      t.float :lng, null: false
      t.timestamps
    end

    create_table :teams do |t|
      t.string :name, index: {unique: {message: "is already taken."}}, length: {minimum: 6, maximum: 24, message: "must be between 6 and 24 characters."}, presence: true
      t.integer :sponsor_id, default: 0
      t.integer :wins, default: 0
      t.integer :losses, default: 0
      t.integer :draws, default: 0
      t.integer :manager_id, default: 0
      t.timestamps
    end

    create_table :users do |t|
      t.string :firstname, null: false
      t.string :lastname, null: false
      t.string :email, null: false, index: {unique: true}
      t.boolean :is_manager, default: false
      t.string :password_digest, null: false, index: {unique: true}
      t.string :session_token, null: false, index: {unique: true}
      t.integer :team_id, default: 0
      t.timestamps
    end
    
    create_table :games do |t|
      t.date :date, null: false
      t.integer :home_team_id, null: false
      t.integer :away_team_id, null: false
      t.integer :winning_team_id
      t.string :score
      t.integer :reserved, array: true, default: []
      t.timestamps
    end

  end
end
