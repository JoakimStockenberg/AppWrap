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


// navigation button listeners

// viewport load & error event handlers


// capacitor hardware listeners

// intercept android hardware back button

//Application boot
loadApplication();
