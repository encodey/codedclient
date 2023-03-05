import config from "../config"
import RenderLib from "../../RenderLib"
r = 0.5
g = 0.9
b = 0.5

register("renderWorld", () => {
   if(!config.playeresp) return
    World.getAllPlayers().forEach(pl => {
        if(Player.getName() == pl.getName()) return
        if(pl.getUUID().toString()[14] == "2") return
	if(pl.getDisplayName().toString().removeFormatting().includes("B") && config.coloresp) {
		r = (172/255)
		g = (216/255)
		b = (230/255)
	} else if (pl.getDisplayName().toString().removeFormatting().includes("R") && config.coloresp) {
		r = (255/255)
		g = (51/255)
		b = (51/255)

	}
        RenderLib.drawEspBox(pl.getX(), pl.getY(), pl.getZ(), pl.getWidth(), 2, r, g, b, 1, true)
    })
})











