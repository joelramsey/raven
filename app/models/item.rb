class Item < ApplicationRecord
	mount_uploader :document, DocumentUploader
	has_many :documents
	belongs_to :user
	attr_accessor :document_data
end
