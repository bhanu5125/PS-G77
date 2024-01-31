// AnagramGenerator.js

let threeletterwords = [
    "cat", "dog", "bat", "rat", "hat", "mat", "pat", "sat", "bet", "get",
    "jet", "set", "net", "wet", "met", "let", "nut", "hut", "cut", "but",
    "rut", "pot", "dot", "lot", "cot", "hot", "not", "got", "jot", "tot",
    "dot", "pop", "hop", "top", "cop", "mop", "hop", "bop", "yam",
    "jam", "ram", "dam", "ham", "bam", "pam", "gem", "him", "pen", "hen",
    "den", "ten", "men", "yen", "kin", "tin", "win", "fin", "pin", "bin",
    "sin", "gin", "kin", "dim", "rim", "him",  "slim", "swim", "grim",
    "trim", "brim", "whim", "whim", "gum", "sum", "hum", "rum", "bum", "tum",
    "yum", "hum", "pup", "cup", "sup", "yup", "hup", "dip", "rip", 
    "lip", "sip", "hip", "zip", "rip", "nip", "pip", "sip", "tip", "lip"
]
const fourletterwords = [
    "card", "dart", "part", "cart", "mate", "date", "late", "rate", "bone", "cone",
    "done", "tone", "golf", "wolf", "self", "belt", "felt", "melt", "tent", "dent",
    "rent", "vent", "farm", "barn", "torn", "born", "word", "bird", "lady", "tide",
    "ride", "hide", "wide", "blue", "clue", "glue", "true", "flip", "slip", "clip",
    "trip", "jump", "lump", "pump", "bump", "star", "scar", "tart", "mart", "meal",
    "seal", "deal", "real", "jump", "lump", "pump", "bump", "king", "ring", "sing",
    "wing", "sand", "band", "hand", "land", "belt", "felt", "melt", "tent", "dent",
    "rent", "vent", "gift", "lift", "rift", "raft", "bold", "fold", "gold", "told",
    "hero", "zero", "hero", "zero", "cold", "mold", "fold", "gold", "bark", "dark",
    "mark", "park", "soap", "goal", "coal", "seal", "deal", "real", "meal", "zeal"
]
const fiveletterwords= [
    "apple", "table", "crane", "plane", "train", "horse", "worse", "store", "piano", "radio",
    "music", "happy", "jolly", "money", "sunny", "cloud", "dance", "quick", "blend", "blend",
    "smile", "grass", "green", "beach", "sandy", "peace", "beard", "snake", "block", "clock",
    "paper", "pencil", "crazy", "dream", "world", "frost", "frown", "globe", "foggy", "lunar",
    "magic", "ocean", "swirl", "storm", "lunar", "space", "jumps", "lunar", "space", "jumps",
    "sweep", "sleep", "dream", "greet", "haste", "grace", "flash", "fleet", "greet", "haste",
    "grace", "flash", "fleet", "sharp", "sheep", "shake", "share", "sharp", "sheep", "shake",
    "share", "quest", "quack", "quick", "quite", "quest", "quack", "quick", "quite", "music",
    "noise", "crisp", "clear", "swift", "swarm", "wrist", "write", "crisp", "clear", "swift"
]
const sixletterwords=[
    "banana", "rocket", "purple", "yellow", "silver", "monkey", "friend", "hidden", "shadow", "spirit",
    "gentle", "simple", "summer", "winter", "orange", "circle", "square", "triangle", "purple", "yellow",
    "sunset", "pretty", "family", "garden", "smooth", "planet", "dragon", "forest", "hidden", "golden",
    "silent", "whistle", "listen", "rocket", "guitar", "yellow", "circle", "square", "spring", "flower",
    "giraffe", "elephant", "journey", "moment", "secret", "bright", "castle", "rocket", "whistle", "golden",
    "winter", "smooth", "circle", "sunset", "moment", "secret", "bright", "castle", "shadow", "golden",
    "winter", "smooth", "circle", "sunset", "spirit", "moment", "secret", "bright", "castle", "rocket",
    "whistle", "golden", "winter", "smooth", "circle", "sunset", "secret", "bright", "castle", "shadow",
    "spirit", "moment", "golden", "winter", "smooth", "circle", "sunset", "whistle", "bright", "castle",
    "rocket", "shadow", "spirit", "moment", "secret", "golden", "winter", "smooth", "circle", "sunset"
]

const sevenletterwords=[
    "awesome", "victory", "journey", "freedom", "special", "fantasy", "silence", "perfect", "champion", "country",
    "nothing", "capture", "freight", "history", "journal", "library", "momentum", "reserve", "diamond", "monster",
    "weather", "inspire", "promise", "upgrade", "visible", "justice", "balance", "fortune", "present", "morning",
    "charity", "abandon", "support", "analyze", "whisper", "explode", "stomach", "stretch", "believe", "complete",
    "stumble", "whistle", "plumber", "landing", "through", "capture", "freight", "history", "journal", "library",
    "momentum", "reserve", "diamond", "monster", "weather", "inspire", "promise", "upgrade", "visible", "justice",
    "balance", "fortune", "present", "morning", "charity", "abandon", "support", "analyze", "whisper", "explode",
    "stomach", "stretch", "believe", "complete", "stumble", "whistle", "plumber", "landing", "through", "realize",
    "compose", "freight", "history", "journal", "library", "momentum", "reserve", "diamond", "monster", "weather",
    "inspire", "promise", "upgrade", "visible", "justice", "balance", "fortune", "present", "morning", "charity"
]
const eightletterwords=[
    "hospital", "stronger", "daughter", "tomorrow", "everyday", "umbrella", "whisper", "triangle", "colorful", "internet",
    "favorite", "distance", "birthday", "creative", "remember", "slippery", "together", "mountain", "whistle", "anywhere",
    "football", "planning", "cleaning", "crocodile", "flashing", "invisible", "knowledge", "listening", "beautiful", "fountain",
    "goodness", "terrible", "splendid", "scissors", "sickness", "straight", "language", "password", "remember", "tomorrow",
    "hospital", "stronger", "daughter", "everyday", "umbrella", "whisper", "triangle", "colorful", "internet", "favorite",
    "distance", "birthday", "creative", "remember", "slippery", "together", "mountain", "whistle", "anywhere", "football",
    "planning", "cleaning", "crocodile", "flashing", "invisible", "knowledge", "listening", "beautiful", "fountain", "goodness",
    "terrible", "splendid", "scissors", "sickness", "straight", "language", "password", "remember", "tomorrow", "hospital", "stronger",
    "daughter", "everyday", "umbrella", "whisper", "triangle", "colorful", "internet", "favorite", "distance", "birthday", "creative",
    "remember", "slippery", "together", "mountain", "whistle", "anywhere", "football", "planning", "cleaning", "crocodile", "flashing"
]
const nineletterwords=[
    "important", "direction", "celebrate", "challenge", "experience", "appreciate", "literature", "technology", "adventure", "attention",
    "friendship", "understand", "generation", "decoration", "celebrity", "difference", "conference", "leadership", "tremendous", "definitely",
    "continuous", "foundation", "revolution", "background", "condition", "government", "conclusion", "imagination", "competition", "accessible",
    "generation", "experience", "appreciate", "celebrate", "literature", "technology", "adventure", "direction", "challenge", "important", "attention",
    "friendship", "understand", "difference", "celebrity", "conference", "leadership", "tremendous", "decoration", "definitely", "continuous", "foundation",
    "revolution", "background", "condition", "government", "conclusion", "imagination", "competition", "accessible", "generation", "experience", "appreciate",
    "celebrate", "literature", "technology", "adventure", "direction", "challenge", "important", "attention", "friendship", "understand", "difference", "celebrity",
    "conference", "leadership", "tremendous", "decoration", "definitely", "continuous", "foundation", "revolution", "background", "condition", "government", "conclusion",
    "imagination", "competition", "accessible", "generation", "experience", "appreciate", "celebrate", "literature", "technology", "adventure", "direction", "challenge"
]
const tenletterwords=[
    "confidence", "conclusion", "reflection", "experience", "friendship", "celebration", "generation", "appreciate", "leadership", "challenge",
    "difference", "continuous", "background", "government", "adventure", "direction", "technology", "foundation", "literature", "tremendous",
    "definitely", "imagination", "competition", "revolution", "celebrity", "conference", "understand", "condition", "decoration", "accessible",
    "important", "attention", "friendship", "celebration", "generation", "appreciate", "leadership", "challenge", "experience", "difference",
    "continuous", "background", "government", "adventure", "direction", "technology", "foundation", "literature", "tremendous", "definitely",
    "imagination", "competition", "revolution", "celebrity", "conference", "understand", "condition", "decoration", "accessible", "important",
    "attention", "friendship", "celebration", "generation", "appreciate", "leadership", "challenge", "experience", "difference", "continuous",
    "background", "government", "adventure", "direction", "technology", "foundation", "literature", "tremendous", "definitely", "imagination",
    "competition", "revolution", "celebrity", "conference", "understand", "condition", "decoration", "accessible", "important", "attention"
]
const elevenletterwords=[
    "imagination", "celebration", "friendliness", "competition", "experience", "decoration", "reflection", "difference", "leadership", "generation",
    "adventure", "continuous", "background", "government", "technology", "literature", "challenge", "foundation", "confidence", "definitely", 
    "celebration", "friendliness", "competition", "experience", "decoration", "reflection", "difference", "leadership", "generation", "adventure", 
    "continuous", "background", "government", "technology", "literature", "challenge", "foundation", "confidence", "definitely", "imagination", 
    "revolutionary", "celebrity", "conference", "understand", "condition", "accessible", "tremendous", "interesting", "breathtaking", "environment",
    "development", "unbelievable", "construction", "enthusiastic", "inspiration", "conclusion", "exaggeration", "recognition", "conversation", "celebration",
    "friendliness", "competition", "experience", "decoration", "reflection", "difference", "leadership", "generation", "adventure", "continuous", 
    "background", "government", "technology", "literature", "challenge", "foundation", "confidence", "definitely", "imagination", "revolutionary", 
    "celebrity", "conference", "understand", "condition", "accessible", "tremendous", "interesting", "breathtaking", "environment", "development",
    "unbelievable", "construction", "enthusiastic", "inspiration", "conclusion", "exaggeration", "recognition", "conversation", "celebration"
]
const AnagramGenerator = {
    getRandomWord: (score) => {
        let wordsForScore=threeletterwords
        if (score > 10 && score <= 20) {
            wordsForScore = fourletterwords;
          } else if (score > 20 && score <= 30) {
            wordsForScore = fiveletterwords;
          } else if (score > 30 && score <= 40) {
            wordsForScore = sixletterwords;
          } else if (score > 40 && score <= 50) {
            wordsForScore = sevenletterwords;
          } else if (score > 50 && score <= 60) {
            wordsForScore = eightletterwords;
          } else if (score > 60 && score <= 70) {
            wordsForScore = nineletterwords;
          } else if (score > 70 && score <= 80) {
            wordsForScore = tenletterwords;
          } else if (score > 80 && score <= 90) {
            wordsForScore = elevenletterwords;
          }
  
      const randomIndex = Math.floor(Math.random() * wordsForScore.length);
      return wordsForScore[randomIndex];
    },
    shuffleWord: (word) => {
      const shuffledWord = word.split('').sort(() => Math.random() - 0.5).join('');
      return shuffledWord;
    },
  };
  
  export default AnagramGenerator;