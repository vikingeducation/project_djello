class ChangeActiontoActivity < ActiveRecord::Migration
  def change
    remove_column :activities, :action
    add_column :activities, :desc, :text
  end
end
