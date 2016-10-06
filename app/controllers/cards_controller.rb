class CardsController < ApplicationController

  def index
  end

  def show
  end

  def create
  end

  def update
  end

  def destroy
  end

private

  def card_params
    params.require(:card).permit(:title)
  end

end
