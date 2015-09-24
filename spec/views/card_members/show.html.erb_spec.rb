require 'rails_helper'

RSpec.describe "card_members/show", type: :view do
  before(:each) do
    @card_member = assign(:card_member, CardMember.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end
