class ChangeUsers2 < ActiveRecord::Migration[7.0]
  def change
    rename_column :users, :firstname, :first_name
    rename_column :users, :lastname, :last_name
  end
end
