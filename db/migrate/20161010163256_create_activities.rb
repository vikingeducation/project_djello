class CreateActivities < ActiveRecord::Migration[5.0]
  def change
    create_table :activities do |t|
      t.references :user
      t.references :card
      t.references :list
      t.references :board
      t.string :action
      t.timestamps
    end
  end
end
