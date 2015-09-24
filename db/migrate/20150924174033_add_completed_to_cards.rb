class AddCompletedToCards < ActiveRecord::Migration
  def change
    add_column :cards, :completed, :boolean, default: false
  end
end
