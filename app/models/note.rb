class Record < ApplicationRecord
  serialize :note
  belongs_to :project
end

