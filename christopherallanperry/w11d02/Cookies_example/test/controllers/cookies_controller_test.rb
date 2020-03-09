require 'test_helper'

class CookiesControllerTest < ActionDispatch::IntegrationTest
  test "should get example_1" do
    get cookies_example_1_url
    assert_response :success
  end

  test "should get example_2" do
    get cookies_example_2_url
    assert_response :success
  end

  test "should get example_3" do
    get cookies_example_3_url
    assert_response :success
  end

end
