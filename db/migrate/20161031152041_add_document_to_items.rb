class AddDocumentToItems < ActiveRecord::Migration[5.0]
  def change
    add_column :items, :document, :string
  end
end
