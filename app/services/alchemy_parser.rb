require 'rubygems'
require 'pdf-reader'


class AlchemyParser

  attr_reader :type, :q
  attr_accessor :response

  def initialize(params, project_id)

    @params = params
    @project_id = project_id
    @successful = false
  end

  def call
    make_request_to_alchemy
    save_document
  end

  def make_request_to_alchemy
    alchemyapi = AlchemyAPI.new()

    #execute this block only if the type param isnt url or text
    if @params[:type] != 'text' and @params[:type] != 'url'
      # path = "../public/uploads/document/10/" # where do we want to keep the files? temp, if so, rake task to kill them after
      # doc = "bank.pdf" # need to variable out to this item's location
      body = ''

      filename = File.join(Rails.root, 'public', 'uploads', 'document', '10', 'bank.pdf')
      
      #just to verify the correct file path as i play
      puts filename

      reader = PDF::Reader.open(filename) do |reader|
        reader.pages.each do |page|
          body += page.text
        end
        
        #just for verification
        puts body
        
        #set the params for text and make the pdf body q
        @params[:type] = 'text'
        @params[:q] = body
      end
    end    
    @response = alchemyapi.combined(@params[:type], @params[:q], {'extract' => 'page-image, title, concept, doc-sentiment, doc-emotion, entity, typed-rels', 'sentiment' => 1, 'knowledgeGraph' => 1, 'showSourceText' => 1})
    
  end

  def save_document
    #initialize document and bring in top level attributes
    @record = Record.new(result: @response, project_id: @project_id)
    @record.save
    @successful = true if @record.persisted?
    @record
  end

  #end of response for a single document return

  def successful?
    @successful #make it true if everything saved successfully
  end

end
