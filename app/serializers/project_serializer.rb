class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :citation_style
  
end
