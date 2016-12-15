class Note < ApplicationRecord
  serialize :note
  belongs_to :project
  validates_presence_of :note
end

