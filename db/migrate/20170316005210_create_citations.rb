class CreateCitations < ActiveRecord::Migration[5.0]
  def change
    create_table :citations do |t|
      t.string :text

      t.timestamps
    end
  end
end
