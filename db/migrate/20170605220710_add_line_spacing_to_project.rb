class AddLineSpacingToProject < ActiveRecord::Migration[5.0]
  def change
    add_column :projects, :line_spacing, :string
  end
end
