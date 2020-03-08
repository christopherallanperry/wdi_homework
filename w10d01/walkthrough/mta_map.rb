# Setup map hash
map = {
  "n" => ["Times Square", "34th", "28th", "23rd", "Union Square", "8th"],
  "l" => ["8th", "6th", "Union Square", "3rd", "1st"],
  "6" => ["Grand Central", "33rd", "28th", "23rd", "Union Square", "Astor"]
}

# User inputs the line that they are joining
puts "Which line are you getting on at? N, L or 6?"
line_one = gets.chomp.downcase

# User  inputs the station that they are getting on at
puts "Which station are you getting on at? The stations are #{map[line_one][0..-2].join(', ')} or #{map[line_one][-1]}"
station_one = gets.chomp.downcase

# User inputs the line they are getting off at
puts "Which line are you getting off at? N, L or 6?"
line_two = gets.chomp.downcase

# User inputs the station they are getting off at
puts "Which station are you getting on at? The stations are #{map[line_two][0..-2].join(', ')} or #{map[line_two][-1]}"
station_two = gets.chomp.downcase

# If entry and exit lines are the same, return the number of stops between them
if line_one == line_two
  answer = (map[line_one].map(&:downcase).index(station_one) - map[line_two].map(&:downcase).index(station_two)).abs
else
  # If they are different, return the number of stops for each station to Union Square and add the result together
  answer = (map[line_one].map(&:downcase).index(station_one) - map[line_one].map(&:downcase).index('union square')).abs +  (map[line_two].map(&:downcase).index(station_two) - map[line_two].map(&:downcase).index('union square')).abs
end

puts "You will go through #{answer} stop#{answer == 1 ? '' : 's'}. #{(answer != 0 && station_one != 'union square' && station_two != 'union square' && line_one != line_two) ? 'Change at Union Square' : ''}"
