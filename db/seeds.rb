require 'faker'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# user = User.create!({provider: 'email', uid: '1234567', email: 'test@gmail.com', password: '!QAZxsw2'})
# project = user.projects.create!({name: 'Chemistry Stuff', description: 'A test project with chemistry stuff'})
# project.records.create!({title: 'first source', result: 'Results from source one'})

#Create Users
  user = User.create!({
    last_name:     'ramsey',
    first_name:    'joel',
    provider: 'email',
    uid: 	  '',
    email:    'joel@me.com',
    password: 'joelthepole'
    })
  users = User.all

 # Create Projects
  project = user.projects.create!(
     name:         Faker::Lorem.sentence,
     description:  Faker::Lorem.paragraph
  )
  projects = Project.all

 # Create Resolutions
  resolution = user.resolutions.create!(
     entities:     Faker::Lorem.sentence 
  )
  resolutions = Resolution.all

 # Create Records
 20.times do
   record = project.records.create!(
     result:  Faker::Lorem.paragraph
   )
 end
 records = Record.all

 20.times do
   article = Article.create!(
     text: Faker::Lorem.paragraph
   )
 end
 articles = Article.all

 puts "Seeding finished"
 puts "#{User.count} users created"
 puts "#{Project.count} projects created"
 puts "#{Resolution.count} resolutions created"
 puts "#{Record.count} records created"
 puts "#{Article.count} articles created"