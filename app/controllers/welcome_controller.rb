class WelcomeController < ApplicationController

  def index
    if !params["city"] || !params["state"]
      params["city"] = "denver"
      params["state"] = "co"
    end
    @data = DataFetcher.new.fetch_hoods(params["city"], params["state"])
    @hoods = []
    @data["regionchildren"]["response"]["list"]["region"].each do |name|
      @hoods << name["name"]
    end
    # render :json
  end

  def hoods
    if !params["city"] || !params["state"]
      params["city"] = "denver"
      params["state"] = "co"
    end
    @data = DataFetcher.new.fetch_hoods(params["city"], params["state"])
    @hoods = []
    @data["regionchildren"]["response"]["list"]["region"].each do |name|
      @hoods << name["name"]
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
    @data["demographics"]["response"]["pages"]["page"][1]["tables"]["table"].each do |stat|
      @hood << stat
    end
    render json: @hood

  end


end
