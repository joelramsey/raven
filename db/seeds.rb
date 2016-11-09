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
    name:     Faker::Name.name,
    provider: 'email',
    uid: 	  '',
    email:    Faker::Internet.email,
    password: Faker::Lorem.characters(10)
    })
users = User.all

 # Create Projects
   project = user.projects.create!(
     name:         Faker::Lorem.sentence,
     description:  Faker::Lorem.paragraph
   )
 projects = Project.all

 # Create Records
 20.times do
   record = project.records.create!(
     title:   Faker::Lorem.sentence,
     result:  Faker::Lorem.paragraph
   )
 end
 records = Record.all

 puts "Seeding finished"
 puts "#{User.count} users created"
 puts "#{Project.count} projects created"
 puts "#{Record.count} records created"