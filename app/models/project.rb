class Project < ApplicationRecord
  belongs_to :user
  has_many :records
  has_one :note
end
