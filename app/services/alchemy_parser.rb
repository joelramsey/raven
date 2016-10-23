class AlchemyParser

  attr_reader :type, :q
  attr_accessor :response
	
	def initialize(params)

    @params = params
    @successful = false

	end

  def call
  	make_request_to_alchemy
  	save_document
  end

  def make_request_to_alchemy
    alchemyapi = AlchemyAPI.new()
    @response = alchemyapi.combined(@params[:type], @params[:q],  {'extract'=>'page-image, title, author, concept, doc-sentiment, doc-emotion, entity, typed-rels','sentiment'=>1, 'knowledgeGraph'=>1, 'showSourceText'=>1  })
  end

  def save_document
    #initialize document and bring in top level attributes
    @record = Record.new result: @response
    @record.save
    @successful = true if @record.persisted?
    @record 
  end #end of response for a single document return

  def successful?
    @successful #make it true if everything saved successfully
  end
	
end
