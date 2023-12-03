class DeviceDetector {
    static detectMobileDevice() {
        const userAgent = window.navigator.userAgent.toLowerCase();
        const mobileKeywords = ["iphone", "ipod", "android", "blackberry", "windows phone"];
        return mobileKeywords.some(keyword => userAgent.includes(keyword));
    }
}

export default DeviceDetector;
