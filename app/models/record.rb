class Record < ApplicationRecord
  serialize :result
  belongs_to :project
  has_one :citation
end
