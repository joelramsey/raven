class Citation < ApplicationRecord
  serialize :text
  belongs_to :record
end
