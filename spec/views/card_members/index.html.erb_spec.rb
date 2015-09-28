require 'rails_helper'

RSpec.describe "card_members/index", type: :view do
  before(:each) do
    assign(:card_members, [
      CardMember.create!(),
      CardMember.create!()
    ])
  end

  it "renders a list of card_members" do
    render
  end
end
