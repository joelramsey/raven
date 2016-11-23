class ItemsController < ApplicationController
  before_action :set_item, only: [:show, :update, :destroy]
  include Creator

  # GET /items
  def index
    @items = current_user.items.all

    render json: @items
  end

  # GET /items/1
  def show
    render json: @item
  end

  # POST /items
  def create
    @item = Item.new(item_params)
    logger.debug "Params are: #{item_params.inspect}"

    if @item.save
      #iterate through each of the files 
      params[:item][:document_data].each do |file| 
      @item.documents.create!(:document => file) 
      #create a document associated with the item that has just been created
      Creator.create
    end
      render :show, status: :created, location: @item
    else
      render json: @item.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /items/1
  def update
    if @item.update(item_params)
      render json: @item
    else
      render json: @item.errors, status: :unprocessable_entity
    end
  end

  # DELETE /items/1
  def destroy
    @item.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_item
      @item = Item.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def item_params
      params.require(:item).permit(:name, :description, :user_id, :project_id, :document_data => []) #Add :documents_data in permit() to accept an array 
    end
end
