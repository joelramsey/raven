class AddTemplateTypeToProject < ActiveRecord::Migration[5.0]
  def change
    add_column :projects, :template_type, :string
  end
end
