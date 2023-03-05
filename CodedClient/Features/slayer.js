import config from "../config"

register("chat", (Slayer, level, xpneeded) => {
	Client.showTitle("&lSlayer Dead!", "", 0, 45, 0)
}).setChatCriteria("   ${Slayer} LVL ${level} - Next LVL in ${xpneeded} XP!")


