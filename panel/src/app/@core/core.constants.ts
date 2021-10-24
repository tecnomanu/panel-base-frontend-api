import { environment } from '../../environments/environment';

export const SITE_URL:string = !environment.production && !environment.qa ? "http://api.zafiro.test/" :
    (environment.production && !environment.qa ? "http://api.zafiro.com.ar/" : "http://apitest.zafiro.com.ar/");

export const IMAGES_ROOT = 'assets/images/';

export const isMobile = () => (/android|webos|iphone|ipad|ipod|blackberry|windows phone/).test(navigator.userAgent.toLowerCase());

export const SITE_CONF = {
    "companyName" : "Zafiro",
    "companyWebsite" : "https://www.zafiro.com.ar",
    "panelName" : "Zafiro Admin"
};