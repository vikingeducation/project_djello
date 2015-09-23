require 'rails_helper'

RSpec.describe ListsController, type: :controller do
  let(:user) { create(:user) }
  let(:other_user) { create(:user) }
  let(:board) { create(:board, user: user) }
  let(:other_board) { create(:board, user: other_user) }
  let(:list) {create(:list, board: board)}

  describe 'create' do
    it 'should allow creation of a list if owner' do
      sign_in user
      new_list = build(:list, board: board)
      expect{
        post :create, format: :json, list: new_list.attributes
      }.to change(List, :count).by(1)
    end

    it 'should not allow another user to create list on board not owned' do
      sign_in other_user
      new_list = build(:list, board: board)
      expect{
        post :create, format: :json, list: new_list.attributes
      }.to change(List, :count).by(0)
    end
  end

  describe 'update' do
    it 'should not allow editing if not owner' do
      sign_in other_user
      edited_list = build(:list)
      put :update, format: :json, id: list.id, list: edited_list.attributes
      list.reload
      expect(list.title).to_not eq(edited_list.title)
    end

    it 'should not allow editing if not owner' do
      sign_in user
      edited_list = build(:list)
      put :update, format: :json, id: list.id, list: edited_list.attributes
      list.reload
      expect(list.title).to eq(edited_list.title)
    end
  end
end
