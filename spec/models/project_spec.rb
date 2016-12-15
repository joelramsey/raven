require 'rails_helper'

RSpec.describe Project, type: :model do
  let(:user) {FactoryGirl.create(:user)}
  before do
  	@project= FactoryGirl.create(:project)
  end

  describe 'associations' do
  	  it {should belong_to(:user)}
  	  it {should have_many(:records)}
  	  it {should have_one(:note)}
  end
  
  describe 'validation' do		
	  it 'is not valid without a name' do
		@project.name = nil
		expect(@project).to_not be_valid
	  end

	  it 'is valid with a name' do
	  	@project.name = 'Test Project 1'
	  	expect(@project).to be_valid
	  end

	  it 'is not valid without a description' do
		@project.description = nil
		expect(@project).to_not be_valid
	  end

	  it 'is valid with a description' do
	  	@project.description = 'A test project to see if I work'
	  	expect(@project).to be_valid
	  end
	end
end
