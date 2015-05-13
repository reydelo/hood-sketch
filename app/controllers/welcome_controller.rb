class WelcomeController < ApplicationController

  def index
    if !params["city"] || !params["state"]
      params["city"] = "denver"
      params["state"] = "co"
    end
    @data = DataFetcher.new.fetch_hoods(params["city"], params["state"])
    @lat = @data["regionchildren"]["response"]["region"]["latitude"]
    @long = @data["regionchildren"]["response"]["region"]["longitude"]
  end

  def hoods
    if !params["city"] || !params["state"]
      params["city"] = "denver"
      params["state"] = "co"
    end
    @data = DataFetcher.new.fetch_hoods(params["city"], params["state"])
    @lat = @data["regionchildren"]["response"]["region"]["latitude"]
    @long = @data["regionchildren"]["response"]["region"]["longitude"]
    @hoods = []
    @data["regionchildren"]["response"]["list"]["region"].each do |name|
      @hoods << name
    end
    render json: @hoods
  end

  def hood
    if !params["city"] || !params["state"] || !params["hood"]
      params["city"] = "denver"
      params["state"] = "co"
      params["hood"] = "capitolhill"
    end
    @data = DataFetcher.new.fetch_hood_sketch(params["city"], params["state"], params["hood"])
    @hood = []
    @data["demographics"]["response"]["pages"]["page"].each do |stat|
      @hood << stat
    end
    render json: @hood
  end

end
