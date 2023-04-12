const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

itemsData = [
  {
    id: 1,
    name: "Lust",
    description: "Strong passion or longing, emotional",
    verse:
      "Flee from sexual immorality. All other sins a person commits are outside the body, but whoever sins sexually, sins against their own body. - 1 Corinthians 6:18",
    image: "/",
  },
  {
    id: 2,
    name: "Pride",
    description: "gothic, depiction of proud ",
    verse:
      "Pride goes before destruction, a haughty spirit before a fall. - Proverbs 16:18",
    image: "/",
  },
  {
    id: 3,
    name: "Gluttony",
    description: "Gluttony, obese",
    verse:
      "For drunkards and gluttons become poor, and drowsiness clothes them in rags. - Proverbs 23:21",
    image: "/",
  },
  {
    id: 4,
    name: "Wrath",
    description: "Wrath, anger",
    verse:
      "My dear brothers and sisters, take note of this: Everyone should be quick to listen, slow to speak and slow to become angry, because human anger does not produce the righteousness that God desires. - James 1:19-20",
    image: "/",
  },
  {
    id: 5,
    name: "Envy",
    description: "Envy, jealous",
    verse:
      "Therefore, rid yourselves of all malice and all deceit, hypocrisy, envy, and slander of every kind. Like newborn babies, crave pure spiritual milk, so that by it you may grow up in your salvation. - 1 Peter 2:1-2",
    image: "/",
  },
  {
    id: 6,
    name: "Greed",
    description: "Greed, money hungry",
    verse:
      "Watch out! Be on your guard against all kinds of greed; life does not consist in an abundance of possessions. - Luke 12:15",
    image: "/",
  },
  {
    id: 7,
    name: "Sloth",
    description: "lazy person, sin of sloth",
    verse:
      "Lazy hands make for poverty, but diligent hands bring wealth. - Proverbs 10:4",
    image: "/",
  },
];

const generateImage = async (req, res) => {
  try {
    const imageUrls = await Promise.all(
      itemsData.map(async (item) => {
        const prompt = item.description;
        const response = await openai.createImage({
          prompt,
          n: 1,
        });
        return response.data.data[0].url;
      })
    );

    res.status(200).json({
      success: true,
      data: imageUrls,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    res.status(400).json({
      success: false,
      error: "The images could not be generated",
    });
  }
};

module.exports = { generateImage };
