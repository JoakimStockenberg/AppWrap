import type { CapacitorConfig } from "@capacitor/cli";
import appConfig from './src/config.json'
// config.json is part of our architecture. Ensures abstracted strings and urls, instead of hardcoded items in the app code. Read at runtime.

/**
 * appID: unique identifier. Appstore uses it to distinguish app from others. Currently place-holder. 
 * appName: what users see, displayed name
 * webDir: which local folder Capacitor will build bundles into
 * appendUserAgent: architecture requirement. Webviews on iOS and android need this to append custom strings into HTTP headers. Ensures remote server identifies traffic from app wrapper.
 * server: modern android webviews may need this to consistently keep to secure shell, over standard http or capacitor:// schemes.
 */
const config: CapacitorConfig = {
    appId: 'com.appwrap.engine',
    appName: appConfig.appName,
    webDir: 'dist',
    appendUserAgent: appConfig.customUserAgentSuffix,
    server: {
        androidScheme: 'https'
    }
};

export default config;