json.extract! project, :id, :name, :description, :created_at, :updated_at, :notes
json.url project_url(project, format: :json)