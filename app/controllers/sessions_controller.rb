class SessionsController < ApplicationController
  # make it here but you always move into another controller

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
      @user.first_name = names[1]
      @user.last_name = names[0]
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

end
