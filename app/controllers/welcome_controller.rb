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


end
