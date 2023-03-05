import {
    @ButtonProperty,
    @CheckboxProperty,
    Color,
    @ColorProperty,
    @PercentSliderProperty,
    @SelectorProperty,
    @SwitchProperty,
    @TextProperty,
    @Vigilant,
    @SliderProperty
} from '../Vigilance/index';

@Vigilant("CodedClient", "CodedClient", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["General", "Nether", "Mining", "Slayer", "QOL"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    },
})

class config {
	moveTotem = new Gui()

    @SwitchProperty({
        name: "Discord RPC",
        description: "Enable discord rpc",
        category: "General",
        subcategory: "RPC",
    })
    discord = false;


	@SwitchProperty({
        name: "Auto Claim Commissions",
        description: "Automatically claims commissions. NEEDS ROYAL PIDGEON",
        category: "Mining",
        subcategory: "Comms",
    })
    autoclaim = false;


	@SwitchProperty({
        name: "Powder Display",
        description: "Displays powder on screen",
        category: "Mining",
        subcategory: "Powder",
    })
    powderhud = false;

// slayer


	@SwitchProperty({
        name: "Slayer Progress Display",
        description: "Shows slayer xp",
        category: "Slayer",
        subcategory: "General",
    })
    slayerxp = false;





// NETHER
	
		@SwitchProperty({
        name: "Vanquisher Chat Alert",
        description: "Sends message in chat when you get a vanquisher",
        category: "Nether",
        subcategory: "General",
    })
    vanqalert = false;

		@SwitchProperty({
        name: "Block Life Tap Killing",
        description: "Prevents life tap from killing you. &cWIP",
        category: "Nether",
        subcategory: "General",
    })
   lifetap = false;

   @SwitchProperty({
    name: "Flares Hyp Timer",
    description: "Timer once holding hype until you can kill flares.",
    category: "Nether",
    subcategory: "Flares",
    })
    hyptimer = false;

    @SwitchProperty({
        name: "ESP Flares In Hyp Range",
        description: "Draws an esp box around flares in range of hyp tp. &cMAY BE LAGGY",
        category: "Nether",
        subcategory: "Flares",
    })
    flareesp = false;


	@SwitchProperty({
        name: "Totem Of Corruption Display",
        description: "Shows time on nearby totem, if one is placed",
        category: "Nether",
        subcategory: "General",
    })
    totemdisplay = false;
	

    @ButtonProperty({
        name: "Move Totem Display",
        description: "Change the location of the totem display",
        category: "Nether",
        subcategory: "General",
        placeholder: "Click Here!",
    })
    totemMove() {
        this.moveTotem.open()
    };

    @SwitchProperty({
        name: "Lego building sounds for balista",
        description: "The best feature ever",
        category: "Nether",
        subcategory: "Misc",
    })
    masterbuilder = false;

	@SliderProperty({
        name: "Lego Sound Volume",
        description: "Scale of the timer",
        category: "Nether",
        subcategory: "Misc",
        min: 0,
        max: 1,
    })
    buildvol = 0.5;

    @SwitchProperty({
        name: "Player ESP",
        description: "Renders and esp on players",
        category: "QOL",
        subcategory: "ESP",
    })
    playeresp = false;

@SwitchProperty({
        name: "Color ESP",
        description: "Colors player esp",
        category: "QOL",
        subcategory: "ESP",
    })
    coloresp = false;
	

    constructor() {
        this.initialize(this)
        this.setCategoryDescription("General", 
        "&b&lCoded Client\n" + 
        "\n&aThis is a very legit mod\n" +
        "\n&c&lMade by encodey#0050")

	this.addDependency("Move Totem Display", "Totem Of Corruption Display")
	this.addDependency("Lego Sound Volume", "Lego building sounds for balista")
    }
}
export default new config()