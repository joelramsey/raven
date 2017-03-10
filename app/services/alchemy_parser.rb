require 'rubygems'
require 'pdf-reader'
require 'open-uri'
require 'uri'


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

  def read_format(from_where)
    body = ''
    reader = PDF::Reader.open(from_where) do |reader|
      reader.pages.each do |page|
        body += page.text
      end

      @params[:type] = 'text'
      @params[:q] = body.gsub("\n", ' ').squeeze(' ')
      puts body
    end
  end

  def make_request_to_alchemy
    alchemyapi = AlchemyAPI.new()
    url = @params[:q]

    if @params[:type] == ('url') && url.end_with?('pdf')
      path = File.join(Rails.root, 'public', 'uploads', 'document')
      download = open(url)
      uri = URI.parse(url)
      filename = path + '/' + File.basename(uri.path)
      IO.copy_stream(download, filename)
      read_format(filename)
    end

    #execute this block only if the type param isnt url or text
    if @params[:type] == 'file'
      filename = File.join(Rails.root, 'public', 'uploads', 'document',
                           "#{@item_id}", "#{@item_name}")
      read_format(filename)
    end

    @response = alchemyapi.combined(@params[:type], @params[:q], { 'extract' => 'page-image, title, concept, doc-sentiment, doc-emotion, entity, typed-rels', 'sentiment' => 1, 'knowledgeGraph' => 1, 'showSourceText' => 1})
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
