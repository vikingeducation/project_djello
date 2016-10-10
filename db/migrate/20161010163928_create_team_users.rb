class CreateTeamUsers < ActiveRecord::Migration
  def change
    create_table :team_users do |t|
      t.integer :team_id
      t.integer :user_id
    end
    add_index :team_users, [:team_id, :user_id], unique: true
  end
end
