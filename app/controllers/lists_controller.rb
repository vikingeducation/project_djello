class ListsController < ApplicationController

  def create
    @list = List.new(list_params)
    @list.user_id = current_user.id

    if @list.save
      respond_to do |format|
        format.json { render json: @list.to_json(include: {
                                                          cards: {
                                                            include: [:members, :activities]
                                                            }
                                                          }

                                                ) }
      end
    else
      respond_to do |format|
        format.json {}
      end

    end
  end

  def destroy
    @list = List.find(params[:id])

    @list.destroy

    respond_to do |format|
      format.json { render json: @list }
    end
  end

  def update
    @list = List.find(params[:id])

    if @list.update(list_params)
      respond_to do |format|
        format.json { render json: @list.to_json(include: {
                                                          cards: {
                                                            include: [:members, :activities]
                                                            }
                                                          }

                                                ) }
      end
    else
      respond_to do |format|
        format.json {}
      end

    end

  end

  private

  def list_params
    params.require(:list).permit(:title, :description, :board_id)
  end
end
