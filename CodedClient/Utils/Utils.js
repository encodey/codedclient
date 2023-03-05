const rightClick = Client.getMinecraft().getClass().getDeclaredMethod("func_147121_ag")
rightClick.setAccessible(true)

export function useItem(value) {
	index = Player?.getInventory()?.getItems()?.findIndex(item => item?.getName()?.includes(value)) 
    if (index >= 0 && index < 9) {
        previousItem = Player.getHeldItemIndex()
        Player.setHeldItemIndex(index)
        rightClick.invoke(Client.getMinecraft())
        Player.setHeldItemIndex(previousItem)
    } else
    	ChatLib.chat(`&b&lCoded &6> &r&cNo ${value} found.`)
}
export function calcDistance(x, y, z, x2, y2, z2) {return Math.sqrt((x-x2)**2 + (y-y2)**2 + (z-z2)**2)}