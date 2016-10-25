class ChangePositionToFloatOnCards < ActiveRecord::Migration
  def change
    change_column(:cards, :position, :float)
  end
end
