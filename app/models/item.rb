class Item < ApplicationRecord
	mount_uploader :document, DocumentUploader
	has_many :documents
	attr_accessor :document_data
end
