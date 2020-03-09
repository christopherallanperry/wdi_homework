class CreateCountries < ActiveRecord::Migration[5.0]
  def change
    create_table :countries do |t|
      t.string :name
      t.string :image
      t.integer :size
      t.float :population
      t.string :currency
      t.float :gdp
      t.references :continents, foreign_key: true

      t.timestamps
    end
  end
end
