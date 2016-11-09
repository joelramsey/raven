require 'rubygems'
require 'pdf-reader'


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

    if type == 'file'
      path = 'app/samples/' # where do we want to keep the files? temp, if so, rake task to kill them after
      doc = 'pdf.pdf' # need to variable out to this item's location
      body = ''
      puts path+doc

      reader = PDF::Reader.open(path+doc) do |reader|
        reader.pages.each do |page|
          body += page.text
        end
        #just for verification
        puts body
      end
      type = 'text'
    end

    @response = alchemyapi.combined(@params[:type], @params[:q],  {'extract'=>'page-image, title, concept, doc-sentiment, doc-emotion, entity, typed-rels','sentiment'=>1, 'knowledgeGraph'=>1, 'showSourceText'=>1  })
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
