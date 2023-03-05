import config from "../config"
const DiscordRPC = Java.type("net.arikia.dev.drpc.DiscordRPC")
const DiscordEventHandlers = Java.type("net.arikia.dev.drpc.DiscordEventHandlers")
const DiscordRichPresence = Java.type("net.arikia.dev.drpc.DiscordRichPresence")
starttime = new Date().getTime()

class Discord {
    constructor() {
        this.initialize()
        this.reset()
        register("gameLoad", () => {starttime = new Date().getTime()})
        register("gameUnload", () => { DiscordRPC.discordShutdown() })
        register("tick", () => {
            playtime = new Date().getTime() 
            playtime = (playtime - starttime) / 1000
            s = Math.floor(playtime % 60) < 10 ? `0${Math.floor(playtime % 60)}` : Math.floor(playtime % 60)
            playtime = Math.floor(playtime / 60)
            m = (playtime % 60) < 10 ? `0${playtime % 60}` : playtime % 60
            playtime = Math.floor(playtime / 60)
            h = (playtime % 24) < 10 ? `0${playtime % 24}` : playtime % 24
            if (!config.discord) return this.reset()
            this.details = `Using QOL`
            this.state = `${h}:${m}:${s} elapsed.`
            this.bigImage = "logo"
            this.bigImageText = `Coded Client`
            this.update()
        })
    }
    reset() {
        DiscordRPC.discordClearPresence()
        this.state = null
        this.details = null
        this.bigImage = null
        this.bigImageText = null
    }
    initialize() {
        const handler = new DiscordEventHandlers.Builder().build()
        DiscordRPC.discordInitialize("1051967683219968020", handler, true)
    }
    update() {
        let presence = new DiscordRichPresence.Builder(this.state)
        if (this.details) presence.setDetails(this.details)
        if (this.bigImage) presence.setBigImage(this.bigImage, this.bigImageText)
        DiscordRPC.discordUpdatePresence(presence.build())
    }

    shutDown() {
        DiscordRPC.discordShutdown()
    }

    setState(state) { this.state = state }
    setDetails(details) { this.details = details }
    setBigImage(image) { this.bigImage = image }
    setBigImageText(text) { this.bigImageText = text }
}
export default new Discord()