require 'faker'
require 'yajl'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# user = User.create!({provider: 'email', uid: '1234567', email: 'test@gmail.com', password: '!QAZxsw2'})
# project = user.projects.create!({name: 'Chemistry Stuff', description: 'A test project with chemistry stuff'})
# record = project.records.create!({title: 'first source', result: 'Results from source one'})
# citation = Citation.create!({text: 'some citation stuff', record_id: 1})

# #Create Users
#   user = User.create!({
#     last_name:     'ramsey',
#     first_name:    'joel',
#     provider: 'email',
#     uid: 	  '',
#     email:    'joel@me.com',
#     password: 'joelthepole'
#     })
#   users = User.all
#
#  # Create Projects
#   project = user.projects.create!(
#      name:         Faker::Lorem.sentence,
#      description:  Faker::Lorem.paragraph
#   )
#   projects = Project.all
#
#  # Create Resolutions
#   resolution = user.resolutions.create!(
#      entities:     Faker::Lorem.sentence
#   )
#   resolutions = Resolution.all
#
#  # Create Records
#  20.times do
#    record = project.records.create!(
#      result:  Faker::Lorem.paragraph
#    )
#  end
#  records = Record.all
# citations = Citation.all




file = File.join(Rails.root, 'db', 'sample.json')

  json = File.new(file, 'r')
  parser = Yajl::Parser.new
  hash = parser.parse(json)
  num = 0
  #hash = hash.to_json
    hash.each do |stuff|
      Article.create(text: stuff)
      puts num += 1
      sleep(0.25)
    end


articles = Article.all



 # puts "Seeding finished"
 # puts "#{User.count} users created"
 # puts "#{Project.count} projects created"
 # puts "#{Resolution.count} resolutions created"
 # puts "#{Record.count} records created"
 # puts "#{Citation.count} citations created"
 puts "#{Article.count} articles created"