class Record < ApplicationRecord
  serialize :result
  belongs_to :project
  validates_presence_of :result
end
