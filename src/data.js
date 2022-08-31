const TwinkType = [
    { symbol: "1", label: "Beach Twink", description: "The beach twink is often a sun- bleached blonde, well tanned, and well defined. Sub-genres of beach twink are the VBall Twink and SurferTwink." },
    { symbol: "2", label: "Nuevo West Twink", description: "The old west was never quite like this. Colorful, sharp, and not nearly weathered enough, if cowboys were fashion slaves, they'd look like this." },
    { symbol: "3", label: "Rap Twink", description: "Marky Mark and the Funky Bunch have nothing on this twink. Urban fashion is raised to an art form by this delicious one." },
    { symbol: "4", label: "The All-American Twink", description: "Remember that quarterback you could never have in high school? This *is* him. Athletic, active, it's amazing how his hair stays in place." },
    { symbol: "5", label: "Euro Twink", description: "Think of Armani suits. Think of Italian convertibles. The finest European designers would love to have him on the runway." },
    { symbol: "6", label: "The Twink Next Door", description: "The boy next door never looked this good (well, mine never did). A suburban sensibility becomes a showcase for a gorgeous young guy." },
    { symbol: "7", label: "Radical Twink", description: "This twink marches to the beat of a different drummer. He may be wearing full renaissance garb (Felix, where are you?). He may be more subtle than that. But there's definitely something strange there..." },
    { symbol: "8", label: "Gym Twink", description: "The GymTwink may attempt any of the above styles (and pull them off successfully) but it's always that drop-dead-gorgeous bod that's overshadowing everything else. Even in sack cloth (we're talking *really* radical 7 here) he'd look incredible. GymTwinks should include what style they're attempting in their code (i.e. T8(5))" },
    { symbol: "9", label: "Appalachian Twink", description: "Jethro Bodine (of \"Beverly Hilbillies\" fame) was no Twink, but his style translates well. Overalls, with or without shoes and shirt (I like w/o shirt myself) are often characteristic." },
    { symbol: "10", label: "Grunge Twink", description: "\"Kurt Cobain, is that you?\" The ratty jeans are from Perry Ellis, the shirt is from Versace. It's amazing how stylish anti- style can be." }
];

const HairColour = [
    { label: "Black (Raven)" },
    { label: "Dark Brown" },
    { label: "Brown" },
    { label: "Light Brown" },
    { label: "Auburn" },
    { label: "Dark Red" },
    { label: "Bright Red" },
    { label: "Strawberry Blonde" },
    { label: "Blonde" },
    { label: "Totally Blonde" },
    { label: "Other", symbol: "X" }
];

const HairLength = [
    { label: "Shaved or Bald" },
    { label: "Very short" },
    { label: "Short" },
    { label: "Medium" },
    { label: "Shoulder Length" },
    { label: "Long" },
    { label: "Very Long" }
];

const HairWaviness = [
    { label: "Straight", symbol: "s" },
    { label: "Wavy", symbol: "w" },
    { label: "Curly", symbol: "c" }
];

const Hairlessness = [
    { label: "Smooth Body", symbol: "++"},
    { label: "Little bit of Hair", symbol: "+"},
    { label: "Neutral", symbol: ""},
    { label: "Above Average Amount of Hair", symbol: "-"},
    { label: "Veritable Furball", symbol: "--"}
]

const Dizziness = [
    { label: "Head in the clouds", symbol: "++", description: "Or at least somebody's shorts" },
    { label: "Present mentally", symbol: "+", description: "Only on special occasions" },
    { label: "Not totally dizzy", symbol: "", description: "But noticeably so" },
    { label: "Sometimes dizzy", symbol: null, description: "About average" },
    { label: "Rarely dizzy", symbol: "-", description: "" },
    { label: "Never dizzy", symbol: "--", description: "Even shows common sense sometimes" }
]

const Attitude = [
    { label: "Attitude from hell", symbol: "++", description: "Has enough for 20" },
    { label: "Above average", symbol: "+", description: "Only on special occasions" },
    { label: "Has attitude", symbol: "", description: "But noticeably so" },
    { label: "Attitude at times", symbol: null, description: "About average" },
    { label: "Mostly unpretentious", symbol: "-", description: "" },
    { label: "No attitude", symbol: "--", description: "What you see is what you get." }
]

const Whiningness = [
    { label: "Obnoxious", symbol: "++", description: "Will scream \"I'm BOOOORRRRRRED\" while you're still home and just getting dressed" },
    { label: "Whiny", symbol: "+", description: "Will state \"I'm boooorrrrrred\" immediately upon arrival at destination" },
    { label: "Complaining", symbol: "", description: "Will whine, even when not needed" },
    { label: "Neutral", symbol: null, description: "Lets his displeasure be known when appropriate" },
    { label: "Patient", symbol: "-", description: "Usually silent, but a peep may be heard every now and then" },
    { label: "Tranquil", symbol: "--", description: "Strong, silent type" }
]

const Tan = [
    { label: "Dark brown", symbol: "++", description: "" },
    { label: "Nice golden brown", symbol: "+", description: "" },
    { label: "The twink has a tan", symbol: "", description: "" },
    { label: "Doesn't get out much", symbol: null, description: "" },
    { label: "Fair skin", symbol: "-", description: "" },
    { label: "Looks like a ghost", symbol: "--", description: "" }
]

const AgeAppearance = [
    { label: "Teen Spirit", symbol: "++", description: "" },
    { label: "Barely Legal", symbol: "+", description: "Still gets carded most every time he buys liquor" },
    { label: "Twenty Something", symbol: "", description: "" },
    { label: "Working Adult", symbol: null, description: "Looks like he has been out of college for a while" },
    { label: "Mid-life Crisis", symbol: "-", description: "Looks like somebody's dad" },
    { label: "Walking Dead", symbol: "--", description: "Looks like somebody's grandfather" }
]

const DickSize = [
    { label: "20+ cm", symbol: "++", description: "" },
    { label: "16 cm - 20 cm", symbol: "+", description: "" },
    { label: "12 cm - 16 cm", symbol: "", description: "" },
    { label: "Undisclosed", symbol: null, description: "And thats fine." },
    { label: "8 cm - 12 cm", symbol: "-", description: "Do you really want to let people know?" },
    { label: "< 8 cm", symbol: "--", description: "You may not have much but you have guts" }
]

const BallsSize = [
    { label: "Huge and Bursting", symbol: "++", description: "" },
    { label: "Large and Filled", symbol: "+", description: "" },
    { label: "Above average", symbol: "", description: "" },
    { label: "Has Two", symbol: null, description: "" },
    { label: "There's Something", symbol: "-", description: "" },
    { label: "Barely Visible", symbol: "--", description: "You may not have much but you have guts" }
]

const Flavour = [
    { label: "Very sweet", symbol: "++", description: "Could be interchanged with filling of actual Hostess Twinkie (tm)" },
    { label: "Sweet", symbol: "+", description: "" },
    { label: "Pleasant", symbol: "", description: "" },
    { label: "Unremarkable", symbol: null, description: "" },
    { label: "Slightly Bitter", symbol: "-", description: "" },
    { label: "Campari is sweeter", symbol: "--", description: "" }
]

const Kinkiness = [
    { label: "Will try anything once", symbol: "++", description: "usually twice..." },
    { label: "Pretty adventurous", symbol: "+", description: "" },
    { label: "Will consider trying new things", symbol: "", description: "" },
    { label: "Unremarkable", symbol: null, description: "" },
    { label: "Has definite ABSOLUTE dislikes", symbol: "-", description: "" },
    { label: "Totally Vanilla", symbol: "--", description: "" }
]

const Sluttiness = [
    { label: "Strictly polygamous", symbol: "++", description: "Prefers very open relationships ONLY." },
    { label: "Generally polygamous", symbol: "+", description: "Will form relationships which are generally open-ended" },
    { label: "Neutral ", symbol: "", description: "" },
    { label: "Unremarkable", symbol: null, description: "" },
    { label: "Generally monogamous", symbol: "-", description: "Prefers a formal sort of relationship over playing around, however the scope of the word relationship is not defined here." },
    { label: "Strictly monogamous", symbol: "--", description: "No outside affairs, or in some cases, sex ONLY in relationships" } 
]

const MuscleDefinition = [
    { label: "Chiseled from marble", symbol: "++", description: "" },
    { label: "Chiseled from oak", symbol: "+", description: "" },
    { label: "chiseled from basswood (but still chiseled)", symbol: "", description: "" },
    { label: "Unremarkable", symbol: null, description: "" },
    { label: "Chiseled from Marshmallow", symbol: "-", description: "" },
    { label: "Chiseled from Marshmallow Creme", symbol: "--", description: "" } 
]

const MuscleMass = [
    { label: "Serious Meat on them Bones", symbol: "++", description: "" },
    { label: "More muscular than the average Joe", symbol: "+", description: "" },
    { label: "Small Muscles, but they're Definitely There ", symbol: "", description: "" },
    { label: "Unremarkable", symbol: null, description: "" },
    { label: "Well, if you *really* look hard...", symbol: "-", description: "" },
    { label: "Wishful thinking will only get you so far", symbol: "--", description: "" } 
]

const QFactor = [
    { label: "More effeminate than Donna Reed, Florence Henderson, and RuPaul combined", symbol: "++", description: "" },
    { label: "Swishes so much they sway", symbol: "+", description: "" },
    { label: "Queen", symbol: "", description: "" },
    { label: "Unremarkable", symbol: null, description: "" },
    { label: "Straight-acting", symbol: "-", description: "" },
    { label: "Probably should BE straight", symbol: "--", description: "" } 
]

const TwinkHawk = [
    { label: "Searches out Twinks when ever possible.", symbol: "++", description: "" },
    { label: "Really likes twinkies", symbol: "+", description: "" },
    { label: "Would like to meet a twinkie", symbol: "", description: "" },
    { label: "Unremarkable", symbol: null, description: "" },
    { label: "Doesn't care for twinkies", symbol: "-", description: "" },
    { label: "Is offended by them (why are you even here?)", symbol: "--", description: "" } 
]