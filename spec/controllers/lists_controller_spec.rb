require 'rails_helper'

RSpec.describe ListsController, type: :controller do

  let!(:list) { create(:list) }
  let(:user) { list.board.owner }
  let(:json) { JSON.parse(response.body) }

  before do
    sign_in user
  end

  describe 'POST #create' do

    before do
      post :create, :format => :json, :list => attributes_for(:list)
    end

    it 'should save to the database' do
      expect(List.find(list.id)).to eq(list)
    end

    it 'should set the title to default' do
      expect(List.find(list.id).title).to eq("New List")
    end

    it 'should set the description to default' do
      expect(List.find(list.id).description).to eq("Add a description")
    end

    it { should respond_with(:created) }
    it { should set_flash.now[:success].to(/created/) }

  end

  describe 'PATCH #update' do

    context 'with a valid change' do

      let(:updated_title) { 'Updated Title' }
      let(:updated_description) { 'Updated Description' }

      before do
        patch :update, format: :json, :id => list.id, :list => attributes_for(:list, :title => updated_title, :description => updated_description)
      end

      it 'should change the list title in the database' do
        expect(List.find(list.id).title).to eq(updated_title)
      end

      it 'should change the list description in the database' do
        expect(List.find(list.id).description).to eq(updated_description)
      end

      it 'should return status OK' do
        expect(response).to have_http_status(:ok)
      end

    end

    context 'with a change to null' do

      let(:bad_title) { '' }
      let(:bad_description) { '' }

      before do
        patch :update, format: :json, :id => list.id, :list => attributes_for(:list, :title => bad_title, :description => bad_description)
      end

      it 'should return error status' do
        expect(response).to have_http_status(422)
      end

      it 'should not change the list title in the database' do
        expect(List.find(list.id).title).not_to eq(bad_title)
      end

      it 'should not change the list description in the database' do
        expect(List.find(list.id).description).not_to eq(bad_description)
      end

    end

  end

  describe 'DELETE #destroy' do

    context 'with a valid id' do

      before do
        delete :destroy, format: :json, :id => list.id
      end


      it 'should remove the list from the database' do
        expect{ List.find(list.id) }.to raise_error(ActiveRecord::RecordNotFound)
      end

      it { should respond_with(204) }
      it { should set_flash.now[:success].to(/deleted/) }

    end

    context "with another user's list" do

      let(:other_list) { create(:list) }

      before do
        delete :destroy, format: :json, :id => other_list.id
      end


      it 'should not remove any lists from the database' do
        expect{ List.find(list.id) }.not_to raise_error
        expect{ List.find(other_list.id) }.not_to raise_error
      end

      it { should respond_with(401) }
      it { should set_flash.now[:danger].to(/Unauthorized/) }

    end

    context 'with a non-existent id' do

      before do
        delete :destroy, format: :json, :id => -1
      end

      it { should respond_with(422) }
      it { should set_flash.now[:danger].to(/failed/) }

    end

  end

end