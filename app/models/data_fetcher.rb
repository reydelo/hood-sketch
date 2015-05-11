require 'json'

class DataFetcher

  def initialize
    @zillow = Faraday.new(:url => 'http://www.zillow.com') do |faraday|
      faraday.request  :url_encoded             # form-encode POST params
      faraday.response :logger                  # log requests to STDOUT
      faraday.adapter  Faraday.default_adapter  # make requests with Net::HTTP
    end
  end

  def fetch_hoods
    response = @zillow.get do |req|
      req.url "/webservice/GetRegionChildren.htm?zws-id=X1-ZWz1a8nid40f7v_4srxq&state=co&city=denver&childtype=neighborhood"
    end
    parsed = JSON.parse(Hash.from_xml(response.body).to_json)
    parsed["regionchildren"]["response"]["list"]["region"].each do |name|
      puts name["name"]
    end
  end

  def fetch_hood_sketch
    response = @zillow.get do |req|
      req.url "/webservice/GetDemographics.htm?zws-id=X1-ZWz1a8nid40f7v_4srxq&state=CO&city=Denver&neighborhood=CapitolHill"
    end
  end

end
