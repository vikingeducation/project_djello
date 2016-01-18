class AddActivityToCard < ActiveRecord::Migration
  def change
  	add_column :cards, :activity, :text
  end
end
