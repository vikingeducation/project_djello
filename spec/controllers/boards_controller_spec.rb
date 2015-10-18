require 'rails_helper'

RSpec.describe BoardsController, type: :controller do


  describe 'GET #index' do

    it 'should return a collection of boards'
    it "should return all of a user's boards"
    it "should not include another user's board"

  end


  describe 'GET #show' do

    context 'for an existing board' do
      it 'should return status OK'
      it 'should return the right pin id'
      it 'should return the right pin item_name'
    end

    context 'for a non-existent board' do
      it 'should return status NOT FOUND'
      it 'should set error flash'
    end

  end


  describe 'POST #create' do

    context 'with valid params' do
      it 'should save to the database'
      it 'should set the owner to the current user'
      it 'should return status CREATED'
      it 'should set success flash'
    end

    context 'with invalid params' do
      it 'should not save to the database'
      it 'should return status 422'
      it 'should set error flash'
    end


  end


  describe 'DELETE #destroy' do

    context 'with a valid id' do
      it 'should remove the board from the database'
      it 'should return status 204'
      it 'should set success flash'
    end

    context "with another user's board" do
      it 'should not remove any boards from the database'
      it 'should return status UNAUTHORIZED'
      it 'should set error flash'
    end

    context 'with a non-existent id' do
      it 'should return status NOT FOUND'
      it 'should set error flash'
    end

  end


end
