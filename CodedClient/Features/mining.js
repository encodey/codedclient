/// <reference types="../../CTAutocomplete" />
import config from "../config"
import { useItem } from "../Utils/Utils"
warped = false
const rightClick = Client.getMinecraft().getClass().getDeclaredMethod("func_147121_ag")
rightClick.setAccessible(true)


gempowder = 0
mithpowder = 0


// Lobby Swap


const lswap = new KeyBind("Lobby Swap Key", Keyboard.KEY_NONE, "CodedClient")
// warp mines on key press
lswap.registerKeyPress(() => {
  ChatLib.chat(`&b&lCoded &6> &r&7Swapping Lobbies...`)
	warped = true
	ChatLib.command("warp mines")
})
// re-enter ch
register("tick", () => {
	if(!warped) return
  if(Player?.getContainer()?.getName()?.includes('SkyBlock Menu')) {
    Player.getContainer().click(Player.getContainer().getItems().findIndex(item => (item?.getName()?.includes("Enter the Crystal Hollows"))))
  }
  if(Player?.getContainer()?.getName()?.includes('Enter the Crystal Hollows')) {
	if(!warped) return
    Player.getContainer().click(Player.getContainer().getItems().findIndex(item => (item?.getName()?.includes("Confirm"))))
	warped = false
  }
})
// open menu on worldload
register("worldLoad", () => {
	if(!warped) return
  Player.setHeldItemIndex(8)
  rightClick.invoke(Client.getMinecraft())
})


// auto claim comm


// open gui on chat msg
register("chat", (msg) => {
  if (!config.autoclaim) return
  if(!msg.includes("Commission Complete! Visit the King to claim your rewards!")) return
  useItem("Pigeon")
}).setChatCriteria("${msg}")
// claim comm
register("tick", () => {
	if(!config.autoclaim) return
  if(!Player?.getContainer()?.getName()?.includes("Commissions")) return
  index = Player.getContainer().getItems().findIndex(item => (item?.getLore()?.includes("COMPLETED")))
  Player.getContainer().click(index)
  if (index == -1) ChatLib.chat("no completed comms")
})




// powder display

register("tick", () => {
	mithpowder = TabList.getNames().filter(e => e.includes("Mithril Powder:")).toString().removeFormatting().match(/[^:]*$/g).join("")
	gempowder = TabList.getNames().filter(e => e.includes("Gemstone Powder:")).toString().removeFormatting().match(/[^:]*$/g).join("")
})


register("renderOverlay", () => {
	if(!config.powderhud) return
	Renderer.drawStringWithShadow(`&d&lGemstone Powder:&r&c${gempowder}`, 20, 20)
	Renderer.drawStringWithShadow(`\n&3&lMithril Powder:&r&c${mithpowder}`, 20, 20)
})
