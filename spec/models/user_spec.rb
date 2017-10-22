require 'rails_helper'

describe "User" do
  let(:user){ build(:user)}

  describe '#full_name' do
    it 'returns a user\'s full name' do
      expect(user.full_name).to eq(user.first_name + ' ' + user.last_name)
    end
  end
end
