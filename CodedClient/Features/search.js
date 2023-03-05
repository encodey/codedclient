// Search 

let loreMode = false

const invalidCodes = [42, 15, 29]
/**
 * 
 * @param {Int} slot Slot of the item.
 * @param {String} container Name of the container.
 * @returns {Array} Array of renderX, renderY for the center of the slot.
 */
const getSlotCenter = (slot, container) => {
    let state = true
    let size = Player.getContainer().getSize()
    if(!container.getClassName().includes("Chest")) {
        size = 72
        if (slot < 5) return [null, null] // If in crafting menu
        if (slot == 5) slot = 0, state = false
        if (slot == 6) slot = 9, state = false
        if (slot == 7) slot = 18, state = false
        if (slot == 8) slot = 27, state = false     
    }
    let x = slot % 9
    let y = Math.floor(slot / 9)

    let offset = getOffset(slot, container, size, state)

    let renderX = Renderer.screen.getWidth() / 2 + ((x - 4) * 18)
    let scaledY = (y - size / 18) 
    let renderY = ((Renderer.screen.getHeight() + 10) / 2 + (((scaledY)) * 18)) + offset
    return [renderX, renderY]
}


const getOffset = (slot, inv, size, isTrueSlot) => {
    // For all non-player containers
    if (inv.getClassName().includes("Chest")) {
        if (slot > (size - 10)) {return 17} // In hotbar
        if (slot > (size - 37)) {return 13} // In inv
        else {return 0} // In container
    }
    // For player inventory
    else {
        if (slot < 37 && !isTrueSlot) return 0 // ARMOR 
        if (slot > 35 && slot < 45 && isTrueSlot) {return 63} // In hotbar
        else {return 58} // In inv
    }
}

const isWithin = (mx, my, x, y, width, height) => {if (my >= y && my <= y + height && mx >= x && mx <= x + width) {return true} else {return false}}

let isListening = false
let searchCriteria = ""

register("guiKey", (char, code, g, event) => {
    if (invalidCodes.includes(code)) return
    if (!isListening) return
    if (code == 1) {
        cancel(event)
        isListening = false
        return
    }
    // Prevents "e" from closing inventory
    if (code == 18) {cancel(event)}
    if (code == 28) {
        isListening = false
        return
    }
    if (code == 14) {
        searchCriteria = searchCriteria.substring(0, searchCriteria.length - 1)
        return
    }
    if (code > 50 && code !== 57) return
    searchCriteria = searchCriteria + char
})

register("renderOverlay", () => {
    if (!Client.isInGui()) return
    if (Client.isInChat()) return
    Renderer.drawRect(Renderer.color(66, 66, 50), 20, 20, 150, 20)
    Renderer.drawString(`${isListening ? "&f" : "&7"}Search: ${searchCriteria}`, 25, 25)
    Renderer.drawRect(loreMode ? Renderer.GREEN : Renderer.RED, 25, 45, 10, 10)
    Renderer.scale(0.8)
    Renderer.drawStringWithShadow("Search Lore", 50, 60)
})

register("guiMouseClick", (mx, my, mb, mg, me) => {
    if (mb !== 0) return
    if (isWithin(mx, my, 25, 45, 10, 10)) loreMode = !loreMode
    if (isWithin(mx, my, 20, 20, 150, 20) && !isListening) isListening = true
    else isListening = false
})

// Highlight all items
register("guiRender", () => {
    // Only run when in a container (that isnt chat)
    if (!Client.isInGui()) return
    if (Client.isInChat()) return

    // Get all items and filter
    let inv = Player.getContainer()
    if (!inv) return
    if (!searchCriteria) return
    if (loreMode) {
        items = inv.getItems().map((a=0, i) => a?.getLore()?.some(line => line?.toString()?.removeFormatting()?.toLowerCase()?.includes(searchCriteria)) ? i : null).filter(a => a !== null)
    }
    else items = inv.getItems().map((a=0, i) => a?.getName()?.removeFormatting()?.toLowerCase()?.includes(searchCriteria) ? i : null).filter(a => a !== null)

    // Render the highlighted items
    renderItems(items)
})

const renderItems = items => {
    items.map(slot => {
        let inv = Player.getOpenedInventory()
        let item = inv.getStackInSlot(slot)
        if (!item) return
        let [x, y] = getSlotCenter(slot, inv)
        if (!x || !y) return
        Renderer.retainTransforms(true)
        Renderer.translate(x, y)
        Renderer.drawRect(Renderer.color(220, 40, 40, 120), -8, -8, 16, 16)
        Renderer.retainTransforms(false)
    })
}

register("command", () => {
    Player.getInventory().getItems().forEach(item => {
        ChatLib.chat(item?.getLore()?.forEach(line => {if(line.removeFormatting().toLowerCase().includes("eff")) ChatLib.chat(line)}))
    })
}).setCommandName("testinv")