require 'rails_helper'

RSpec.describe CardMembersController, type: :controller do

  let!(:card) { create(:card) }
  let(:user) { card.list.board.owner }
  let(:json) { JSON.parse(response.body) }

  before do
    sign_in user
  end


  describe 'POST #create' do

    context 'with valid params' do

      let(:other_user) { create(:user) }

      before do
        post :create, :format => :json, :card_member => { card_id: card.id, member_id: other_user.id }
      end


      it 'should save with the card id' do
        expect(CardMember.last.card_id).to eq(card.id)
      end

      it 'should save with the member id' do
        expect(CardMember.last.member_id).to eq(other_user.id)
      end


      it { should respond_with(:created) }
      it { should set_flash.now[:success].to(/member added/) }

    end

  end


end
