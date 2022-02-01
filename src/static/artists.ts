import Artist from "@interfaces/Artist";

const vivekPhoto = `${process.env.PUBLIC_URL}/Headshots/VIVEK_HEADSHOT.jpg`;
const anjaliPhoto = `${process.env.PUBLIC_URL}/Headshots/DIASPOURA_HS.png`;
const pacificPhoto = `${process.env.PUBLIC_URL}/Headshots/PACIFIC_YEW_HS.png`;
const countourPhoto = `${process.env.PUBLIC_URL}/Headshots/CONTOUR_HS.png`;
const webbPhoto = `${process.env.PUBLIC_URL}/Headshots/WEBB_HEADSHOT.jpg`;

const webbLink = "https://webbhinton.co";
const vivekLink = "https://violinbyvivek.com/";
const diaspouraLink = "https://webbhinton.co";
const kontourLink = "https://webbhinton.co";
const pacificLink = "https://webbhinton.co";

const anjaliBio = `Anjali is the singer, electronic producer, and new media artist behind Diaspoura. Their latest EP release “Traumaporn” is a developed study of sounds encompassing both power and vulnerability using rigid beats, bells, and dense harmonies. Since then, Diaspoura has pledged through https://patreon.com/diaspoura to stay independent and committed to sustaining organic art and media. Stream their music anywhere and visit https://diaspoura.com for more.`;
const kontourBio = `Khari Lucas, aka Contour, is an songwriter/composer/artist with an artistic voice that reaches into several disciplines, music being the primary vehicle his expression. His current musical output exists somewhere between jazz, soul, and psych rock, but he considers himself a student of all areas of music, and intends to cover as much sonic and thematic ground as possible over his artistic life. His work explores such themes as self-exploration, self determination, love and it's iterations, and isolation, and cultural context among others.`;
const pacificBio = `I started out trying my hand at remaking songs I would hear on the radio until I finally got good at creating my own melodies, but I didn't start fully experimenting with sound until about 2010. I would start with a blank canvas and just try to go as far in with my ideas as possible. Over the years I would explore music with no real formal training and more of a spiritual understanding of the way music moves, gaining most of my technical skills and understanding through the creation of different music projects I've released over the years. More recently, maybe about 6 months to a year before the pandemic, I started getting into theory more than I ever have and it's since brought my sound to a place where I'm realising the spiritual and technical sides of music for me are meeting at a very happy medium.`;
const vivekBio = `Since he first picked up a violin at the age of three, Vivek has used music as an intensely personal and spiritual form of self-expression. He is a classically trained violinist, and has worked with notable classical musicians such as Jennifer Koh, Donald Weilerstein, and members of the Kronos and Emerson string quartets.
Vivek seeks to further the work of people of color, women, and gender non-conforming composers who face erasure and other barriers within the industry. He is disillusioned with the stoic and stagnant culture surrounding classical music, and is continually reimagining the experience of listening to a violin performance. Vivek loves to explore and experiment with what is possible on the violin, which has led to several improvisations and arrangements outside of classical music. His collaborations with experimental electronic musician Dasychira have been praised as “serene” (TANK Magazine) and “heavenly” (COLORXSTUDIOS). Most recently, his violin arrangements on LEI LINE EON, the latest album by IGLOOGHOST, were described as "gorgeous" (Loud and Quiet Magazine), “haunting” (ourculture), and “eloquent and inviting…[lending] a bittersweet timelessness” (The Guardian). Vivek is currently pursuing a doctoral degree in violin performance at Stony Brook University, where he studies with Phil Setzer, Jennifer Frautschi, and Arnaud Sussmann.`;
const webbBio = `Webb Hinton is a software developer and multimedia designer based in
Raleigh, NC. They are interested in creating alternative tools for
creatives, experimental digital art, and digital humanities.`;

const artists: Artist[] = [
  {
    name: "Webb Hinton",
    link: webbLink,
    photo: webbPhoto,
    role: "Developer",
    bio: webbBio,
  },
  {
    name: "Vivek Menon",
    link: vivekLink,
    photo: vivekPhoto,
    role: "Violinist",
    bio: vivekBio,
  },
  {
    name: "Diaspoura",
    link: diaspouraLink,
    photo: anjaliPhoto,
    role: "Commisioned Producer",
    bio: anjaliBio,
  },
  {
    name: "Pacific Yew",
    link: pacificLink,
    photo: pacificPhoto,
    role: "Commisioned Producer",
    bio: pacificBio,
  },
  {
    name: "Contour",
    link: kontourLink,
    photo: countourPhoto,
    role: "Commisioned Producer",
    bio: kontourBio,
  },
];
export default artists;
