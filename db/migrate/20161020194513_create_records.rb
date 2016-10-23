class CreateRecords < ActiveRecord::Migration[5.0]
  def change
    create_table :records do |t|
      t.string :result, null: false

      t.timestamps
    end

  end
end
