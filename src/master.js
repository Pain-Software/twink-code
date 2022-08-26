const INPUT = document.getElementById("twinkcodeinput");
const BUTTON = document.getElementById("decode");
const RESULTS = document.getElementById("results");

const EnsureDefaultSymbols = (options) => options.map((option, index) => ({ ...option, symbol: option.symbol ?? index }));
const CreateSymbolMap = (options) => options.reduce((previous, current) => ({ ...previous, [current.symbol]: current }), {});
const ParseModifier = (input) => (input.match(/\(.+\)/gi)?.pop() ?? "").replace(/\(|\)/gi, "").trim() || null;

const ParseLetterWithNumber = (prefix, input) => (
    (code) => (
        {
            prefix,
            level: (code.match(new RegExp(`${prefix}.`, "g"))?.pop() ?? "").replace(prefix, ""),
            modifier: ParseModifier(code)
        }
    )
)(
    input.match(new RegExp(`${prefix}.(\\(\\d+\\))?`, "g"))?.pop() ?? ""
);

const ParseLetter = (options, input) => (
    (code) => (
        {
            prefix: "",
            level: code.replace(ParseModifier(code), ""),
            modifier: ParseModifier(code)
        }
    )
)(
    input.match(new RegExp(`(${options.join("|")})(\\(\\.\\))?`, "g"))?.pop() ?? ""
)

const ParseFactor = (prefix, input) => (
    (code) => (
        {
            prefix,
            level: code?.replace(prefix, "") ?? null,
            modifier: ""
        }
    )
)(
    input.match(new RegExp(`${prefix}((\\+\\+?)|(\\-\\-?)?)`, "g"))?.pop()
)

const composite = (...functions) => (input) => {
    let result = input;

    for (const func of functions) result = func(result);

    return result;
}

const RenderSection = (
    trait,
    code,
    data,
    colour = "from-pink-500 to-violet-500"
) => {
    return (`
        <section class="flex gap-8 p-2.5 w-full">
            <div class="w-48 h-48 shrink-0 grid place-items-center">
                <h1 class="text-8xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r ${colour} select-none">${code}</h1>
            </div>
            <div class="flex flex-col grow">
                <section class="space-y-2.5">
                    <h2 class="text-sm font-light border-b border-solid border-white">${trait}</h2>
                    <h1 class="text-2xl font-bold tracking-tight">${data.label}</h1>
                    
                    <p>${data?.description ?? ""}</p>
                </section>

            </div>
        </section>
    `);
}
/*
                <section class="font-mono grid grid-cols-2 mt-auto" role="table">
                    <span>Code</span>
                    <span>${code}</span>

                    <span>Tries to imitate</span>
                    <span>Euro Twink (T4)</span>
                </section>
*/

const getTwinkType = (input) => {
    const type = ParseLetterWithNumber("T", input);
    const twinkTypeMap = composite(EnsureDefaultSymbols, CreateSymbolMap)(TwinkType);
    const twinkType = twinkTypeMap[type.level];

    if (!twinkType) {
        console.warn("No Twink Type found.");
        return "";
    };

    return RenderSection(
        "Twink Type",
        `${type.prefix}${type.level}`,
        twinkType
    );
}

const getHairColour = (input) => {
    const type = ParseLetterWithNumber("C", input);
    const hairColourMap = composite(EnsureDefaultSymbols, CreateSymbolMap)(HairColour);
    const hairColour = hairColourMap[type.level];

    if (!hairColour) {
        console.warn("No Hair Colour found.");
        return "";
    }

    return RenderSection(
        "Hair Colour",
        `${type.prefix}${type.level}`,
        hairColour
    )
}

const getHairLength = (input) => {
    const type = ParseLetterWithNumber("L", input);
    const hairLengthMap = composite(EnsureDefaultSymbols, CreateSymbolMap)(HairLength);
    const hairLength = hairLengthMap[type.level];

    if (!hairLength) {
        console.warn("No Hair Length found.");
        return "";
    }

    return RenderSection(
        "Hair Length",
        `${type.prefix}${type.level}`,
        hairLength
    )
}

const getHairWaviness = (input) => {
    const type = ParseLetter(HairWaviness.map(w => w.symbol), input);
    const hairWavinessMap = composite(EnsureDefaultSymbols, CreateSymbolMap)(HairWaviness);
    const hairWaviness = hairWavinessMap[type.level];

    return RenderSection(
        "Hair Waviness",
        `${type.prefix}${type.level}`,
        hairWaviness
    )
}

const getFactors = (factors) => (input) => {
    let results = [];

    for (const factor of factors) {
        const type = ParseFactor(factor.prefix, input)
        const factorMap = CreateSymbolMap(factor.data)
        const factorData = factorMap[type.level];

        if (type.level == null) continue;

        results.push(
            RenderSection(
                factor.name,
                type.prefix ? `${type.prefix}${type.level ?? ""}` : "_",
                factorData
            ))
    }

    return results.join("\n");
}

const Render = () => {
    let code = INPUT.value;
    
    RESULTS.innerHTML = "";
    RESULTS.insertAdjacentHTML("beforeend", [
        getTwinkType(code),
        getHairColour(code),
        getHairLength(code),
        getHairWaviness(code),
        getFactors([
            {
                name: "Dizziness",
                prefix: "d",
                data: Dizziness,
            },
            {
                name: "Attitude",
                prefix: "a",
                data: Attitude,
            },
            {
                name: "The Whine Factor",
                prefix: "w",
                data: Whiningness,
            },
            {
                name: "Color of Crust (Tan)",
                prefix: "c",
                data: Tan,
            },
            {
                name: "Youthful Apperance",
                prefix: "y",
                data: AgeAppearance,
            },
            {
                name: "Endowment (For the Size Queens Among Us)",
                prefix: "e",
                data: DickSize,
            },
            {
                name: "Gonads (Balls)",
                prefix: "g",
                data: BallsSize,
            },
            {
                name: "Flavour of cream",
                prefix: "f",
                data: Flavour,
            },
            {
                name: "Kinky Factor",
                prefix: "k",
                data: Kinkiness,
            },
            {
                name: "Slut Factor",
                prefix: "s",
                data: Sluttiness,
            },
            {
                name: "Muscle Definition",
                prefix: "m1",
                data: MuscleDefinition,
            },
            {
                name: "Muscle Mass",
                prefix: "m2",
                data: MuscleMass,
            },
            {
                name: "The Q Factor",
                prefix: "q",
                data: QFactor
            }
        ])(code)
    ].join(""));

    RESULTS.scrollIntoView();
}

BUTTON.addEventListener("click", Render);