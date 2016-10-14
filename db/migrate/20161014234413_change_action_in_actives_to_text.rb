class ChangeActionInActivesToText < ActiveRecord::Migration
  def change
    change_column(:activities, :action, :text)
  end
end
