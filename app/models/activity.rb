class Activity < ApplicationRecord
  belongs_to :action
  belongs_to :activitable
end
