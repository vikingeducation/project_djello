require 'rails_helper'

# What are the actions of our board?
# create
# update
# show
# index?
# destroy

RSpec.describe BoardController, type: :controller do

  let!(:user) { create(:user) }

  it 'cannot create a board if not logged in' do
    new_board = build(:board)
    expect { post :create, board: new_board.attributes }.to change(Board, :count).by(0);
  end

  it 'can create a board if logged in' do
    new_board = build(:board)
    sign_in user
    expect { post :create, board: new_board.attributes }.to change(Board, :count).by(1);
  end
end
