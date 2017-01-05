class RecordSerializer < ActiveModel::Serializer
  attributes :id, :result, :title, :visible
end
