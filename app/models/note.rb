class Note < ApplicationRecord
  serialize :note
  belongs_to :project
end

