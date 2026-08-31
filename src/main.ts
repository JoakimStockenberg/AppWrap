import './style.css';
import { Network } from '@capacitor/network';
import { App } from '@capacitor/app';
import configData from './config.json';

interface AppConfig {
  targetUrl: string;
  customUserAgentSuffix: string;
  appName: string;
}

const config: AppConfig = configData;

// Element selectors
const iframeElement = document.getElementById('web-viewport') as HTMLIFrameElement;
const offlineElement = document.getElementById('offline-boundary') as HTMLDivElement;
const loadingSpinnerElement = document.getElementById('loading-spinner') as HTMLDivElement;
const appTitleElement = document.getElementById('app-title-display') as HTMLSpanElement;

const backButton = document.getElementById('btn-back') as HTMLButtonElement;
const refreshButton = document.getElementById('btn-refresh') as HTMLButtonElement;
const retryButton = document.getElementById('btn-retry') as HTMLButtonElement;

// App name
if (appTitleElement) {
  appTitleElement.textContent = config.appName;
}

// Viewport and management functions
function loadApplication(): void {
  if (!iframeElement) return;

  if (loadingSpinnerElement) loadingSpinnerElement.style.display = 'block';
  if (offlineElement) offlineElement.classList.add('hidden');

  iframeElement.src = config.targetUrl;
}

function showOfflineState(): void {
  if (loadingSpinnerElement) loadingSpinnerElement.style.display = 'none';
  if (offlineElement) offlineElement.classList.remove('hidden');
}

// navigation button listeners
backButton?.addEventListener('click', () => { //checks the manual back button in app
  try {
    iframeElement.contentWindow?.history.back();
  } catch (error) {
    console.warn('History not accessible: ', error)
  }
});

refreshButton.addEventListener('click', () => {
  try {
    iframeElement.contentWindow?.location.reload();
  } catch {
    //loadApplication();
  }
});

retryButton?.addEventListener('click', async () => {
  try {
    const status = await Network.getStatus();
    if (status.connected) {
      loadApplication();
    } else {
      showOfflineState();
    }
  } catch {
    // Not sure what to do here yet, but continue showing offlinestate seems good in the case network status fails
    showOfflineState();
  }
});

// viewport load & error event handlers
iframeElement?.addEventListener('load', () => {
  if (loadingSpinnerElement) loadingSpinnerElement.style.display = 'none'
});

iframeElement?.addEventListener('error', () => {
  showOfflineState();
});

// network and hardware listeners
Network.addListener('networkStatusChange', (status) => {
  if (!status.connected) showOfflineState();
});

App.addListener('backButton', () => { //Checks the hardware back button on android phones
    try {
      iframeElement.contentWindow?.history.back();
    } catch {
      App.exitApp();
    }
});

//Application boot
loadApplication();
