// imports
import config from "../config"
import {useItem, calcDistance} from "../Utils/Utils"
import RenderLib from "../../RenderLib"
import Skyblock from "../../BloomCore/Skyblock"
import {data} from "../Utils/data"

// vars
holdingHyp = false
timeHyp = 399
gotEndTime = false
veilstate = false
totem = "&cNo Totem Nearby"
lastUpdated = 0

const sound = new Sound( { source: "master_builder.ogg" } )

// vanq alert

register("chat", (message) => {
    if (!config.vanqalert) return
    if (message !== "A Vanquisher is spawning nearby!") return
    ChatLib.command("pc Vanquisher spawned at" +" "+ Math.round(Player.getX()) +" "+ Math.round(Player.getY()) +" "+ Math.round(Player.getZ()) + " ("+ Skyblock.subArea +")")
}).setChatCriteria("${message}")


// life tap

const lifetapblock = event => {
    if(!config.lifetap) return
    if(Player.getHeldItem().getName().includes("Gloomlock") && Player.getHP() >= 12) {
        cancel(event)
        ChatLib.chat("cancelled click")
    }
}
register("hitBlock", (b, e) => {lifetapblock(e)})


// hyp flare kill qol

register("tick", () => {
    if(Player?.getHeldItem()?.getName()?.includes("Hyperion") || Player?.getHeldItem()?.getName()?.includes("Scylla") || Player?.getHeldItem()?.getName()?.includes("Valkyrae") || Player?.getHeldItem()?.getName()?.includes("Aestraea")) {
        holdingHyp = true
        if (gotEndTime) return
        endTime = Date.now() + 400
        gotEndTime = true
    } else {
        holdingHyp = false
        gotEndTime = false
    }
})
register("renderOverlay", () => {
    if (!holdingHyp) return
    if(!config.hyptimer) return
    if (timeHyp > 0) Renderer.drawStringWithShadow((timeHyp / 1000), ((Renderer.screen.getWidth() / 2) - 6), ((Renderer.screen.getHeight() / 2) + 8))
    timeHyp = endTime - Date.now()
})


// auto fire veil

const veiltoggle = new KeyBind("Auto fireveil", Keyboard.KEY_NONE, "CodedClient")
veiltoggle.registerKeyPress(() => {
	veilstate = !veilstate
	if (veilstate) {
		ChatLib.chat(`&b&lCoded &6> &r&7AutoVeil &aEnabled`)
		useItem("Veil")
	} else {
		ChatLib.chat(`&b&lCoded &6> &r&7AutoVeil &cDisabled`)
	}
})

register("step", () => {
	if(!veilstate) return
	useItem("Veil")
}).setDelay(5)


// highlight flares in hyp range

register("renderWorld", () => {
    if(!config.flareesp) return
    a = World.getAllEntities().filter((e) => e?.getName()?.includes("Flare"))
    a.forEach(entity => {
        if(calcDistance(Player.getX(), Player.getY(), Player.getZ(), entity.getX(), entity.getY(), entity.getZ()) > 15) return
        RenderLib.drawEspBox(entity.getX(), entity.getY() - 4.5, entity.getZ(), 1, 4, 0.9, 0.2, 0.2, 1, true)
    })
})

// I AM SO CLOSE


// register("renderEntity", (entity) => {
//     dist = calcDistance(Player.getX(), Player.getY(), Player.getZ(), entity.getX(), entity.getY(), entity.getZ())
//     if (entity.getEntity().func_95999_t().includes("Wood") && dist <= 3 && Player.lookingAt().getEntity() == entity.getEntity()) {
//         ChatLib.chat("looking at wood")
//         ChatLib.chat(`${(Math.asin(Math.abs(((Math.abs(Player.getX() - entity.getX())) / dist))) * (180/Math.PI)).toFixed(2)} :  ${Player.getYaw().toFixed(2)}`)
//     }
// })



// totem display

register("renderEntity", (entity) => {
	if(!config.totemdisplay) return
    if (entity.getEntity().func_95999_t().includes("Remaining:")) {
	    totem = entity.getEntity().func_95999_t()
	    lastUpdated = Date.now()
    } 
	if(Date.now() - lastUpdated >= 3000) totem = "&cNo Totem Nearby"
})

register("renderOverlay", () => {
	if(!config.totemdisplay) return
	Renderer.drawStringWithShadow(totem, data.totem_location.x, data.totem_location.y)
})

register("dragged", (dx, dy, x, y) => {
    if (!config.moveTotem.isOpen()) return
    data.totem_location.x = x 
    data.totem_location.y = y 
    data.save()    
})



register("clicked", (x,y,b,d) => {
if (!config.masterbuilder) return
if (b !== 0.0) return
if (!Player.isSneaking()) return
sound.play()
})





	