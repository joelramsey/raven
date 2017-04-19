class AddJsonToCitation < ActiveRecord::Migration[5.0]
  def change
    add_column :citations, :json, :string
  end
end
