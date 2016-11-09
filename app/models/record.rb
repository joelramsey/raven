class Record < ApplicationRecord
  serialize :result
  belongs_to :project
end
