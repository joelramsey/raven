== README

## This readme covers Raven, a web-based text analytics application using Alchemy API as the extraction engine.

Phase One: Back-end development using Ruby on Rails to handle the data processing, including the calls to Alchemy's servers and the parsing, storage, and indexing.

Phase Two: Front-end development using AngularJS to create a rich and interactive user experience.

Phase Three: Incorporate special features and visualization library for analyzing the extraction results.

What we're working with:

* Rails 5.0.0.1 API mode

* Ruby 2.3.1p112

* Database = PostgreSQL 9.4

* Major system dependencies include:

[AlchemyAPI Ruby SDK](https://github.com/AlchemyAPI/alchemyapi_ruby) and associated [API key](http://www.alchemyapi.com/api/register.html)

Note for set up:
 - from root, run bundle install
 - rails db:create
 - rails db:schema:load
 - clone the ruby SDK into the lib folder of the application
 - the API key should be visible to the application from within the new alchemyapi_ruby directory root
 - the alchemy_parser.rb file in the services directory of the application handles the request
    and the parsing of the objects to the database. Serialization inbound and outbound are handled
    through the models and associated serializers
 - set your YOUR_APP_ID and YOUR_APP_SECRET in 'config\initializers\koala.rb' and YOUR_APP_ID in
 'client\src\app\login\login.component.ts' files to get Facebook auth works
 - set your YOUR_APP_ID in 'client\src\index.html' file to get Google auth works
 - set you api_key of your app in 'client\src\index.html' file for Linkedin script to get auth works
 - set you consumer_key and consumer_secret in 'controllers\sessions_controller.rb' and
 'client\src\app\login\login.component.ts' in ngOnInit function for twitter auth
 - set right callback url in 'client\src\app\login\login.routes.ts' and in 'client\src\app\login\login.component.ts'
 in twitterLogin function. Callback url should lead to it on TwitterCallback component.
 - set correct backend url in 'client\src\app\twitter-callback\twitter-callback.component.ts'


Starting the backend:
	-from root, rails s

Stopping the back end
	-ctrl + c	

Test out the API from Postman:
	-Post to database: 	POST localhost:3000/api/records?utf8=%E2%9C%93&type=url&inputfile=&q=https://www.yahoo.com/tv/kevin-meaney-veteran-stand-comic-dies-60-025911832.html&commit=An alyze" for 54.244.95.60 at 2016-10-20 22:20:32 +0000
		-modify the input with type= text or url (whichever you want) after &q just paste in either a url or a text body
	-Get all (Index): GET localhost:3000/api/records
	-Get specific record: GET localhost:3000/api/records/1 (whatever record number. in the future, we'll add some filters)

To do: 
	-Backend of account management
	-Authorization and authentication
	-Custom filters in the models for specific retrievals 
	-Front end


    
