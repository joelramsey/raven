class AddNotesToProject < ActiveRecord::Migration[5.0]
  def change
    add_column :projects, :notes, :string
  end
end
