import config from "../config"

codedGUI = new Gui()

register("command", () => {
    codedGUI.open()
}).setCommandName("codedgui")

register("renderOverlay", () => {
    if(!codedGUI.isOpen()) return
    Renderer.drawStringWithShadow("&3CodedClient", Renderer.screen.getWidth() / 2 - 10, (Renderer.screen.getHeight() / 4) * 3)
})