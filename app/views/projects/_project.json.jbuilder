json.extract! project, :id, :name, :description, :created_at, :updated_at,
              :notes, :citation_style, :template_type, :margin, :line_spacing,
              :font_size
json.url project_url(project, format: :json)