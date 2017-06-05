class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :citation_style, :margin, :template_type,
             :font_size, :line_spacing
  
end
