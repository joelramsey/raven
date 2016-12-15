require 'rails_helper'

RSpec.describe Record, type: :model do
  let(:user) {FactoryGirl.create(:user)}
  before do
  	@record= FactoryGirl.create(:record)
  end

  describe 'associations' do
  	it {should belong_to(:project)} 
  end
  
  describe 'validation' do
	it 'is not valid without a result' do
	  @record.result = nil
	  expect(@record).to_not be_valid
	end

	it 'is valid with a result' do
	  @record.result = '{"status"=> "half dead", "name"=>"Joel", "usage"=>"all of the time"}'
	  expect(@record).to be_valid
	end
  end

end
