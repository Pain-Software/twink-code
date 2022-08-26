const INPUT = document.getElementById("twinkcodeinput");
const BUTTON = document.getElementById("decode");
const RESULTS = document.getElementById("results");
const VIEWTOGGLE = document.getElementById("viewToggle");
const TOOLS = document.getElementById("tools");
const SCREENSHOT_BTN = document.getElementById("screenshot");

let COMPACT_VIEW = JSON.parse(localStorage.getItem("COMPACT_VIEW")) ?? false;

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

    let className = "flex gap-8 p-2.5 w-full";
    let textClassName = `text-8xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r ${colour} select-none`;
    let codeClassName = "w-48 h-48 shrink-0 grid place-items-center";
    let traitClassName = "text-sm font-light border-b border-solid border-white";
    let labelClassName = "text-2xl font-bold tracking-tight"

    if (COMPACT_VIEW) {
        codeClassName = "w-16 h-16 shrink-0 grid place-items-center"
        textClassName = `text-4xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r ${colour} select-none`;
        traitClassName = "text-sm font-light border-b border-solid border-white";
        labelClassName = "text-lg font-bold tracking-tight"
    }

    return (`
        <section class="flex gap-8 p-2.5 w-full">
            <div class="${codeClassName}">
                <h1 class="${textClassName}">${code}</h1>
            </div>
            <div class="flex flex-col grow">
                <section class="space-y-2.5">
                    <h2 class="${traitClassName}">${trait}</h2>
                    <h1 class="${labelClassName}">${data.label}</h1>
                    
                    <p>${COMPACT_VIEW ? "" : (data?.description ?? "")}</p>
                </section>

            </div>
        </section>
    `);
}

const RenderContainer = (children) => {
    let className = "grid grid-cols-2 items-center mx-16 gap-8";

    if (COMPACT_VIEW) className = "grid grid-cols-4";

    return (
        `<section class="${className}">
            ${children}
        </section>`
    )
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

    let rendered = RenderContainer(
        [
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
        ].join("")
    );

    RESULTS.innerHTML = "";
    RESULTS.insertAdjacentHTML("beforeend", rendered);
    
    TOOLS.classList.remove("hidden");
    TOOLS.scrollIntoView();
}

const SwitchView = () => {
    COMPACT_VIEW = !COMPACT_VIEW;
    localStorage.setItem("COMPACT_VIEW", COMPACT_VIEW);

    Render();
}

const getScreenShot = () => {
    let screenshotZone = document.getElementById("result_screenshot");
    screenshotZone.querySelector("#result_content").innerHTML = RESULTS.innerHTML;
    screenshotZone.querySelector("#result_footer").innerHTML = `<code>${window.location.host}</code><time>${new Date().toLocaleString()}</time>`;
    screenshotZone.querySelector("#result_code").innerHTML = INPUT.value;

    domtoimage.toPng(screenshotZone, {
        style: {
            display: "block",
            left: 0
        }
    })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = `Twinkcode-${crypto.randomUUID()}.png`;
        link.href = dataUrl;
        link.click();
    });
}

BUTTON.addEventListener("click", Render);
VIEWTOGGLE.addEventListener("click", SwitchView);
SCREENSHOT_BTN.addEventListener("click", getScreenShot);