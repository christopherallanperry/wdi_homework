class PigLatin

  VOWELS             = 'aeiou'
  THREE_LETTER_RULES = %w(thr sch squ str scr)
  TWO_LETTER_RULES   = %w(th qu ch sm tr sh st)

  def self.translate(word)
    word.split(" ").map do |element|
      if meets_three_letter_rule?(element)
        element[3..-1] + element[0..2] + "ay"
      elsif meets_two_letter_rule?(element)
        element[2..-1] + element[0..1] + "ay"
      elsif begins_with_vowel?(element)
        element + "ay"
      else
        element[1..-1] + element[0] + "ay"
      end
    end.join(" ")
  end

  def self.meets_three_letter_rule?(element)
    THREE_LETTER_RULES.index(element[0..2]) != nil
  end

  def self.meets_two_letter_rule?(element)
    TWO_LETTER_RULES.index(element[0..1]) != nil
  end

  def self.begins_with_vowel?(element)
    VOWELS.index(element[0]) != nil
  end

end
