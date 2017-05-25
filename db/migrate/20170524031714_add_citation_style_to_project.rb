class AddCitationStyleToProject < ActiveRecord::Migration[5.0]
  def change
    add_column :projects, :citation_style, :string
  end
end
