class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  private

    def create_record(project_id, *item_details)

      alchemy = AlchemyParser.new(params, project_id, *item_details)
      @record = alchemy.call

      if alchemy.successful?
        render json: @record, status: :created, location: project_url(@record)
      else
        render json: @record.errors, status: :unprocessable_entity
      end
    end
end
