class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :notes
  has_one :user
end
