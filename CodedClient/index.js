/**
 * 
 * =============================================
 *      Thanks for Installing Coded Client
 * =============================================
 * 
 * - This mod is private, please do not distribute publicly without permission. Some private sharing is allowed
 * - You may use code from this module for your own modules, as long as it is credited in any public modules
 * - Contact encodey#0050 on discord for any suggestions or issues
 * 
 */


import "./Features/discord"
import "./Features/nether"
import "./Features/mining"
import "./Features/slayer"
import "./Utils/data"
import "./Utils/gui"
import "./qol/playeresp"

import "./Features/search"

import config from "./config"

register("command", () => config.openGUI()).setCommandName("coded")