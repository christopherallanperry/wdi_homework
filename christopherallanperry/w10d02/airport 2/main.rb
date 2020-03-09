require_relative "airport"
require_relative "flight"
require_relative "passenger"

@airport = Airport.new("London Heathrow")

# In this program we want to allow the user to:
#
# - Add a flight to the airport
# - List all of the flights at an airport
# - Remove flights from aiport
# - Add a passenger to a flight
# - List passengers on a flight

def menu
  puts `clear`
  puts "*** Welcome to #{@airport.name} ***"
  puts "Choose a number for an operation to perform:\n"
  puts "\t1. Add a flight"
  puts "\t2. List flights"
  puts "\t3. Add passenger to flight"
  puts "\t4. List passengers of a flight"
  puts "\tQ. Quit"
  puts "\nEnter now: "
  gets.chomp
end

response = menu

while response.upcase != "Q"
  case response
  when "1"
    puts "How many seats are on this flight?"
    number_of_seats = gets.to_i
    puts "What is the flight's destination?"
    destination = gets.chomp
    flight = Flight.new(number_of_seats, destination)
    puts @airport.add_flight(flight)
  when "2"
  when "3"
  when "4"
  else
    # Something went wrong
  end
  gets
  response = menu
end
