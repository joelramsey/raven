class Item < ApplicationRecord
	#mount_uploader :picture, PictureUploader
	belongs_to :user, optional: true
	has_many :documents
	attr_accessor :document_data
end
