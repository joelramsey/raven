class SessionsController < ApplicationController
  # make it here but you always move into another controller
  # and refactor it (you can actually do it all in one action with a switch)

  def facebook_login
    data = JSON.parse( request.body.read.to_s, symbolize_names: true)
    @graph = Koala::Facebook::API.new(data[:token])
    @profile = @graph.get_object("me?fields=email,first_name,last_name,picture.type(large)")

    unless @user = User.where(email: @profile["email"])&.first
      @user = User.new(email: @profile["email"])
    end
    #
    # Here you will make your logic for saving Facebook's data on your User model,
    # customize accordingly
    # TO-DO: move user creation in model and make some refactoring here
    #
    if @user.new_record?
      p = SecureRandom.urlsafe_base64(nil, false)
      @user.password = p
      @user.password_confirmation = p
      #
      # "Passwordless" login, user must set password after registering,
      # or be forever haunted by indecipherable SecureRandom value
      #
      @user.first_name = @profile["first_name"]
      @user.last_name = @profile["last_name"]
      @user.image = @profile["picture"]["data"]["url"]
      @user.confirmed_at = Time.now
      @user.uid = @profile["id"]
      @user.provider = 'facebook'
    end

    @user.save!
    if sign_in(:user, @user, store: false, bypass: false)
      render json:  {
          data: @user.create_new_auth_token
      }
    end
  end

  def google_login
    @profile = JSON.parse( request.body.read.to_s, symbolize_names: true)

    unless @user = User.where(email: @profile[:email])&.first
      @user = User.new(email: @profile[:email])
    end
    #
    # Here you will make your logic for saving Google's data on your User model,
    # customize accordingly
    # TO-DO: move user creation in model and make some refactoring here
    #
    if @user.new_record?
      p = SecureRandom.urlsafe_base64(nil, false)
      @user.password = p
      @user.password_confirmation = p
      #
      # "Passwordless" login, user must set password after registering,
      # or be forever haunted by indecipherable SecureRandom value
      #
      names = @profile[:name].split(' ')
      @user.first_name = names[1] unless names[1].blank?
      @user.last_name = names[0] unless names[0].blank?
      @user.image = @profile[:image]
      @user.confirmed_at = Time.now
      @user.uid = @profile[:uid]
      @user.provider = 'google'
    end

    @user.save!
    if sign_in(:user, @user, store: false, bypass: false)
      render json:  {
          data: @user.create_new_auth_token
      }
    end
  end

  def linkedin_login
    @profile = (JSON.parse(request.body.read.to_s, symbolize_names: true))[:values][0]

    unless @user = User.where(email: @profile[:emailAddress])&.first
      @user = User.new(email: @profile[:emailAddress])
    end
    #
    # Here you will make your logic for saving Linked IN's data on your User model,
    # customize accordingly
    # TO-DO: move user creation in model and make some refactoring here
    #
    if @user.new_record?
      p = SecureRandom.urlsafe_base64(nil, false)
      @user.password = p
      @user.password_confirmation = p
      #
      # "Passwordless" login, user must set password after registering,
      # or be forever haunted by indecipherable SecureRandom value
      #
      @user.first_name = @profile[:firstName]
      @user.last_name = @profile[:lastName]
      @user.image = @profile[:pictureUrl] unless @profile[:pictureUrl].blank?
      @user.confirmed_at = Time.now
      @user.uid = @profile[:id]
      @user.provider = 'linkedin'
    end

    @user.save!
    if sign_in(:user, @user, store: false, bypass: false)
      render json:  {
          data: @user.create_new_auth_token
      }
    end
  end

  def twitter_login
    consumer_key = 'your_consumer_key'
    consumer_secret = 'your_consumer_secret'

    uri = URI.parse(params['currentUrl'])
    query_hash = CGI.parse(uri.query)

    client1 = TwitterOAuth::Client.new(
        :consumer_key => consumer_key,
        :consumer_secret => consumer_secret,
    )

    access_token = client1.authorize(
        params['requestToken'],
        params['requestSecret'],
        :oauth_verifier => query_hash['oauth_verifier'][0]
    )

    client2 = TwitterOAuth::Client.new(
        :consumer_key => consumer_key,
        :consumer_secret => consumer_secret,
        :token => access_token.token,
        :secret => access_token.secret
    )

    @profile = client2.verify_credentials

    unless @user = User.where(email: @profile['email'])&.first
      @user = User.new(email: @profile['email'])
    end
    #
    # Here you will make your logic for saving Twitter's data on your User model,
    # customize accordingly
    # TO-DO: move user creation in model and make some refactoring here
    #
    if @user.new_record?
      p = SecureRandom.urlsafe_base64(nil, false)
      @user.password = p
      @user.password_confirmation = p
      #
      # "Passwordless" login, user must set password after registering,
      # or be forever haunted by indecipherable SecureRandom value
      #
      names = @profile['name'].split(' ')
      @user.first_name = names[0] unless names[0].blank?
      @user.last_name = names[1] unless names[1].blank?
      @user.image = @profile['profile_image_url'] unless @profile['profile_image_url'].blank?
      @user.confirmed_at = Time.now
      @user.uid = @profile['id']
      @user.provider = 'twitter'
    end

    # you can make it in one function and reference it:
    @user.save!
    if sign_in(:user, @user, store: false, bypass: false)
      render json:  {
          data: @user.create_new_auth_token
      }
    end
  end

end
