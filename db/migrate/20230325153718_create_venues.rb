class CreateVenues < ActiveRecord::Migration[7.0]
  def change
    create_table :venues do |t|
      t.string :address, default: "Unlisted"
      t.string :name, null: false, uniqueness: {message: "is already taken."}, length: {minimum: 6, maximum: 24}, presence: true
      t.timestamps
    end

    add_column :teams, :sponsor_id, :bigint
    add_foreign_key :teams, :venues, column: :sponsor_id
    remove_column :teams, :sponsor
  end
end
