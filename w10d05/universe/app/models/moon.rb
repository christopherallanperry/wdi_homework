class Moon < ApplicationRecord
  belongs_to :planet
end

class Planet < ApplicationRecord
  has_many :moons
end
