require 'rails_helper'

RSpec.describe Note, :type => :model do
  let(:project) {FactoryGirl.create(:project)}
  before do
  	@note = FactoryGirl.create(:note, project: project)
  end

  describe 'associations' do
    it {should belong_to(:project)}
  end

  describe 'validation' do
    it 'is not valid without a note string' do
  	  @note.note = nil
  	  expect(@note).to_not be_valid
    end

    it 'is valid with a note string' do
    	@note.note = 'I am a project note'
    	expect(@note).to be_valid
    end
  end
  
end
