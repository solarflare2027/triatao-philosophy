// Build/verification only; no browser automation code is sent to visitors.
import {pathToFileURL} from 'node:url';
export async function launchBrowser(){
 const module=process.env.PLAYWRIGHT_MODULE_PATH;
 const {chromium}=await import(module?pathToFileURL(module).href:'playwright');
 return chromium.launch({headless:true,...(process.env.BROWSER_CHANNEL?{channel:process.env.BROWSER_CHANNEL}:{})});
}
