//record page
$(document).ready(function () {
    // Initial mood hues
    const moodHues = {
        angry: 0,
        energized: 30,
        happy: 60,
        calm: 120,
        compassion: 180,
        sad: 240,
        creative: 270,
        romance: 330,
        wistful: 25,
    };

    let activeBlockIndex = 0;
    const storedData = JSON.parse(localStorage.getItem("blockData")) || [];

    // all block update
    function updateBlocks() {
        $(".block").each(function (index) {
            const blockData = storedData[index];
            const color = blockData
                ? `hsl(${blockData.hue}, ${blockData.saturation}%, 50%)`
                : "white";
            $(this).css("background-color", color);
        });
    }

    // single block update
    function updateBlock(index) {
        const block = $(".block").eq(index);
        const hue = block.data("hue") || 0;
        const mood = block.data("mood") || "None";
        const saturation = $(".saturationSlider").val() || 100;

        const color = `hsl(${hue}, ${saturation}%, 50%)`;
        block.css("background-color", color);

        // store this data in localStorage(browser)
        storedData[index] = { mood, hue, saturation };
        localStorage.setItem("blockData", JSON.stringify(storedData));
    }

    // mood buttons
    $(".moodBtn button").on("click", function () {
        const mood = $(this).data("value");
        const hue = moodHues[mood];

        if (activeBlockIndex !== null) {
            $(".block")
                .eq(activeBlockIndex)
                .data({ mood, hue });
            updateBlock(activeBlockIndex);

            $("#selectedMood").val(mood);
        }
    });

    //saturation slider input
    $(".saturationSlider").on("input", function () {
        if (activeBlockIndex !== null) {
            updateBlock(activeBlockIndex);
        }
    });

    //submit button
    $(".submitBtn").on("click", function () {
        if (activeBlockIndex !== null) {
            updateBlock(activeBlockIndex);
        }

        // select next block randomly
        activeBlockIndex = Math.floor(Math.random() * $(".block").length);

        $(".block").removeClass("active");
        $(".block").eq(activeBlockIndex).addClass("active");

        // reset sliders and mood buttons
        $(".saturationSlider").val(50);
        $("#selectedMood").val("");
    });

    // clear button
    $(".clearBtn").on("click", function () {
        // clear stored data and reset blocks
        localStorage.removeItem("blockData");
        storedData.length = 0;
        activeBlockIndex = 0;

        updateBlocks();
    });

    updateBlocks();
});

//help page
$(document).ready(function () {
    $(".submitBtn").on("click", function () {

        const tipTexts = {
            angry: [
                "Pause and Breathe: Practice deep breathing exercises (e.g., inhale for 4 seconds, hold for 4, exhale for 8) to calm your nervous system.",
                "Channel Energy: Engage in physical activity like running or hitting a punching bag to release pent-up frustration.",
                "Reflect: Write down the source of your anger and ask, What can I control in this situation? This helps you focus on actionable solutions."
            ],
            energized: [
                "Keep moving: Channel your energy into an exercise routine, a creative project, or an adventure.",
                "Break tasks into smaller steps: Use your energy to take action in manageable chunks.",
                "Stay social: Hang out with friends or attend an event that keeps you engaged."
            ],
            happy: [
                "Share the joy: Spread positivity to others by complimenting or surprising them with kind words.",
                "Stay in the moment: Enjoy the present and savor the small wins.",
                "Give back: Do something kind for someone else to amplify your happiness."
            ],
            calm: [
                "Practice mindfulness: Meditate, focus on your breathing, or do yoga to stay centered.",
                "Breathe deeply: Take slow, deep breaths to remain calm in any situation.",
                "Take a walk: Step outside for some fresh air to reconnect with nature and calm your mind."
            ],
            compassion: [
                "Practice active listening: Be fully present when others speak to show you care.",
                "Show empathy: Understand others' perspectives without judgment.",
                "Offer support: Be there for others emotionally or physically when needed."
            ],
            sad: [
                "Reach out: Talk to someone you trust about your feelings.",
                "Take care of yourself: Rest, hydrate, and engage in activities that nurture you.",
                "Practice self-compassion: Be kind to yourself and recognize that it's okay to feel sad."
            ],
            creative: [
                "Explore new hobbies: Try something artistic like drawing, writing, or photography.",
                "Get inspired: Look at other works of creativity like books, music, or nature.",
                "Challenge yourself: Set up a fun project that forces you to think outside the box."
            ],
            romance: [
                "Write a love letter: Express your feelings in words to someone special.",
                "Plan a surprise date: Create a thoughtful, unexpected experience.",
                "Compliment genuinely: Make your partner feel appreciated with a sincere compliment."
            ],
            wistful: [
                "Reflect on memories: Recall moments that brought you happiness.",
                "Plan for the future: Think about what you want to achieve and how to get there.",
                "Journal your feelings: Write down your thoughts and emotions to gain clarity."
            ],
            stressed: [
                "Take a break: Step away from what is causing stress and engage in a calming activity.",
                "Talk it out: Share your stress with a friend or family member to release some tension.",
                "Try relaxation techniques: Breathing exercises, progressive muscle relaxation, or meditation can help."
            ]
        };
        //random give tips based on the selection of color
        const selectedMood = $("#options").val();
        const tips = tipTexts[selectedMood] || [];
        const randomTip = tips.length > 0 ? tips[Math.floor(Math.random() * tips.length)] : "No tips available for this mood.";

        $('#output').text(randomTip);
    });
});
