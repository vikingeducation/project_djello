require 'rails_helper'

RSpec.describe List, type: :model do

  describe 'validations' do
    it 'should be valid with proper attributes' do
      list = build(:list)
      expect(list).to be_valid
    end

    it 'should not be allowed to be created with blank title' do
      list = build(:list)
      list.title = ""
      expect(list).to_not be_valid
    end
  end
end
