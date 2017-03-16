class Citation < ApplicationRecord
  serialize :text
  belongs_to :project
  belongs_to :record
end
