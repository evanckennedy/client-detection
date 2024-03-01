'use strict';

// ELEMENT SELECTION - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// system
const os = document.querySelector('.os');
const language = document.querySelector('.language');
const browser = document.querySelector('.browser');

// window
const pageW = document.querySelector('.page-w');
const pageH = document.querySelector('.page-h');
const pageOrientation = document.querySelector('.page-orientation')

// battery
const batteryLevel = document.querySelector('.battery-level');
const batteryStatus = document.querySelector('.battery-status');

// network status
const networkStatus = document.querySelector('button');


// SYSTEM - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const userAgent = navigator.userAgent.toLowerCase();

function osDetection() {
  let osName = '';

  if (userAgent.includes('macintosh') || userAgent.includes('mac os x')) {
    osName = 'macOS';
  } else if (userAgent.includes('windows')) {
    osName = 'Windows';
  } else if (userAgent.includes('linux')) {
    osName = 'Linux';
  } else if (userAgent.includes('android')) {
    osName = 'Android';
  } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
    osName = 'iOS';
  } else {
    osName = 'Unknown';
  }

  return osName;
}

function browserDetection() {
  let browserName = ''; 

  if (userAgent.includes('firefox')) {
    browserName = "Firefox";
  } else if (userAgent.includes('chrome') && !userAgent.includes('edg') && !userAgent.includes('opr')) {
    browserName = "Chrome";
  } else if (userAgent.includes('safari') && !userAgent.includes('chrome')) { 
    browserName = "Safari";
  } else if (userAgent.includes('opr') || userAgent.includes('opera')) {
    browserName = "Opera";
  } else if (userAgent.includes('edg')) {
    browserName = 'Microsoft Edge';
  } else {
    browserName = 'Unknown';
  }

  return browserName;
}

// Updates the page with the OS, language, and browser.
const systemInfo = () => {
  os.innerText = `OS: ${osDetection()}`;
  language.innerText = `Language: ${navigator.language}`;
  browser.innerText = `Browser: ${browserDetection()}`;
}

// Event listener
window.addEventListener('load', systemInfo);


// WINDOW - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
const isPortrait = () => window.innerWidth < window.innerHeight;

// Updates the page with the current window width, height, and orientation.
const updateWindowInfo = () => {
  pageW.innerText = `Width: ${window.innerWidth}px`;
  pageH.innerText = `Height: ${window.innerHeight}px`;

  const orientation = isPortrait() ? 'Portrait' : 'Landscape';
  pageOrientation.innerText = `Orientation: ${orientation}`;
}

// Event listeners
window.addEventListener('load', updateWindowInfo);
window.addEventListener('resize', updateWindowInfo);


// BATTERY - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
const getBatteryInfo = () => {
  if ('getBattery' in navigator) {
    navigator.getBattery()
      .then(battery => updateBatteryInfo(battery))
      .catch(() => batteryUnsupportedText()); // Call if promise fails
  } else {
    batteryUnsupportedText(); // Call directly if API unsupported
  }
}

const updateBatteryInfo = battery => {
  batteryLevel.innerText = 
    `Level: ${(battery.level * 100).toFixed(0)}%`;
  batteryStatus.innerText = 
    `Status: ${battery.charging ? 'Charging' : 'Not Charging'}`;
};

const batteryUnsupportedText = () => {
  batteryLevel.innerText = 'Level: Not Available';
  batteryStatus.innerText = 'Status: Not Available';
}

// Battery information displayed on load
getBatteryInfo();
// Update battery information every 5 seconds
setInterval(getBatteryInfo, 5000);


// NETWORK STATUS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
const updateStatus = () => {
  if (navigator.onLine) {
    networkStatus.innerText = 'Online';
    networkStatus.classList.add('online-button');
    networkStatus.classList.remove('offline-button');
  } else {
    networkStatus.innerText = 'Offline';
    networkStatus.classList.add('offline-button');
    networkStatus.classList.remove('online-button');
  }
}

// Check the initial network status when the page loads
window.addEventListener('DOMContentLoaded', updateStatus);

// 'updateStatus' runs when the browser goes online or offline.
window.addEventListener('online', updateStatus);
window.addEventListener('offline', updateStatus);