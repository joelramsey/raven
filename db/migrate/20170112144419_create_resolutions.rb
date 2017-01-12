class CreateResolutions < ActiveRecord::Migration[5.0]
  def change
    create_table :resolutions do |t|
      t.integer :user_id
      t.string :entities

      t.timestamps
    end
  end
end
