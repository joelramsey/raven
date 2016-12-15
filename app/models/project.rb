class Project < ApplicationRecord
  belongs_to :user
  has_many :records
  has_one :note
  validates_presence_of :name, :description
end
