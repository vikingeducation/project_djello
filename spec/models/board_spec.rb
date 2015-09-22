require 'rails_helper'

RSpec.describe Board, type: :model do
  it 'should destroy dependents upon deletion' do
    new_board = create(:board)
    list = create(:list, board: new_board)

    expect {
      Board.first.destroy
    }.to change(List, :count).by(-1)
  end
end
