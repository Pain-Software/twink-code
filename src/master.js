const INPUT = document.getElementById("twinkcodeinput");
const BUTTON = document.getElementById("decode");
const RESULTS = document.getElementById("results");
const VIEWTOGGLE = document.getElementById("viewToggle");
const TOOLS = document.getElementById("tools");
const SCREENSHOT_BTN = document.getElementById("screenshot");

let COMPACT_VIEW = JSON.parse(localStorage.getItem("COMPACT_VIEW")) ?? false;

const EnsureDefaultSymbols = (options) => options.map((option, index) => ({ ...option, symbol: option.symbol ?? index }));
const CreateSymbolMap = (options) => options.reduce((previous, current) => ({ ...previous, [current.symbol]: current }), {});

const RenderSection = (
    trait,
    code,
    data,
    match,
    modifierLabel,
    modifierPreprocessor
) => {

    const colour = "from-pink-500 to-violet-500";

    if (!data) return "";
    
    let textClassName = `text-8xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r ${colour} select-none`;
    let codeClassName = "w-48 h-48 shrink-0 grid place-items-center";
    let traitClassName = "text-sm font-light border-b border-solid border-white";
    let labelClassName = "text-2xl font-bold tracking-tight"
    let containerClassName = "flex gap-8 p-2.5 w-full";
    let modifierClassName = "text-sm grid grid-cols-2 mt-auto"

    if (COMPACT_VIEW) {
        codeClassName = "w-16 h-16 shrink-0 grid place-items-center"
        textClassName = `text-4xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r ${colour} select-none`;
        traitClassName = "text-sm font-light border-b border-solid border-white";
        labelClassName = "text-lg font-bold tracking-tight";
        containerClassName = "flex gap-2 p-2.5 w-full";
        modifierClassName = "text-xs grid grid-cols-2 mt-auto"
    }

    return (`
        <section class="${containerClassName}">
            <div class="${codeClassName}">
                <h1 class="${textClassName}">${code}</h1>
            </div>
            <div class="flex flex-col grow">
                <section class="space-y-2.5">
                    <h2 class="${traitClassName}">${trait}</h2>
                    <h1 class="${labelClassName}">${data.label}</h1>
                    
                    <p>${COMPACT_VIEW ? "" : (data?.description ?? "")}</p>
                </section>

                ${
                    match.modifier && modifierLabel  ? (
                        `<div class="${modifierClassName}">
                            <span>${ modifierLabel ?? "Modifier" }:</span>
                            <span>${ modifierPreprocessor ? modifierPreprocessor(match.modifier) : match.modifier }</span>
                        </div>`
                    ) : ""
                }
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

const composite = (...functions) => (input) => {
    let result = input;

    for (const func of functions) result = func(result);

    return result;
}

const getHairWaviness = (input) => {
    const type = Parse.Value(HairWaviness.map(w => w.symbol), input);
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
        const type = Parse.Factor(factor.prefix, input)
        const factorMap = CreateSymbolMap(factor.data)
        const factorData = factorMap[type.level];

        if (type.level == null) continue;

        console.log(type, factor.modifier);
        results.push(
            RenderSection(
                factor.name,
                type.prefix ? `${type.prefix}${type.level ?? ""}` : "_",
                factorData,
                type,
                factor?.modifier?.label,
                factor?.modifier?.preprocess
            ))
    }

    return results.join("\n");
}

const getPrefixedValues = (functions) => input => {
    let results = [];

    for (const func of functions) {
        const type = Parse.PrefixedValue(func.prefix, input);
        const funcMap = composite(EnsureDefaultSymbols, CreateSymbolMap)(func.data);
        const funcValue = funcMap[type.level];
    
        results.push(RenderSection(
            func.name,
            `${type.prefix}${type.level}`,
            funcValue,
            type,
            func?.modifier?.label,
            func?.modifier?.preprocess
        ))
    }

    return results.join("\n");
}

const StrikeThrough = (text) => `<span class="text-red-600"><del>${text}</del> <span class="text-xs">(invalid modifier)</span></span>`

const Render = () => {
    let code = INPUT.value;

    let rendered = RenderContainer(
        [
            getPrefixedValues([
                {
                    name: "Twink Type",
                    prefix: "T",
                    data: TwinkType,
                    modifier: {
                        label: "Tries to look like",
                        preprocess: (modifier) => TwinkType[modifier]?.label ?? StrikeThrough(modifier)
                    }
                },
                {
                    name: "Hair Colour",
                    prefix: "C",
                    data: HairColour,
                    modifier: {
                        label: "Original Colour",
                        preprocess: (modifier) => CreateSymbolMap(HairColour)[modifier]?.label ?? StrikeThrough(modifier)
                    }
                },
                {
                    name: "Hair Length",
                    prefix: "L",
                    data: HairLength,
                    modifier: {
                        label: "Waviness",
                        preprocess: (modifier) => CreateSymbolMap(HairWaviness)[modifier]?.label ?? StrikeThrough(modifier)
                    }
                },
            ])(code),
            getFactors([
                {
                    name: "Hairlessness",
                    prefix: "h",
                    data: Hairlessness,
                    modifier: {
                        label: "Groomed from:",
                        preprocess: (modifier) => {} 
                    }
                },
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
                    name: "Twink Hawk",
                    prefix: "t",
                    data: TwinkHawk,
                    modifier: {
                        label: "Attracted to",
                        preprocess: (modifier) => modifier.split(",").map(value => CreateSymbolMap(TwinkType)[value]?.label ?? "").join(", ")
                    }
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
        const link = document.createElement('a');
        link.download = `Twinkcode-${crypto.randomUUID()}.png`;
        link.href = dataUrl;
        link.click();
    });
}

BUTTON.addEventListener("click", Render);
VIEWTOGGLE.addEventListener("click", SwitchView);
SCREENSHOT_BTN.addEventListener("click", getScreenShot);