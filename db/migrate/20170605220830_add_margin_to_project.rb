class AddMarginToProject < ActiveRecord::Migration[5.0]
  def change
    add_column :projects, :margin, :string
  end
end
