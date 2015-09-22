require 'rails_helper'

RSpec.describe User, type: :model do
  it 'should destroy dependants on deletion' do
    new_user = create(:user)
    board = create(:board, user: new_user)

    expect {
      User.first.destroy
    }.to change(Board, :count).by(-1)
  end
end
