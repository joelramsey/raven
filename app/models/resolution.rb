class Resolution < ApplicationRecord
	serialize :entities
  	belongs_to :user
end
