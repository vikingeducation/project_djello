class ListsController < ApplicationController

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

  def board_params
    params.require(:list).permit(:title)
  end

end
