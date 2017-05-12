#!/usr/bin/env bash
rails db:drop
rails db:create
rails db:schema:load
rails sunspot:solr:run
rails s
sleep 10
rails db:seed