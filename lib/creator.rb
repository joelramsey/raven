module Creator
	#attr_reader :type, :q

	def self.create
		#params[:type] = 'file'
		#params[:q] = ''
	    alchemy = AlchemyParser.new(params, record_params)
	    @record = alchemy.call

	    if alchemy.successful?
	      render json: @record, status: :created, location: project_url(@record)
	    else
	      render json: @record.errors, status: :unprocessable_entity
	    end
  	end

  	private

  	def record_params
      	params.require(:record).permit(:result, :user_id, :project_id)
  	end
end