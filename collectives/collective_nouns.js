/* global Log, Module, moment */

/* Magic Mirror
 * Module: Collective Nouns
 *
 * Based on Compliments by Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */
Module.register("collective nouns", {

	// Module config defaults.
	defaults: {
		compliments: {
			anytime: [
"shrewdness of apes",
"army/column/state/swarm of ants",
"herd/pace of asses",
"troop of baboons",
"cete/colony of badgers",
"sloth of bears",
"cluster/swarm/drift/hive/erst of bees",
"flock/flight/pod of birds",
"chatter of budgerigars",
"herd/gang/obstinancy of buffalo",
"bellowing of bullfinches",
"drove of bullocks",
"caravan/flock of camels",
"army of caterpillars",
"chowder/clowder/cluster/glaring of cats",
"herd/drove of cattle",
"brood/clutch/peep of chickens",
"chattering of choughs",
"rag/rake of colts",
"covert of coots",
"herd of cranes",
"bask of crocodiles",
"clan/hover/murder of crows",
"litter of cubs",
"herd of curlew",
"herd/mob of deer",
"cowardice/pack/kennel of dogs",
"pod/school of dolphins",
"trip of dotterel",
"flight/dole/piteousness/prettying of doves",
"paddling of ducks (on water)",
"safe of ducks (on land)",
"fling of dunlins",
"convocation of eagles",
"swarm of eels",
"herd/parade of elephants",
"herd/gang of elk",
"cast of falcons",
"busyness/cast/fesynes of ferrets",
"charm of finches",
"shoal/run of fish",
"flurry/regiment/skein of flamingoes",
"business/cloud/scraw/swarm of flies",
"earth/lead/skulk of foxes",
"gaggle of geese (on land)",
"skein/team/wedge of geese (in flight)",
"corps/herd/troop/kalaedescope of giraffes",
"cloud of gnats",
"flock/herd/trip of goats",
"charm/chattering/chirp/drum of goldfinch",
"troubling of goldfish",
"band of gorillas",
"cloud of grasshoppers",
"brace/leash/pack of greyhounds",
"brood/pack/covey of grouse",
"down/drove/husk/lie/trip/mute/husk of hares",
"cast of hawks",
"array of hedgehogs",
"scattering/sedge/siege of herons",
"army/gleam/shoal of herring",
"bloat/pod of hippos",
"drove/string/stud/team of horses",
"pack/cry/kennel of hounds",
"crowd of ibis",
"flight/swarm of insects",
"brood/fluther/smuck of jellyfish",
"herd/mob/troop of kangaroos",
"kindle/litter of kittens",
"deceit/desert of lapwings",
"bevy/exaltation of larks",
"leap/lepe of leopards",
"flock/pride/sawt/souse/troop of lions",
"tiding/tittering of magpies",
"sord/suit of mallard",
"stud of mares",
"richesse of martens",
"nest of mice",
"company/labour/movement/mumble of moles",
"troop of monkeys",
"cartload/pack/span/barren of mules",
"match/puddling/watch of nightingales",
"flock of ostrich",
"bevy/family of otters",
"parliament/stare of owls",
"yoke of oxen",
"pandemonium of parrots",
"covey of partridges",
"muster of peacocks",
"muster/parcel/rookery of penguins",
"brook/bevy/head/ostentation/pride/nye of pheasants",
"kit of pigeons (in flight)",
"farrow of piglets",
"litter/herd of pigs",
"congregation/flight/stand/wing of plovers",
"rush/flight of pochards",
"pod/school/herd/turmoil of porpoises",
"covey of ptarmigan",
"litter of pups",
"bevy/covey/drift of quail",
"bury/colony/nest/warren of rabbits",
"nursery of raccoons",
"string of racehorses",
"colony of rats",
"unkindness of ravens",
"crash of rhinoceros",
"bevy of roe deer",
"parliament/building/clamour/rookery of rooks",
"hill of ruffs",
"family of sardines",
"pod/harem/herd/rookery of seals",
"flock/herd/trip/mob of sheep",
"dopping of sheldrake",
"den/pit/nest of snakes",
"walk/wisp/whisper/wish of snipe",
"host/surration/quarrel of sparrows",
"cluster/clutter of spiders",
"drey of squirrels",
"chattering/crowd/murmation of starlings",
"flight of swallows",
"bank/bevy/game/herd/squadron, teeme/wedge/whiteness of swans (on land)",
"drift/herd/sounder of swine",
"spring of teal",
"mutation of thrush",
"ambush of tigers",
"knab/knot of toads",
"hover of trout",
"dule/raffle/rafter of turkeys",
"bale/turn of turtles",
"herd/nest/pledge of wasps",
"bunch/knob of waterfowl",
"colony/school/herd/pod/gam of whales",
"company/trip of wigeon",
"sounder of wild boar",
"dout/destruction of wild cats",
"team of wild ducks (in flight)",
"bunch/trip/plump/knob of wildfowl",
"pack/rout of wolves",
"covey/fall/flight/plump of woodcock",
"descent of woodpeckers",
"herd of wrens",
"zeal of zebras"
			],
			morning: [
			],
			afternoon: [
			],
			evening: [
			]
		},
		updateInterval: 10000,
		remoteFile: null,
		fadeSpeed: 4000,
		morningStartTime: 3,
		morningEndTime: 12,
		afternoonStartTime: 12,
		afternoonEndTime: 17
	},

	// Set currentweather from module
	currentWeatherType: "",

	// Define required scripts.
	getScripts: function() {
		return ["moment.js"];
	},

	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);

		this.lastComplimentIndex = -1;

		var self = this;
		if (this.config.remoteFile != null) {
			this.complimentFile(function(response) {
				self.config.compliments = JSON.parse(response);
				self.updateDom();
			});
		}

		// Schedule update timer.
		setInterval(function() {
			self.updateDom(self.config.fadeSpeed);
		}, this.config.updateInterval);
	},

	/* randomIndex(compliments)
	 * Generate a random index for a list of compliments.
	 *
	 * argument compliments Array<String> - Array with compliments.
	 *
	 * return Number - Random index.
	 */
	randomIndex: function(compliments) {
		if (compliments.length === 1) {
			return 0;
		}

		var generate = function() {
			return Math.floor(Math.random() * compliments.length);
		};

		var complimentIndex = generate();

		while (complimentIndex === this.lastComplimentIndex) {
			complimentIndex = generate();
		}

		this.lastComplimentIndex = complimentIndex;

		return complimentIndex;
	},

	/* complimentArray()
	 * Retrieve an array of compliments for the time of the day.
	 *
	 * return compliments Array<String> - Array with compliments for the time of the day.
	 */
	complimentArray: function() {
		var hour = moment().hour();
		var compliments;

		if (hour >= this.config.morningStartTime && hour < this.config.morningEndTime && this.config.compliments.hasOwnProperty("morning")) {
			compliments = this.config.compliments.morning.slice(0);
		} else if (hour >= this.config.afternoonStartTime && hour < this.config.afternoonEndTime && this.config.compliments.hasOwnProperty("afternoon")) {
			compliments = this.config.compliments.afternoon.slice(0);
		} else if(this.config.compliments.hasOwnProperty("evening")) {
			compliments = this.config.compliments.evening.slice(0);
		}

		if (typeof compliments === "undefined") {
			compliments = new Array();
		}

		if (this.currentWeatherType in this.config.compliments) {
			compliments.push.apply(compliments, this.config.compliments[this.currentWeatherType]);
		}

		compliments.push.apply(compliments, this.config.compliments.anytime);

		return compliments;
	},

	/* complimentFile(callback)
	 * Retrieve a file from the local filesystem
	 */
	complimentFile: function(callback) {
		var xobj = new XMLHttpRequest(),
			isRemote = this.config.remoteFile.indexOf("http://") === 0 || this.config.remoteFile.indexOf("https://") === 0,
			path = isRemote ? this.config.remoteFile : this.file(this.config.remoteFile);
		xobj.overrideMimeType("application/json");
		xobj.open("GET", path, true);
		xobj.onreadystatechange = function() {
			if (xobj.readyState == 4 && xobj.status == "200") {
				callback(xobj.responseText);
			}
		};
		xobj.send(null);
	},

	/* complimentArray()
	 * Retrieve a random compliment.
	 *
	 * return compliment string - A compliment.
	 */
	randomCompliment: function() {
		var compliments = this.complimentArray();
		var index = this.randomIndex(compliments);

		return compliments[index];
	},

	// Override dom generator.
	getDom: function() {
		var complimentText = this.randomCompliment();

		var compliment = document.createTextNode(complimentText);
		var wrapper = document.createElement("div");
		wrapper.className = this.config.classes ? this.config.classes : "thin xlarge bright pre-line";
		wrapper.appendChild(compliment);

		return wrapper;
	},


	// From data currentweather set weather type
	setCurrentWeatherType: function(data) {
		var weatherIconTable = {
			"01d": "day_sunny",
			"02d": "day_cloudy",
			"03d": "cloudy",
			"04d": "cloudy_windy",
			"09d": "showers",
			"10d": "rain",
			"11d": "thunderstorm",
			"13d": "snow",
			"50d": "fog",
			"01n": "night_clear",
			"02n": "night_cloudy",
			"03n": "night_cloudy",
			"04n": "night_cloudy",
			"09n": "night_showers",
			"10n": "night_rain",
			"11n": "night_thunderstorm",
			"13n": "night_snow",
			"50n": "night_alt_cloudy_windy"
		};
		this.currentWeatherType = weatherIconTable[data.weather[0].icon];
	},


	// Override notification handler.
	notificationReceived: function(notification, payload, sender) {
		if (notification == "CURRENTWEATHER_DATA") {
			this.setCurrentWeatherType(payload.data);
		}
	},

});
