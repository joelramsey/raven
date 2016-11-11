class Item < ApplicationRecord
	mount_uploader :document, DocumentUploader
	mount_uploader :picture, PictureUploader
	has_many :documents
	belongs_to :user
	attr_accessor :document_data
end
