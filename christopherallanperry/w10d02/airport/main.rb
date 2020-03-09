require_relative "airport"
require_relative "flight"
require_relative "passenger"

@airport = Airport.new("London Heathrow")

# In this program, we want to let the user to:
#
# - Add a flight to the airport
# - List all the slights at an airport
# - Remove flights from the airport
# - Add a passenger to a flight
# - List passengers on a flight

def menu
  # puts `clear`
  puts "Welcome to #{@airport.name}"
  puts "Choose a number for the operation you want to perform?"
  puts "\t1. Add a flight"
  puts "\t2. List flights"
  puts "\t3. Add a passenger to a flight"
  puts "\t4. List passengers on a flight"
  puts "\tQ. Quit"
  puts "\nEnter now: "
  gets.chomp
end

response = menu

def list_passengers(flight)
  flight.passengers.each_with_index do |passenger, index|
    puts "#{index}. #{passenger.name}"
  end
end

def list_flights(airport)
  airport.flights.each_with_index do |flight, index|
    puts "#{index}.\t#{flight}"
  end
end

while response.upcase != "Q"
  case response
  when "1"
    puts "How many seats are on this flight"
    number_of_seats = gets.to_i
    puts "What is the flight's destination"
    destination = gets.chomp
    flight = Flight.new(number_of_seats, destination)
    puts @airport.add_flight(flight)
  when "2"
    puts "Here is a list of the flights"
    list_flights(@airport)
    gets
  when "3"
    puts "What is the passenger's name?"
    name = gets.chomp
    passenger = Passenger.new(name)

    puts "Which flight do you you wish to add the passenger to?"
    list_flights(@airport)

    flight_number = gets.chomp.to_i
    flight = @airport.flights[flight_number]

    flight.add_passenger(passenger)
    puts "#{passenger.name} added to #{flight}"
    gets
  when "4"
    puts "What flight do you wish to list the passengers for?"
    list_flights(@airport)

    flight_number = gets.chomp.to_i
    flight = @airport.flights[flight_number]

    puts "The passenger list for this flight is:"
    list_passengers(flight)
    gets
  else
    # Do something
  end
  gets
  response = menu
end
