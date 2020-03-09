line_n = ["Times Square", "34th", "28th", "23rd", "Union Square", "8th"]
union_on_n = line_n.index("Union Square")
line_6 = ["Grand Central", "33rd", "28th", "23rd", "Union Square", "Astor Place"]
union_on_6 = line_6.index("Union Square")
line_l = ["8th", "6th", "Union Square", "3rd", "1st"]
union_on_l = line_l.index("Union Square")

start_and_union = []
dest_and_union = []


puts "Which station do you wish to start from? Options..."
puts "Line N: Times Square, 34th, 28th, 23rd, Union Square, 8th"
puts "Line 6: Grand Central, 33rd, 28th, 23rd, Union Square, Astor Place"
puts "Line L: 8th, 6th, Union Square, 3rd, 1st"
start_stn = gets.chomp
puts "On which line?"
puts "Options: N, 6 or L"
start_line = gets.chomp

puts "Which station do you wish to travel to? Options..."
puts "Line N: Times Square, 34th, 28th, 23rd, Union Square, 8th"
puts "Line 6: Grand Central, 33rd, 28th, 23rd, Union Square, Astor Place"
puts "Line L: 8th, 6th, Union Square, 3rd, 1st"
dest_stn = gets.chomp
puts "On which line?"
puts "Options: N, 6 or L"
dest_line = gets.chomp

case start_line
when "N"
  start_stn_index = line_n.index(start_stn)
  start_and_union.push(start_stn_index)
  start_and_union.push(union_on_n)
  start_and_union.sort!
  # puts "Start station index: #{start_stn_index}"
when "6"
  start_stn_index = line_6.index(start_stn)
  start_and_union.push(start_stn_index)
  start_and_union.push(union_on_6)
  start_and_union.sort!
  # puts "Start station index: #{start_stn_index}"
when "L"
  start_stn_index = line_l.index(start_stn)
  start_and_union.push(start_stn_index)
  start_and_union.push(union_on_l)
  start_and_union.sort!
  # puts "Start station index: #{start_stn_index}"
else
  puts "That's an unknown answer!"
end

case dest_line
when "N"
  dest_stn_index = line_n.index(dest_stn)
  dest_and_union.push(dest_stn_index)
  dest_and_union.push(union_on_n)
  dest_and_union.sort!
  # puts "Destination station index: #{dest_stn_index}"
when "6"
  dest_stn_index = line_6.index(dest_stn)
  dest_and_union.push(dest_stn_index)
  dest_and_union.push(union_on_6)
  dest_and_union.sort!
  # puts "Destination station index: #{dest_stn_index}"
when "L"
  dest_stn_index = line_l.index(dest_stn)
  dest_and_union.push(dest_stn_index)
  dest_and_union.push(union_on_l)
  dest_and_union.sort!
  puts "Destination station index: #{dest_stn_index}"
  puts "Union station index: #{union_on_l}"
  puts "Destination station array: #{dest_and_union}"
else
  puts "That's an unknown answer!"
end

# Find stops between Union Station and Starting Station
start_stops = start_and_union[1] - start_and_union[0]
puts "Start stops is: #{start_stops}"

# Find stops between Union Station and Destination Station
dest_stops = dest_and_union[1] - dest_and_union[0]
puts "Dest stops is: #{dest_stops}"

# Total stops between Starting Station and Destination Station
total_stops = start_stops + dest_stops
puts "The total number of stops between #{start_stn} on line #{start_line} and #{dest_stn} on line #{dest_line} is #{total_stops} stops"
