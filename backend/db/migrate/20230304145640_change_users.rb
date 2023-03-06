class ChangeUsers < ActiveRecord::Migration[7.0]
  def change
    rename_column :users, :username, :firstname
    add_column :users, :lastname, :string, after: :firstname
  end
end
