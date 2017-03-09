class Article < ApplicationRecord
  serialize :text
  searchable do
    text :text
  end
end
