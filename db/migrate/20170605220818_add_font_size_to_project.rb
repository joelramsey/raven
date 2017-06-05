class AddFontSizeToProject < ActiveRecord::Migration[5.0]
  def change
    add_column :projects, :font_size, :string
  end
end
