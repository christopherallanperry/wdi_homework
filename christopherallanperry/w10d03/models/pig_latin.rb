class PigLatin

  def self.process_phrase(phrase_array)
    @new_phrase = []
    phrase_array.each { |x|
      temp = self.translate(x)
      @new_phrase << temp
    }
    @new_phrase
  end

  def self.translate(word)
    if (word[0] == "a")
      word += "ay"
    end

    if (word[0] == "e")
      word += "ay"
    end

    if (word[0] == "p")
      translated = word.split(//, 2)
      translated[1] + translated[0] + "ay"
    end

    if (word[0] == "k")
      translated = word.split(//, 2)
      translated[1] + translated[0] + "ay"
    end

    if (word[0, 2] == "ch")
      translated = word.partition("ch")
      translated[2] + translated[1] + "ay"
    end

    if (word[0, 2] == "qu")
      translated = word.partition("qu")
      translated[2] + translated[1] + "ay"
    end

    if (word[1, 2] == "qu")
      vowels = ["a", "e", "i", "o", "u"]
      translated = word.partition("qu")
      if (!vowels.include?(translated[0]))
        translated[2] + translated[0] + translated[1] + "ay"
      end
    end

    if (word[0, 2] == "th")
      translated = word.partition("th")
      translated[2] + translated[1] + "ay"
    end

    # test word beginning with "thr"
    if (word[0, 3] == "thr")
      translated = word.partition("thr")
      translated[2] + translated[1] + "ay"
    end

    # test word beginning with "sch"
    if (word[0, 3] == "sch")
      translated = word.partition("sch")
      translated[2] + translated[1] + "ay"
    end

    # test translates phrase "quick fast run"
    if (word.include?(" "))
      translated = word.split
      process_phrase(translated)
    end
  end
end
