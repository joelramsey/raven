require 'rubygems'
require 'pdf-reader'


class AlchemyParser

  attr_reader :type, :q
  attr_accessor :response

  def initialize(params, project_id, *item_details)

    @params = params
    @project_id = project_id
    @item_id = item_details[0]
    @item_name = item_details[1]
    @successful = false
  end

  def call
    make_request_to_alchemy
    save_document
  end

  def make_request_to_alchemy
    alchemyapi = AlchemyAPI.new()
    puts "item ID in the service: #{@item_id}"
    puts "document_name in the service: #{@item_name}"

    #execute this block only if the type param isnt url or text
    if @params[:type] == 'file'
      body = ''
      filename = File.join(Rails.root, 'public', 'uploads', 'document', "#{@item_id}", "#{@item_name}")
      
      #just to verify the correct file path as i play
      puts filename

      reader = PDF::Reader.open(filename) do |reader|
        reader.pages.each do |page|
          body += page.text
        end
        
        #just for verification
        #puts body
        
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
