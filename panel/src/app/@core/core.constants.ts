import { environment } from '../../environments/environment';

export const SITE_URL:string = environment.apiUrl;

export const STORAGE_FILES = SITE_URL + 'storage/';
export const IMAGES_ROOT = 'assets/images/';

export const isMobile = () => (/android|webos|iphone|ipad|ipod|blackberry|windows phone/).test(navigator.userAgent.toLowerCase());

export const SITE_CONF = {
    "companyName" : "PanelBase - TecnoManu",
    "companyWebsite" : "https://www.panelbase.com.ar",
    "panelName" : "Panel Base"
};