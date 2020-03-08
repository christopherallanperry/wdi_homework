class CreateContinents < ActiveRecord::Migration[5.0]
  def change
    create_table :continents do |t|
      t.string :name
      t.string :highpoint_name
      t.integer :highpoint_elevation
      t.string :lowpoint_name
      t.integer :lowpoint_elevation

      t.timestamps
    end
  end
end
