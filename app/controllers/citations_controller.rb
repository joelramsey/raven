class CitationsController < ApplicationController
  before_action :set_citation, only: [:show, :update, :destroy]

  # GET /citations
  # GET /citations.json
  def index
    @citations = Citation.all

    render json: @citations
  end

  # GET /citations/1
  # GET /citations/1.json
  def show
    render json: @citation
  end

  # POST /citations
  # POST /citations.json
  def create
    @record = record.find(params[:record_id])
    @citation = @record.citations.new(citation_params)

    if @citation.save
      render :show, status: :created, location: @citation
      render json: @citation.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /citations/1
  # PATCH/PUT /citations/1.json
  def update
    if @citation.update(citation_params)
      render :show, status: :ok, location: @citation
    else
      render json: @citation.errors, status: :unprocessable_entity
    end
  end

  # DELETE /citations/1
  # DELETE /citations/1.json
  def destroy
    @citation.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_citation
      @citation = Citation.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def citation_params
      params.require(:citation).permit(:text, :record_id)
    end
end
