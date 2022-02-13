'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Notes',
			[
				{
					name: 'Campaign 1 - Characters',
					content: `- Tiberius Stormwind (played by Orion Acaba)
- Vex'ahlia (played by Laura Bailey)
- Percival de Rolo (played by Taliesin Jaffe)
- Pike Trickfoot (played by Ashley Johnson)
- Vax'ildan (played by Liam O'brien)
- Keyleth (played by Marisha Ray)
- Scanlan Shorthalt (played by Sam Riegel)
- Taryon Darrington (played by Sam Riegel)
- Grog Strongjaw (played by Travis Willingham)`,
					notebookId: 1,
					userId: 1,
				},
				{
					name: 'Session #1',
					content: ` Vox Machina arrives at the cavernous underground city of Kraghammer intent on rescuing a missing halfling paladin. They sample the culture of the city and find themselves coming face-to-face with the horrors coming from beneath the city...
"The party had completed a large venture in saving the nearby city of Emon, one of the capitals of this human civilization of Tal'Dorei. They managed to halt a demonic insurrection within the throne and as such were greeted to a heroes' celebration and had a keep built in their honor.

"Over the six month period of the keep being constructed, they went on their own ways and then returned to see its final creation. However, they did not have a chance to really enjoy it immediately, as one of their good friends and allies, Arcanist Allura Vysoren of the Tal'Dorei Council, came to them requesting their aid, saying that a long-time friend of hers, Lady Kima of Vord—who is a very well-known and very well-respected halfing paladin of Bahamut, the platinum dragon—had been gone on a pilgrimage for a while, essentially a vision quest as part of her own development as a paladin.

"As part of this, she let the information go to Allura that a dark vision had come to her, saying that some sort of evil root is beginning to breed beneath Kraghammer and the mountains within. Kraghammer of which is the nearby dwarven civilization that [the party] had previously not been allowed entry to, because the dwarves weren't fans of anyone without any political means of entering. However, [Allura] managed to acquire the necessary documentation, offered [the party] a very substantial reward should [they] find the whereabouts of Lady Kima of Vord, and hopefully bring her back safely.

"[The party] left. On the pathway to the dwarven citadel of Kraghammer, [they] were ambushed by a group of roaming barbarian goliaths, of which partway through the battle Grog managed to recognize one of them as a previous ally—and no-longer-ally at this time. The barbarian, for his first and only time so far, managed to avert battle through a social encounter and rolled pretty damn well on a persuasion check. [...] [He] managed to not turn it into complete bloodshed and [the party] continued on [their] way to Kraghammer, presented [their] paperwork, were given entry into the city, and that is where we begin this adventure."`,
					notebookId: 1,
					userId: 1,
				},
				{
					name: 'Session #2',
					content: `Vox Machina makes a deal with Nostoc Greyspine to put an end to the darkness now rising up from the bowels of the earth. The party gears up and makes their way into Kraghammer's mine, beginning a miles-long trek down into the veins of Khaloor.
					
After the battle, Nostoc Greyspine invites them to continue their conversation. He admits that these "intrusions" have been bad for business and begrudgingly accepts their help and offers a reward if they stop the source. They seal the deal with a drink of the Thistle Branch Dark Blood Wine, and Vax'ildan again tries to steal some of it. This time he manages it with the help of Scanlan playing some gnomish music that Nostoc does not like.

The party leaves his office and looks for Foreman Hieris to learn about what creatures they might encounter in the mines. Scanlan sings a song of rest: "Scanlan make you feel good. Scanlan make you feel real goo-o-ood."
					
Finding Foreman Hieris, they learn of the nightmarish creatures he has seen — goblins stitched together, unstable mutated slimes and oozes, a swollen duergar with multiple mouths and sets of eyes, and creatures from the surface that don't normally wander down on their own. Tiberius suggests this is the work of necromancy, but Hieris believes that the creatures are still alive.

Hieris gives them a map of the mines before they leave.`,
					notebookId: 1,
					userId: 1,
				},
				{
					name: 'Campaign 2 - Characters',
					content: `- Jester Lavorre (played by Laura Bailey)
- Mollymauk "Molly" Tealeaf (played by Taliesin Jaffe)
- Caduceus Clay (played by Taliesin Jaffe)
- Kingsley Tealeaf (played by Taliesin Jaffe)
- Yasha Nydoorin (played by Ashley Johnson)
- Caleb Widogast (played by Liam O'brien)
- Beauregard "Beau" Lionett (played by Marisha Ray)
- Nott the Brave (played by Sam Riegel)
- Veth Brenatto (played by Sam Riegel)
- Fjord (played by Travis Willingham)`,
					notebookId: 2,
					userId: 1,
				},
				{
					name: 'Session #1',
					content: `Seven people, all with different backgrounds, meet by chance in a tavern in Trostenwald. Though not entirely sure of each other, they all decide to go to a local carnival together. But, what was meant to be a brief diversion soon turns into a fight for their very lives...
					
The story opens with two people asleep in a messy upstairs bedroom at the Nestled Nook Inn. The first of the two to wake is Caleb Widogast, a human transmutation wizard. He is unshaven, with ragged traveling clothes and swept back hair. He has been sleeping for about twenty hours. He is bruised from a previous altercation.

At his feet is Nott the Brave, a young female goblin rogue. She has green skin, yellow eyes, and is dressed in a large cloak.
					
Nott comments that Caleb had a really bad day yesterday, which is unusual for him. Caleb agrees and asks what has happened since he went to sleep. Nott tells him she "went out" since he was asleep for so long. She went window shopping and stole a few things to try and recover what Caleb lost earlier. Nott was seen without her mask by multiple people (including the Crownsguard), which worries Caleb as goblins are not accepted. He encourages Nott to keep her mask on, stay hidden, and be with Caleb whenever possible in public.

They both go down to the tavern to eat breakfast. The tavern is bustling, with Yorda, the barkeep, and Adelaine, the waitress, trying to keep up. Nott orders meats, potatoes, and bacon, while Caleb just orders some Trosts, the local ale. Nott eats the meat as fast as it arrives and they plan to get more alcohol for Nott and books for Caleb.`,
					notebookId: 2,
					userId: 1,
				},
				{
					name: 'Session #2',
					content: `After killing the zombies, the new party find themselves under orders not to leave town and partial house arrest. The group decides to attempt their own investigation, but struggles to find any clues. They then return to the scene of the initial attack, to disastrous results.
					
					After Yasha's escape, the guard she tricked rushes into the carnival tent and tells the Watchmaster what has happened. The Watchmaster reprimands the guard and sends him with several others to investigate. The Watchmaster then orders the remaining guard to shackle the remaining members of the troupe. The Watchmaster tells the group they are not to leave Trostenwald until the investigation is complete. Caleb tries to vouch for Molly but the Watchmaster won't hear of it. The Watchmaster offers to take them to the Stockade to which they decline.

Caleb sends Frumpkin to scout ahead as Fjord, Jester, Nott, and Caleb all follow the Crownsguard back to the Stockade. Beauregard circles back to try and find Toya, the dwarven singer from the carnival's show. Caleb looks through Frumpkin's eyes while Nott leads him ahead. As Beauregard sneaks behind the tent she sees the guard pulling the rest of the performers into a group. Beau sees Toya being led out with the devil toad, Kylre.

Beau makes a distraction by hitting a horse on the buttocks. Beau, using her distraction, moves toward the girl and the devil toad. One of the guards out of the corner of his eye sees Beau moving up behind the pair. While trying to usher the girl and the beast away, the guards take Beau into their custody and plan to bring her to the Stockade.`,
					notebookId: 2,
					userId: 1,
				},
				{
					name: 'Campaign 3 - Characters',
					content: `- Imogen Temult (played by Laura Bailey)
- Ashton Greymoore (played by Taliesin Jaffe)
- Fearne Calloway (played by Ashley Johnson)
- Orym (played by Liam O'brien)
- Laudna (played by Marisha Ray)
- Fresh Cut Grass (played by Sam Riegel)
- Bertrand Bell (played by Travis Willingham)
- Chetney Pock O'Pea (played by Travis Willingham)`,
					userId: 1,
				},
				{
					name: 'Session #1',
					content: `Disparate souls collide in the mountain spires of Jrusar when three different groups of adventurers meet during a battle against an unusual array of enemies...

Aboard one of the cable cars connecting the five spires of Jrusar, climbing toward the Aerie Spire, are Imogen and Laudna. They have been in the city for two weeks, since Imogen went to both the Ascension's Rise University and the Starpoint Conservatory seeking to use their extensive libraries for her research. She was told they were reserved for students and others with approval, but she could submit a formal request at the Conservatory. After two weeks, she has come to ask about the request's status, but on arrival she is handed a letter denying it unless she gets approval from either the Guro Coterie or the Chandei Quorum, or enrolls. Disappointed and discouraged, they take the gondola back down to the bustling main thoroughfare of the Core Spire.

Meanwhile, a slightly hungover Ashton wakes up in their room in the Krook House, in the Fownsee Hollow in the interior of the Core Spire, greeted happily by Fresh Cut Grass. After breakfast, they make their way out of the Hollow into the main thoroughfare of the Core Spire and decide to head to the Spire by Fire Inn to seek badly-needed paying work. FCG impresses Ishir, the Inn's owner, with his ability to chew coins and is offered a job performing this talent for the customers.

Meanwhile, Orym, Fearne, and Dorian arrive in the Aerie Spire of the city via skyship. Orym has been given a task to find a man by Keyleth, the leader of the Air Ashari, and told to bring his two friends to assist him. The group takes a gondola along with one other passenger, a pachydan wearing an ornate earring. When they reach their destination, Fearne manages to steal his earring before he hurries off, to Dorian and Orym's serious consternation. The group heads toward the Core Spire and the Spire by Fire Inn.

As sunset arrives, Laudna and Imogen make their way toward their home at the Viduun-Devaar, the Windowed Wall. As they travel, they hear a low, bassy rumble and see a dull blue flash emerging 30-40 feet ahead of them from a cart. A small arcane sphere emerges from it, spooking the sillgoats pulling it and causing it to overturn and spill furniture and household goods into the street. As they watch, a kitchen knife, a table, a broom, a sword, and a rug begin to stir and come to life, attacking the passersby. Ashton and FCG hear the commotion inside the Spire by Fire, and come out to investigate, just as Fearne, Dorian, and Orym arrive on the scene as well. Roll initiative!`,
					userId: 1,
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Notes', null, {});
	},
};
