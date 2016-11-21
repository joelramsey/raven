class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :sign_in_count
end
