class AddProjectToRecords < ActiveRecord::Migration[5.0]
  def change
    add_reference :records, :project, foreign_key: true
  end
end
