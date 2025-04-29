"use strict";
const injectZetaMarkerScripts = () => {
 const jsFilesToInject = [ 
 "../../c-s.js"
 ];
 jsFilesToInject.forEach((fileURL) => {
const script = document.createElement('script');
 script.src = fileURL;
 document.body.appendChild(script);
});
};
document.addEventListener("DOMContentLoaded", async function (event) {
 let url_pdf = new URL(window.location).searchParams.get("url");
 const errorMessages = {
 loading_error: "Loading PDF error.",
 invalid_file_error: "Invalid PDF file.",
 missing_file_error: "Missing file error.",
 rendering_error: "Rendering Error.",
};
 var __webpack_modules__ = [
 ,
 (__unused_webpack_module, exports) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
 exports.animationStarted =
 exports.VERTICAL_PADDING =
 exports.UNKNOWN_SCALE =
 exports.TextLayerMode =
 exports.SpreadMode =
 exports.SCROLLBAR_PADDING =
 exports.RenderingStates =
 exports.RendererType =
 exports.ProgressBar =
 exports.OutputScale =
 exports.MIN_SCALE =
 exports.MAX_SCALE =
 exports.MAX_AUTO_SCALE =
 exports.DEFAULT_SCALE_VALUE =
 exports.DEFAULT_SCALE_DELTA =
 exports.DEFAULT_SCALE =
 void 0;
 exports.approximateFraction = approximateFraction;
 exports.backtrackBeforeAllVisibleElements =
 backtrackBeforeAllVisibleElements;
 exports.binarySearchFirstItem = binarySearchFirstItem;
 exports.docStyle = void 0;
 exports.getActiveOrFocusedElement = getActiveOrFocusedElement;
 exports.getPageSizeInches = getPageSizeInches;
 exports.getVisibleElements = getVisibleElements;
 exports.isPortraitOrientation = isPortraitOrientation;
 exports.isValidRotation = isValidRotation;
 exports.isValidScrollMode = isValidScrollMode;
 exports.isValidSpreadMode = isValidSpreadMode;
 exports.noContextMenuHandler = noContextMenuHandler;
 exports.normalizeWheelEventDelta = normalizeWheelEventDelta;
 exports.normalizeWheelEventDirection = normalizeWheelEventDirection;
 exports.parseQueryString = parseQueryString;
 exports.removeNullCharacters = removeNullCharacters;
 exports.roundToDivide = roundToDivide;
 exports.scrollIntoView = scrollIntoView;
 exports.watchScroll = watchScroll;
const DEFAULT_SCALE_VALUE = "auto";
 exports.DEFAULT_SCALE_VALUE = DEFAULT_SCALE_VALUE;
const DEFAULT_SCALE = 1.0;
 exports.DEFAULT_SCALE = DEFAULT_SCALE;
const DEFAULT_SCALE_DELTA = 1.1;
 exports.DEFAULT_SCALE_DELTA = DEFAULT_SCALE_DELTA;
const MIN_SCALE = 0.1;
 exports.MIN_SCALE = MIN_SCALE;
const MAX_SCALE = 10.0;
 exports.MAX_SCALE = MAX_SCALE;
const UNKNOWN_SCALE = 0;
 exports.UNKNOWN_SCALE = UNKNOWN_SCALE;
const MAX_AUTO_SCALE = 1.25;
 exports.MAX_AUTO_SCALE = MAX_AUTO_SCALE;
const SCROLLBAR_PADDING = 40;
 exports.SCROLLBAR_PADDING = SCROLLBAR_PADDING;
const VERTICAL_PADDING = 5;
 exports.VERTICAL_PADDING = VERTICAL_PADDING;
const RenderingStates = {
 INITIAL: 0,
 RUNNING: 1,
 PAUSED: 2,
 FINISHED: 3,
};
 exports.RenderingStates = RenderingStates;
const RendererType = {
 CANVAS: "canvas",
 SVG: "svg",
};
 exports.RendererType = RendererType;
const TextLayerMode = {
 DISABLE: 0,
 ENABLE: 1,
};
 exports.TextLayerMode = TextLayerMode;
const ScrollMode = {
 UNKNOWN: -1,
 VERTICAL: 0,
 HORIZONTAL: 1,
 WRAPPED: 2,
 PAGE: 3,
};
 exports.ScrollMode = ScrollMode;
const SpreadMode = {
 UNKNOWN: -1,
 NONE: 0,
 ODD: 1,
 EVEN: 2,
};
 exports.SpreadMode = SpreadMode;
class OutputScale {
 constructor() {
const pixelRatio = window.devicePixelRatio || 1;
 this.sx = pixelRatio;
 this.sy = pixelRatio;
}
 get scaled() {
 return this.sx !== 1 || this.sy !== 1;
}
}
 exports.OutputScale = OutputScale;
 function scrollIntoView(element, spot, scrollMatches = false) {
 let parent = element.offsetParent;
 if (!parent) {
 console.error("offsetParent is not set -- cannot scroll");
 return;
}
 let offsetY = element.offsetTop + element.clientTop;
 let offsetX = element.offsetLeft + element.clientLeft;
 while (
 (parent.clientHeight === parent.scrollHeight &&
 parent.clientWidth === parent.scrollWidth) ||
 (scrollMatches &&
 (parent.classList.contains("markedContent") ||
 getComputedStyle(parent).overflow === "hidden"))
 ) {
 offsetY += parent.offsetTop;
 offsetX += parent.offsetLeft;
 parent = parent.offsetParent;
 if (!parent) {
 return;
}
}
 if (spot) {
 if (spot.top !== undefined) {
 offsetY += spot.top;
}
 if (spot.left !== undefined) {
 offsetX += spot.left;
 parent.scrollLeft = offsetX;
}
}
 parent.scrollTop = offsetY;
}
 function watchScroll(viewAreaElement, callback) {
 const debounceScroll = function (evt) {
 if (rAF) {
 return;
}
 rAF = window.requestAnimationFrame(
 function viewAreaElementScrolled() {
 rAF = null;
const currentX = viewAreaElement.scrollLeft;
const lastX = state.lastX;
 if (currentX !== lastX) {
 state.right = currentX > lastX;
}
 state.lastX = currentX;
const currentY = viewAreaElement.scrollTop;
const lastY = state.lastY;
 if (currentY !== lastY) {
 state.down = currentY > lastY;
}
 state.lastY = currentY;
 callback(state);
}
);
};
 const state = {
 right: true,
 down: true,
 lastX: viewAreaElement.scrollLeft,
 lastY: viewAreaElement.scrollTop,
 _eventHandler: debounceScroll,
};
 let rAF = null;
 viewAreaElement.addEventListener("scroll", debounceScroll, true);
 return state;
}
 function parseQueryString(query) {
 const params = new Map();
 for (const [key, value] of new URLSearchParams(query)) {
 params.set(key.toLowerCase(), value);
}
 return params;
}
const NullCharactersRegExp = /\x00/g;
const InvisibleCharactersRegExp = /[\x01-\x1F]/g;
 function removeNullCharacters(str, replaceInvisible = false) {
 if (typeof str !== "string") {
 console.error(`The argument must be a string.`);
 return str;
}
 if (replaceInvisible) {
 str = str.replace(InvisibleCharactersRegExp, " ");
}
 return str.replace(NullCharactersRegExp, "");
}
 function binarySearchFirstItem(items, condition, start = 0) {
 let minIndex = start;
 let maxIndex = items.length - 1;
 if (maxIndex < 0 || !condition(items[maxIndex])) {
 return items.length;
}
 if (condition(items[minIndex])) {
 return minIndex;
}
 while (minIndex < maxIndex) {
const currentIndex = (minIndex + maxIndex) >> 1;
const currentItem = items[currentIndex];
 if (condition(currentItem)) {
 maxIndex = currentIndex;
} else {
 minIndex = currentIndex + 1;
}
}
 return minIndex;
}
 function approximateFraction(x) {
 if (Math.floor(x) === x) {
 return [x, 1];
}
 const xinv = 1 / x;
 const limit = 8;
 if (xinv > limit) {
 return [1, limit];
} else if (Math.floor(xinv) === xinv) {
 return [1, xinv];
}
 const x_ = x > 1 ? xinv : x;
 let a = 0,
 b = 1,
 c = 1,
 d = 1;
 while (true) {
const p = a + c,
 q = b + d;
 if (q > limit) {
 break;
}
 if (x_ <= p / q) {
 c = p;
 d = q;
} else {
 a = p;
 b = q;
}
}
 let result;
 if (x_ - a / b < c / d - x_) {
 result = x_ === x ? [a, b] : [b, a];
} else {
 result = x_ === x ? [c, d] : [d, c];
}
 return result;
}
 function roundToDivide(x, div) {
 const r = x % div;
 return r === 0 ? x : Math.round(x - r + div);
}
 function getPageSizeInches({ view, userUnit, rotate }) {
 const [x1, y1, x2, y2] = view;
 const changeOrientation = rotate % 180 !== 0;
 const width = ((x2 - x1) / 72) * userUnit;
 const height = ((y2 - y1) / 72) * userUnit;
 return {
 width: changeOrientation ? height : width,
 height: changeOrientation ? width : height,
};
}
 function backtrackBeforeAllVisibleElements(index, views, top) {
 if (index < 2) {
 return index;
}
 let elt = views[index].div;
 let pageTop = elt.offsetTop + elt.clientTop;
 if (pageTop >= top) {
 elt = views[index - 1].div;
 pageTop = elt.offsetTop + elt.clientTop;
}
 for (let i = index - 2; i >= 0; --i) {
 elt = views[i].div;
 if (elt.offsetTop + elt.clientTop + elt.clientHeight <= pageTop) {
 break;
}
 index = i;
}
 return index;
}
 function getVisibleElements({
 scrollEl,
 views,
 sortByVisibility = false,
 horizontal = false,
 rtl = false,
}) {
 const top = scrollEl.scrollTop,
 bottom = top + scrollEl.clientHeight;
 const left = scrollEl.scrollLeft,
 right = left + scrollEl.clientWidth;
 function isElementBottomAfterViewTop(view) {
const element = view.div;
const elementBottom =
 element.offsetTop + element.clientTop + element.clientHeight;
 return elementBottom > top;
}
 function isElementNextAfterViewHorizontally(view) {
const element = view.div;
const elementLeft = element.offsetLeft + element.clientLeft;
const elementRight = elementLeft + element.clientWidth;
 return rtl ? elementLeft < right : elementRight > left;
}
 const visible = [],
 ids = new Set(),
 numViews = views.length;
 let firstVisibleElementInd = binarySearchFirstItem(
 views,
 horizontal
 ? isElementNextAfterViewHorizontally
 : isElementBottomAfterViewTop
 );
 if (
 firstVisibleElementInd > 0 &&
 firstVisibleElementInd < numViews &&
 !horizontal
 ) {
 firstVisibleElementInd = backtrackBeforeAllVisibleElements(
 firstVisibleElementInd,
 views,
 top
);
}
 let lastEdge = horizontal ? right : -1;
 for (let i = firstVisibleElementInd; i < numViews; i++) {
const view = views[i],
 element = view.div;
const currentWidth = element.offsetLeft + element.clientLeft;
const currentHeight = element.offsetTop + element.clientTop;
const viewWidth = element.clientWidth,
 viewHeight = element.clientHeight;
const viewRight = currentWidth + viewWidth;
const viewBottom = currentHeight + viewHeight;
 if (lastEdge === -1) {
 if (viewBottom >= bottom) {
 lastEdge = viewBottom;
}
} else if ((horizontal ? currentWidth : currentHeight) > lastEdge) {
 break;
}
 if (
 viewBottom <= top ||
 currentHeight >= bottom ||
 viewRight <= left ||
 currentWidth >= right
 ) {
 continue;
}
const hiddenHeight =
 Math.max(0, top - currentHeight) + Math.max(0, viewBottom - bottom);
const hiddenWidth =
 Math.max(0, left - currentWidth) + Math.max(0, viewRight - right);
const fractionHeight = (viewHeight - hiddenHeight) / viewHeight,
 fractionWidth = (viewWidth - hiddenWidth) / viewWidth;
const percent = (fractionHeight * fractionWidth * 100) | 0;
 visible.push({
 id: view.id,
 x: currentWidth,
 y: currentHeight,
 view,
 percent,
 widthPercent: (fractionWidth * 100) | 0,
});
 ids.add(view.id);
}
 const first = visible[0],
 last = visible.at(-1);
 if (sortByVisibility) {
 visible.sort(function (a, b) {
 const pc = a.percent - b.percent;
 if (Math.abs(pc) > 0.001) {
 return -pc;
}
 return a.id - b.id;
});
}
 return {
 first,
 last,
 views: visible,
 ids,
};
}
 function noContextMenuHandler(evt) {
 evt.preventDefault();
}
 function normalizeWheelEventDirection(evt) {
 let delta = Math.hypot(evt.deltaX, evt.deltaY);
 const angle = Math.atan2(evt.deltaY, evt.deltaX);
 if (-0.25 * Math.PI < angle && angle < 0.75 * Math.PI) {
 delta = -delta;
}
 return delta;
}
 function normalizeWheelEventDelta(evt) {
 let delta = normalizeWheelEventDirection(evt);
 const MOUSE_DOM_DELTA_PIXEL_MODE = 0;
 const MOUSE_DOM_DELTA_LINE_MODE = 1;
 const MOUSE_PIXELS_PER_LINE = 30;
 const MOUSE_LINES_PER_PAGE = 30;
 if (evt.deltaMode === MOUSE_DOM_DELTA_PIXEL_MODE) {
 delta /= MOUSE_PIXELS_PER_LINE * MOUSE_LINES_PER_PAGE;
} else if (evt.deltaMode === MOUSE_DOM_DELTA_LINE_MODE) {
 delta /= MOUSE_LINES_PER_PAGE;
}
 return delta;
}
 function isValidRotation(angle) {
 return Number.isInteger(angle) && angle % 90 === 0;
}
 function isValidScrollMode(mode) {
 return (
 Number.isInteger(mode) &&
 Object.values(ScrollMode).includes(mode) &&
 mode !== ScrollMode.UNKNOWN
 );
}
 function isValidSpreadMode(mode) {
 return (
 Number.isInteger(mode) &&
 Object.values(SpreadMode).includes(mode) &&
 mode !== SpreadMode.UNKNOWN
 );
}
 function isPortraitOrientation(size) {
 return size.width <= size.height;
}
const animationStarted = new Promise(function (resolve) {
 window.requestAnimationFrame(resolve);
});
 exports.animationStarted = animationStarted;
const docStyle = document.documentElement.style;
 exports.docStyle = docStyle;
 function clamp(v, min, max) {
 return Math.min(Math.max(v, min), max);
}
class ProgressBar {
 #classList = null;
 #percent = 0;
 #visible = true;
 constructor(id) {
const bar = document.getElementById(id);
 this.#classList = bar.classList;
}
 get percent() {
 return this.#percent;
}
 set percent(val) {
 this.#percent = clamp(val, 0, 100);
 if (isNaN(val)) {
 this.#classList.add("indeterminate");
 return;
}
 this.#classList.remove("indeterminate");
 docStyle.setProperty("--progressBar-percent", `${this.#percent}%`);
}
 setWidth(viewer) {
 if (!viewer) {
 return;
}
const container = viewer.parentNode;
const scrollbarWidth = container.offsetWidth - viewer.offsetWidth;
 if (scrollbarWidth > 0) {
 docStyle.setProperty(
 "--progressBar-end-offset",
 `${scrollbarWidth}px`
);
}
}
 hide() {
 if (!this.#visible) {
 return;
}
 this.#visible = false;
 this.#classList.add("hidden");
}
 show() {
 if (this.#visible) {
 return;
}
 this.#visible = true;
 this.#classList.remove("hidden");
}
}
 exports.ProgressBar = ProgressBar;
 function getActiveOrFocusedElement() {
 let curRoot = document;
 let curActiveOrFocused =
 curRoot.activeElement || curRoot.querySelector(":focus");
 while (curActiveOrFocused?.shadowRoot) {
 curRoot = curActiveOrFocused.shadowRoot;
 curActiveOrFocused =
 curRoot.activeElement || curRoot.querySelector(":focus");
}
 return curActiveOrFocused;
}
},
 (__unused_webpack_module, exports) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
 exports.compatibilityParams =
 exports.OptionKind =
 exports.AppOptions =
 void 0;
const compatibilityParams = Object.create(null);
 exports.compatibilityParams = compatibilityParams;
 {
 const userAgent = navigator.userAgent || "";
 const platform = navigator.platform || "";
 const maxTouchPoints = navigator.maxTouchPoints || 1;
 const isAndroid = /Android/.test(userAgent);
 const isIOS =
 /\b(iPad|iPhone|iPod)(?=;)/.test(userAgent) ||
 (platform === "MacIntel" && maxTouchPoints > 1);
 (function checkCanvasSizeLimitation() {
 if (isIOS || isAndroid) {
 compatibilityParams.maxCanvasPixels = 5242880;
}
})();
}
const OptionKind = {
 VIEWER: 0x02,
 API: 0x04,
 WORKER: 0x08,
 PREFERENCE: 0x80,
};
 exports.OptionKind = OptionKind;
const defaultOptions = {
 defaultZoomValue: {
 value: "",
 kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
},
 disableHistory: {
 value: false,
 kind: OptionKind.VIEWER,
},
 disablePageLabels: {
 value: false,
 kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
},
 enablePermissions: {
 value: false,
 kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
},
 enableScripting: {
 value: true,
 kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
},
 externalLinkRel: {
 value: "noopener noreferrer nofollow",
 kind: OptionKind.VIEWER,
},
 externalLinkTarget: {
 value: 0,
 kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
},
 historyUpdateUrl: {
 value: false,
 kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
},
 ignoreDestinationZoom: {
 value: false,
 kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
},
 imageResourcesPath: {
 value: "./images/",
 kind: OptionKind.VIEWER,
},
 maxCanvasPixels: {
 value: 16777216,
 kind: OptionKind.VIEWER,
},
 forcePageColors: {
 value: false,
 kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
},
 pageColorsBackground: {
 value: "Canvas",
 kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
},
 pageColorsForeground: {
 value: "CanvasText",
 kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
},
 pdfBugEnabled: {
 value: false,
 kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
},
 scrollModeOnLoad: {
 value: -1,
 kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
},
 spreadModeOnLoad: {
 value: -1,
 kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
},
 textLayerMode: {
 value: 1,
 kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
},
 useOnlyCssZoom: {
 value: false,
 kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
},
 viewerCssTheme: {
 value: 2,
 kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
},
 viewOnLoad: {
 value: 0,
 kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
},
 cMapPacked: {
 value: true,
 kind: OptionKind.API,
},
 cMapUrl: {
 value: "../web/cmaps/",
 kind: OptionKind.API,
},
 disableAutoFetch: {
 value: false,
 kind: OptionKind.API + OptionKind.PREFERENCE,
},
 disableFontFace: {
 value: false,
 kind: OptionKind.API + OptionKind.PREFERENCE,
},
 disableRange: {
 value: false,
 kind: OptionKind.API + OptionKind.PREFERENCE,
},
 disableStream: {
 value: false,
 kind: OptionKind.API + OptionKind.PREFERENCE,
},
 docBaseUrl: {
 value: "",
 kind: OptionKind.API,
},
 enableXfa: {
 value: true,
 kind: OptionKind.API + OptionKind.PREFERENCE,
},
 fontExtraProperties: {
 value: false,
 kind: OptionKind.API,
},
 isEvalSupported: {
 value: true,
 kind: OptionKind.API,
},
 isOffscreenCanvasSupported: {
 value: true,
 kind: OptionKind.API,
},
 maxImageSize: {
 value: -1,
 kind: OptionKind.API,
},
 pdfBug: {
 value: false,
 kind: OptionKind.API,
},
 standardFontDataUrl: {
 value: "../web/standard_fonts/",
 kind: OptionKind.API,
},
 verbosity: {
 value: 1,
 kind: OptionKind.API,
},
 workerPort: {
 value: null,
 kind: OptionKind.WORKER,
},
 workerSrc: {
 value: "../build/pdf.worker.min.js",
 kind: OptionKind.WORKER,
},
};
 {
 defaultOptions.defaultUrl = {
 value: url_pdf,
 kind: OptionKind.VIEWER,
};
 defaultOptions.disablePreferences = {
 value: false,
 kind: OptionKind.VIEWER,
};
 defaultOptions.renderer = {
 value: "canvas",
 kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
};
 defaultOptions.sandboxBundleSrc = {
 value: "../build/pdf.sandbox.min.js",
 kind: OptionKind.VIEWER,
};
}
const userOptions = Object.create(null);
class AppOptions {
 constructor() {
 throw new Error("Cannot initialize AppOptions.");
}
static get(name) {
const userOption = userOptions[name];
 if (userOption !== undefined) {
 return userOption;
}
const defaultOption = defaultOptions[name];
 if (defaultOption !== undefined) {
 return compatibilityParams[name] ?? defaultOption.value;
}
 return undefined;
}
static getAll(kind = null) {
const options = Object.create(null);
 for (const name in defaultOptions) {
 const defaultOption = defaultOptions[name];
 if (kind) {
 if ((kind & defaultOption.kind) === 0) {
 continue;
}
 if (kind === OptionKind.PREFERENCE) {
 const value = defaultOption.value,
 valueType = typeof value;
 if (
 valueType === "boolean" ||
 valueType === "string" ||
 (valueType === "number" && Number.isInteger(value))
 ) {
 options[name] = value;
 continue;
}
 throw new Error(`Invalid type for preference: ${name}`);
}
}
 const userOption = userOptions[name];
 options[name] =
 userOption !== undefined
 ? userOption
 : compatibilityParams[name] ?? defaultOption.value;
}
 return options;
}
static set(name, value) {
 userOptions[name] = value;
}
static setAll(options) {
 for (const name in options) {
 userOptions[name] = options[name];
}
}
static remove(name) {
 delete userOptions[name];
}
static _hasUserOptions() {
 return Object.keys(userOptions).length > 0;
}
}
 exports.AppOptions = AppOptions;

},

 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
 exports.SimpleLinkService =
 exports.PDFLinkService =
 exports.LinkTarget =
 void 0;
var _ui_utils = __webpack_require__(1);
const DEFAULT_LINK_REL = "noopener noreferrer nofollow";
const LinkTarget = {
 NONE: 0,
 SELF: 1,
 BLANK: 2,
 PARENT: 3,
 TOP: 4,
};
 exports.LinkTarget = LinkTarget;
 function addLinkAttributes(
 link,
 { url, target, rel, enabled = true } = {}
 ) {
 if (!url || typeof url !== "string") {
 throw new Error('A valid "url" parameter must provided.');
}
 const urlNullRemoved = (0, _ui_utils.removeNullCharacters)(url);
 if (enabled) {
 link.href = link.title = urlNullRemoved;
} else {
 link.href = "";
 link.title = `Disabled: ${urlNullRemoved}`;
 link.onclick = () => {
 return false;
};
}
 let targetStr = "";
 switch (target) {
 case LinkTarget.NONE:
 break;
 case LinkTarget.SELF:
 targetStr = "_self";
 break;
 case LinkTarget.BLANK:
 targetStr = "_blank";
 break;
 case LinkTarget.PARENT:
 targetStr = "_parent";
 break;
 case LinkTarget.TOP:
 targetStr = "_top";
 break;
}
 link.target = targetStr;
 link.rel = typeof rel === "string" ? rel : DEFAULT_LINK_REL;
}
class PDFLinkService {
 #pagesRefCache = new Map();
 constructor({
 eventBus,
 externalLinkTarget = null,
 externalLinkRel = null,
 ignoreDestinationZoom = false,
} = {}) {
 this.eventBus = eventBus;
 this.externalLinkTarget = externalLinkTarget;
 this.externalLinkRel = externalLinkRel;
 this.externalLinkEnabled = true;
 this._ignoreDestinationZoom = ignoreDestinationZoom;
 this.baseUrl = null;
 this.pdfDocument = null;
 this.pdfViewer = null;
 this.pdfHistory = null;
}
 setDocument(pdfDocument, baseUrl = null) {
 this.baseUrl = baseUrl;
 this.pdfDocument = pdfDocument;
 this.#pagesRefCache.clear();
}
 setViewer(pdfViewer) {
 this.pdfViewer = pdfViewer;
}
 setHistory(pdfHistory) {
 this.pdfHistory = pdfHistory;
}
 get pagesCount() {
 return this.pdfDocument ? this.pdfDocument.numPages : 0;
}
 get page() {
 return this.pdfViewer.currentPageNumber;
}
 set page(value) {
 this.pdfViewer.currentPageNumber = value;
}
 get rotation() {
 return this.pdfViewer.pagesRotation;
}
 set rotation(value) {
 this.pdfViewer.pagesRotation = value;
}
 #goToDestinationHelper(rawDest, namedDest = null, explicitDest) {
const destRef = explicitDest[0];
 let pageNumber;
 if (typeof destRef === "object" && destRef !== null) {
 pageNumber = this._cachedPageNumber(destRef);
 if (!pageNumber) {
 this.pdfDocument
 .getPageIndex(destRef)
 .then((pageIndex) => {
 this.cachePageRef(pageIndex + 1, destRef);
 this.#goToDestinationHelper(rawDest, namedDest, explicitDest);
})
 .catch(() => {
 console.error(
 `PDFLinkService.#goToDestinationHelper: "${destRef}" is not ` +
 `a valid page reference, for dest="${rawDest}".`
 );
});
 return;
}
} else if (Number.isInteger(destRef)) {
 pageNumber = destRef + 1;
} else {
 console.error(
 `PDFLinkService.#goToDestinationHelper: "${destRef}" is not ` +
 `a valid destination reference, for dest="${rawDest}".`
);
 return;
}
 if (!pageNumber || pageNumber < 1 || pageNumber > this.pagesCount) {
 console.error(
 `PDFLinkService.#goToDestinationHelper: "${pageNumber}" is not ` +
 `a valid page number, for dest="${rawDest}".`
);
 return;
}
 if (this.pdfHistory) {
 this.pdfHistory.pushCurrentPosition();
 this.pdfHistory.push({
 namedDest,
 explicitDest,
 pageNumber,
});
}
 this.pdfViewer.scrollPageIntoView({
 pageNumber,
 destArray: explicitDest,
 ignoreDestinationZoom: this._ignoreDestinationZoom,
});
}
async goToDestination(dest) {
 if (!this.pdfDocument) {
 return;
}
 let namedDest, explicitDest;
 if (typeof dest === "string") {
 namedDest = dest;
 explicitDest = await this.pdfDocument.getDestination(dest);
} else {
 namedDest = null;
 explicitDest = await dest;
}
 if (!Array.isArray(explicitDest)) {
 console.error(
 `PDFLinkService.goToDestination: "${explicitDest}" is not ` +
 `a valid destination array, for dest="${dest}".`
);
 return;
}
 this.#goToDestinationHelper(dest, namedDest, explicitDest);
}
 goToPage(val) {
 if (!this.pdfDocument) {
 return;
}
const pageNumber =
 (typeof val === "string" &&
 this.pdfViewer.pageLabelToPageNumber(val)) ||
 val | 0;
 if (
 !(
 Number.isInteger(pageNumber) &&
 pageNumber > 0 &&
 pageNumber <= this.pagesCount
 )
 ) {
 console.log(
 `PDFLinkService.goToPage: "${val}" is not a valid page.`
);
 return;
}
 if (this.pdfHistory) {
 this.pdfHistory.pushCurrentPosition();
 this.pdfHistory.pushPage(pageNumber);
}
 this.pdfViewer.scrollPageIntoView({
 pageNumber,
});
}
 addLinkAttributes(link, url, newWindow = false) {
 addLinkAttributes(link, {
 url,
 target: newWindow ? LinkTarget.BLANK : this.externalLinkTarget,
 rel: this.externalLinkRel,
 enabled: this.externalLinkEnabled,
});
}
 getDestinationHash(dest) {
 if (typeof dest === "string") {
 if (dest.length > 0) {
 return this.getAnchorUrl("#" + escape(dest));
}
} else if (Array.isArray(dest)) {
 const str = JSON.stringify(dest);
 if (str.length > 0) {
 return this.getAnchorUrl("#" + escape(str));
}
}
 return this.getAnchorUrl("");
}
 getAnchorUrl(anchor) {
 return (this.baseUrl || "") + anchor;
}
 setHash(hash) {
 if (!this.pdfDocument) {
 return;
}
 let pageNumber, dest;
 if (hash.includes("=")) {
 const params = (0, _ui_utils.parseQueryString)(hash);
 if (params.has("search")) {
 this.eventBus.dispatch("findfromurlhash", {
 source: this,
 query: params.get("search").replace(/"/g, ""),
 phraseSearch: params.get("phrase") === "true",
});
}
 if (params.has("page")) {
 pageNumber = params.get("page") | 0 || 1;
}
 if (params.has("zoom")) {
const zoomArgs = params.get("zoom").split(",");
const zoomArg = zoomArgs[0];
const zoomArgNumber = parseFloat(zoomArg);
 if (!zoomArg.includes("Fit")) {
 dest = [
 null,
 {
 name: "XYZ",
},
 zoomArgs.length > 1 ? zoomArgs[1] | 0 : null,
 zoomArgs.length > 2 ? zoomArgs[2] | 0 : null,
 zoomArgNumber ? zoomArgNumber / 100 : zoomArg,
 ];
} else {
 if (zoomArg === "Fit" || zoomArg === "FitB") {
 dest = [
 null,
 {
 name: zoomArg,
},
 ];
} else if (
 zoomArg === "FitH" ||
 zoomArg === "FitBH" ||
 zoomArg === "FitV" ||
 zoomArg === "FitBV"
 ) {
 dest = [
 null,
 {
 name: zoomArg,
},
 zoomArgs.length > 1 ? zoomArgs[1] | 0 : null,
 ];
} else if (zoomArg === "FitR") {
 if (zoomArgs.length !== 5) {
 console.error(
 'PDFLinkService.setHash: Not enough parameters for "FitR".'
 );
} else {
 dest = [
 null,
 {
 name: zoomArg,
},
 zoomArgs[1] | 0,
 zoomArgs[2] | 0,
 zoomArgs[3] | 0,
 zoomArgs[4] | 0,
 ];
}
} else {
 console.error(
 `PDFLinkService.setHash: "${zoomArg}" is not a valid zoom value.`
 );
}
}
}
 if (dest) {
 this.pdfViewer.scrollPageIntoView({
 pageNumber: pageNumber || this.page,
 destArray: dest,
 allowNegativeOffset: true,
});
} else if (pageNumber) {
 this.page = pageNumber;
}
 if (params.has("pagemode")) {
 this.eventBus.dispatch("pagemode", {
 source: this,
 mode: params.get("pagemode"),
});
}
 if (params.has("nameddest")) {
 this.goToDestination(params.get("nameddest"));
}
} else {
 dest = unescape(hash);
 try {
 dest = JSON.parse(dest);
 if (!Array.isArray(dest)) {
 dest = dest.toString();
}
} catch (ex) { }
 if (
 typeof dest === "string" ||
 PDFLinkService.#isValidExplicitDestination(dest)
 ) {
 this.goToDestination(dest);
 return;
}
 console.error(
 `PDFLinkService.setHash: "${unescape(
 hash
 )}" is not a valid destination.`
);
}
}
async executeSetOCGState(action) {
const pdfDocument = this.pdfDocument;
const optionalContentConfig = await this.pdfViewer
 .optionalContentConfigPromise;
 if (pdfDocument !== this.pdfDocument) {
 return;
}
 let operator;
 for (const elem of action.state) {
 switch (elem) {
 case "ON":
 case "OFF":
 case "Toggle":
 operator = elem;
 continue;
}
 switch (operator) {
 case "ON":
 optionalContentConfig.setVisibility(elem, true);
 break;
 case "OFF":
 optionalContentConfig.setVisibility(elem, false);
 break;
 case "Toggle":
 const group = optionalContentConfig.getGroup(elem);
 if (group) {
 optionalContentConfig.setVisibility(elem, !group.visible);
}
 break;
}
}
 this.pdfViewer.optionalContentConfigPromise = Promise.resolve(
 optionalContentConfig
);
}
 cachePageRef(pageNum, pageRef) {
 if (!pageRef) {
 return;
}
const refStr =
 pageRef.gen === 0
 ? `${pageRef.num}R`
 : `${pageRef.num}R${pageRef.gen}`;
 this.#pagesRefCache.set(refStr, pageNum);
}
 _cachedPageNumber(pageRef) {
 if (!pageRef) {
 return null;
}
const refStr =
 pageRef.gen === 0
 ? `${pageRef.num}R`
 : `${pageRef.num}R${pageRef.gen}`;
 return this.#pagesRefCache.get(refStr) || null;
}
 isPageVisible(pageNumber) {
 return this.pdfViewer.isPageVisible(pageNumber);
}
 isPageCached(pageNumber) {
 return this.pdfViewer.isPageCached(pageNumber);
}
static #isValidExplicitDestination(dest) {
 if (!Array.isArray(dest)) {
 return false;
}
const destLength = dest.length;
 if (destLength < 2) {
 return false;
}
const page = dest[0];
 if (
 !(
 typeof page === "object" &&
 Number.isInteger(page.num) &&
 Number.isInteger(page.gen)
 ) &&
 !(Number.isInteger(page) && page >= 0)
 ) {
 return false;
}
const zoom = dest[1];
 if (!(typeof zoom === "object" && typeof zoom.name === "string")) {
 return false;
}
 let allowNull = true;
 switch (zoom.name) {
 case "XYZ":
 if (destLength !== 5) {
 return false;
}
 break;
 case "Fit":
 case "FitB":
 return destLength === 2;
 case "FitH":
 case "FitBH":
 case "FitV":
 case "FitBV":
 if (destLength !== 3) {
 return false;
}
 break;
 case "FitR":
 if (destLength !== 6) {
 return false;
}
 allowNull = false;
 break;
 default:
 return false;
}
 for (let i = 2; i < destLength; i++) {
 const param = dest[i];
 if (!(typeof param === "number" || (allowNull && param === null))) {
 return false;
}
}
 return true;
}
}
 exports.PDFLinkService = PDFLinkService;
class SimpleLinkService {
 constructor() {
 this.externalLinkEnabled = true;
}
 get pagesCount() {
 return 0;
}
 get page() {
 return 0;
}
 get rotation() {
 return 0;
}
async goToDestination(dest) { }
 goToPage(val) { }
 addLinkAttributes(link, url, newWindow = false) {
 addLinkAttributes(link, {
 url,
 enabled: this.externalLinkEnabled,
});
}
 getDestinationHash(dest) {
 return "#";
}
 getAnchorUrl(hash) {
 return "#";
}
 setHash(hash) { }
 executeSetOCGState(action) { }
 cachePageRef(pageNum, pageRef) { }
 isPageVisible(pageNumber) {
 return true;
}
 isPageCached(pageNumber) {
 return true;
}
}
 exports.SimpleLinkService = SimpleLinkService;
},
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
 exports.PDFViewerApplication = exports.DefaultExternalServices = void 0;
var _ui_utils = __webpack_require__(1);
var _pdfjsLib = __webpack_require__(5);
var _app_options = __webpack_require__(2);
var _event_utils = __webpack_require__(6);
var _pdf_link_service = __webpack_require__(3);
var _overlay_manager = __webpack_require__(10);
var _pdf_find_controller = __webpack_require__(16);
var _pdf_history = __webpack_require__(18);
var _pdf_rendering_queue = __webpack_require__(22);
var _pdf_scripting_manager = __webpack_require__(23);
var _pdf_viewer = __webpack_require__(28);
var _toolbar = __webpack_require__(39);
var _view_history = __webpack_require__(40);
const DISABLE_AUTO_FETCH_LOADING_BAR_TIMEOUT = 5000;
const FORCE_PAGES_LOADED_TIMEOUT = 10000;
const WHEEL_ZOOM_DISABLED_TIMEOUT = 1000;
const ViewOnLoad = {
 UNKNOWN: -1,
 PREVIOUS: 0,
 INITIAL: 1,
};
const ViewerCssTheme = {
 AUTOMATIC: 0,
 LIGHT: 1,
 DARK: 2,
};
const KNOWN_VERSIONS = [
 "1.0",
 "1.1",
 "1.2",
 "1.3",
 "1.4",
 "1.5",
 "1.6",
 "1.7",
 "1.8",
 "1.9",
 "2.0",
 "2.1",
 "2.2",
 "2.3",
 ];
const KNOWN_GENERATORS = [
 "acrobat distiller",
 "acrobat pdfwriter",
 "adobe livecycle",
 "adobe pdf library",
 "adobe photoshop",
 "ghostscript",
 "tcpdf",
 "cairo",
 "dvipdfm",
 "dvips",
 "pdftex",
 "pdfkit",
 "itext",
 "prince",
 "quarkxpress",
 "mac os x",
 "microsoft",
 "openoffice",
 "oracle",
 "luradocument",
 "pdf-xchange",
 "antenna house",
 "aspose.cells",
 "fpdf",
 ];
class DefaultExternalServices {
 constructor() {
 throw new Error("Cannot initialize DefaultExternalServices.");
}
static updateFindControlState(data) { }
static updateFindMatchesCount(data) { }
static initPassiveLoading(callbacks) { }
static reportTelemetry(data) { }
static createPreferences() {
 throw new Error("Not implemented: createPreferences");
}
static createScripting(options) {
 throw new Error("Not implemented: createScripting");
}
static get supportsIntegratedFind() {
 return (0, _pdfjsLib.shadow)(this, "supportsIntegratedFind", false);
}
static get supportsDocumentFonts() {
 return (0, _pdfjsLib.shadow)(this, "supportsDocumentFonts", true);
}
static get supportedMouseWheelZoomModifierKeys() {
 return (0, _pdfjsLib.shadow)(
 this,
 "supportedMouseWheelZoomModifierKeys",
 {
 ctrlKey: true,
 metaKey: true,
}
);
}
static get isInAutomation() {
 return (0, _pdfjsLib.shadow)(this, "isInAutomation", false);
}
}
 exports.DefaultExternalServices = DefaultExternalServices;
const PDFViewerApplication = {
 initialBookmark: document.location.hash.substring(1),
 _initializedCapability: (0, _pdfjsLib.createPromiseCapability)(),
 appConfig: null,
 pdfDocument: null,
 pdfLoadingTask: null,
 pdfViewer: null,
 pdfRenderingQueue: null,
 pdfLinkService: null,
 pdfHistory: null,
 pdfScriptingManager: null,
 store: null,
 overlayManager: null,
 preferences: null,
 toolbar: null,
 eventBus: null,
 isInitialViewSet: false,
 isViewerEmbedded: window.parent !== window,
 url: "",
 baseUrl: "",
 externalServices: DefaultExternalServices,
 _boundEvents: Object.create(null),
 documentInfo: null,
 metadata: null,
 _contentDispositionFilename: null,
 _contentLength: null,
 _docStats: null,
 _wheelUnusedTicks: 0,
 _PDFBug: null,
 _title: document.title,
async initialize(appConfig) {
 this.preferences = this.externalServices.createPreferences();
 this.appConfig = appConfig;
 await this._readPreferences();
 await this._parseHashParameters();
 this._forceCssTheme();
 if (
 this.isViewerEmbedded &&
 _app_options.AppOptions.get("externalLinkTarget") ===
 _pdf_link_service.LinkTarget.NONE
 ) {
 _app_options.AppOptions.set(
 "externalLinkTarget",
 _pdf_link_service.LinkTarget.TOP
);
}
 await this._initializeViewerComponents();
 this.bindEvents();
 this.bindWindowEvents();
const appContainer =
 appConfig.appContainer || document.documentElement;
 this._initializedCapability.resolve();
},
async _readPreferences() {
 if (_app_options.AppOptions.get("disablePreferences")) {
 return;
}
 if (_app_options.AppOptions._hasUserOptions()) {
 console.warn(
 "_readPreferences: The Preferences may override manually set AppOptions; " +
 'please use the "disablePreferences"-option in order to prevent that.'
);
}
 try {
 _app_options.AppOptions.setAll(await this.preferences.getAll());
} catch (reason) {
 console.error(`_readPreferences: "${reason?.message}".`);
}
},
async _parseHashParameters() {
 if (!_app_options.AppOptions.get("pdfBugEnabled")) {
 return;
}
const hash = document.location.hash.substring(1);
 if (!hash) {
 return;
}
const { mainContainer, viewerContainer } = this.appConfig,
 params = (0, _ui_utils.parseQueryString)(hash);
 if (params.get("disableworker") === "true") {
 try {
 await loadFakeWorker();
} catch (ex) {
 console.error(`_parseHashParameters: "${ex.message}".`);
}
}
 if (params.has("disablerange")) {
 _app_options.AppOptions.set(
 "disableRange",
 params.get("disablerange") === "true"
);
}
 if (params.has("disablestream")) {
 _app_options.AppOptions.set(
 "disableStream",
 params.get("disablestream") === "true"
);
}
 if (params.has("disableautofetch")) {
 _app_options.AppOptions.set(
 "disableAutoFetch",
 params.get("disableautofetch") === "true"
);
}
 if (params.has("disablefontface")) {
 _app_options.AppOptions.set(
 "disableFontFace",
 params.get("disablefontface") === "true"
);
}
 if (params.has("disablehistory")) {
 _app_options.AppOptions.set(
 "disableHistory",
 params.get("disablehistory") === "true"
);
}
 if (params.has("verbosity")) {
 _app_options.AppOptions.set(
 "verbosity",
 params.get("verbosity") | 0
);
}
 if (params.has("textlayer")) {
 switch (params.get("textlayer")) {
 case "off":
 _app_options.AppOptions.set(
 "textLayerMode",
 _ui_utils.TextLayerMode.DISABLE
);
 break;
 case "visible":
 case "shadow":
 case "hover":
 viewerContainer.classList.add(
 `textLayer-${params.get("textlayer")}`
);
 try {
 await loadPDFBug(this);
 this._PDFBug.loadCSS();
} catch (ex) {
 console.error(`_parseHashParameters: "${ex.message}".`);
}
 break;
}
}
 if (params.has("pdfbug")) {
 _app_options.AppOptions.set("pdfBug", true);
 _app_options.AppOptions.set("fontExtraProperties", true);
 const enabled = params.get("pdfbug").split(",");
 try {
 await loadPDFBug(this);
 this._PDFBug.init(
 {
 OPS: _pdfjsLib.OPS,
},
 mainContainer,
 enabled
);
} catch (ex) {
 console.error(`_parseHashParameters: "${ex.message}".`);
}
}
},
 _forceCssTheme() {
const cssTheme = _app_options.AppOptions.get("viewerCssTheme");
 if (
 cssTheme === ViewerCssTheme.AUTOMATIC ||
 !Object.values(ViewerCssTheme).includes(cssTheme)
 ) {
 return;
}
 try {
 const styleSheet = document.styleSheets[0];
 const cssRules = styleSheet?.cssRules || [];
 for (let i = 0, ii = cssRules.length; i < ii; i++) {
const rule = cssRules[i];
 if (
 rule instanceof CSSMediaRule &&
 rule.media?.[0] === "(prefers-color-scheme: dark)"
 ) {
 if (cssTheme === ViewerCssTheme.LIGHT) {
 styleSheet.deleteRule(i);
 return;
}
 const darkRules =
 /^@media \(prefers-color-scheme: dark\) {\n\s*([\w\s-.,:;/\\{}()]+)\n}$/.exec(
 rule.cssText
 );
 if (darkRules?.[1]) {
 styleSheet.deleteRule(i);
 styleSheet.insertRule(darkRules[1], i);
}
 return;
}
}
} catch (reason) {
 console.error(`_forceCssTheme: "${reason?.message}".`);
}
},
async _initializeViewerComponents() {
const { appConfig, externalServices } = this;
const eventBus = externalServices.isInAutomation
 ? new _event_utils.AutomationEventBus()
 : new _event_utils.EventBus();
 this.eventBus = eventBus;
 this.overlayManager = new _overlay_manager.OverlayManager();
const pdfRenderingQueue =
 new _pdf_rendering_queue.PDFRenderingQueue();
 pdfRenderingQueue.onIdle = this._cleanup.bind(this);
 this.pdfRenderingQueue = pdfRenderingQueue;
const pdfLinkService = new _pdf_link_service.PDFLinkService({
 eventBus,
 externalLinkTarget:
 _app_options.AppOptions.get("externalLinkTarget"),
 externalLinkRel: _app_options.AppOptions.get("externalLinkRel"),
 ignoreDestinationZoom: _app_options.AppOptions.get(
 "ignoreDestinationZoom"
 ),
});
 this.pdfLinkService = pdfLinkService;
const findController = new _pdf_find_controller.PDFFindController({
 linkService: pdfLinkService,
 eventBus,
});
 this.findController = findController;
const pdfScriptingManager =
 new _pdf_scripting_manager.PDFScriptingManager({
 eventBus,
 sandboxBundleSrc: _app_options.AppOptions.get("sandboxBundleSrc"),
 scriptingFactory: externalServices,
 docPropertiesLookup: this._scriptingDocProperties.bind(this),
});
 this.pdfScriptingManager = pdfScriptingManager;
const container = appConfig.mainContainer,
 viewer = appConfig.viewerContainer;
const pageColors =
 _app_options.AppOptions.get("forcePageColors") ||
 window.matchMedia("(forced-colors: active)").matches
 ? {
 background: _app_options.AppOptions.get(
 "pageColorsBackground"
 ),
 foreground: _app_options.AppOptions.get(
 "pageColorsForeground"
 ),
}
 : null;
 this.pdfViewer = new _pdf_viewer.PDFViewer({
 container,
 viewer,
 eventBus,
 renderingQueue: pdfRenderingQueue,
 linkService: pdfLinkService,
 findController,
 scriptingManager:
 _app_options.AppOptions.get("enableScripting") &&
 pdfScriptingManager,
 renderer: _app_options.AppOptions.get("renderer"),
 textLayerMode: _app_options.AppOptions.get("textLayerMode"),
 annotationMode: _app_options.AppOptions.get("annotationMode"),
 imageResourcesPath:
 _app_options.AppOptions.get("imageResourcesPath"),
 useOnlyCssZoom: _app_options.AppOptions.get("useOnlyCssZoom"),
 maxCanvasPixels: _app_options.AppOptions.get("maxCanvasPixels"),
 enablePermissions: _app_options.AppOptions.get("enablePermissions"),
 pageColors,
});
 pdfRenderingQueue.setViewer(this.pdfViewer);
 pdfLinkService.setViewer(this.pdfViewer);
 pdfScriptingManager.setViewer(this.pdfViewer);
 if (
 !this.isViewerEmbedded &&
 !_app_options.AppOptions.get("disableHistory")
 ) {
 this.pdfHistory = new _pdf_history.PDFHistory({
 linkService: pdfLinkService,
 eventBus,
});
 pdfLinkService.setHistory(this.pdfHistory);
}
 this.toolbar = new _toolbar.Toolbar(appConfig.toolbar, eventBus);
},
 run(config) {
 this.initialize(config).then(webViewerInitialized);
},
 get initialized() {
 return this._initializedCapability.settled;
},
 get initializedPromise() {
 return this._initializedCapability.promise;
},
 zoomIn(steps) {
 this.pdfViewer.increaseScale(steps);
},
 zoomOut(steps) {
 this.pdfViewer.decreaseScale(steps);
},
 zoomReset() {
 this.pdfViewer.currentScaleValue = _ui_utils.DEFAULT_SCALE_VALUE;
},
 get pagesCount() {
 return this.pdfDocument ? this.pdfDocument.numPages : 0;
},
 get page() {
 return this.pdfViewer.currentPageNumber;
},
 set page(val) {
 this.pdfViewer.currentPageNumber = val;
},
 get supportsIntegratedFind() {
 return this.externalServices.supportsIntegratedFind;
},
 get supportsDocumentFonts() {
 return this.externalServices.supportsDocumentFonts;
},
 get loadingBar() {
const bar = new _ui_utils.ProgressBar("loadingBar");
 return (0, _pdfjsLib.shadow)(this, "loadingBar", bar);
},
 get supportedMouseWheelZoomModifierKeys() {
 return this.externalServices.supportedMouseWheelZoomModifierKeys;
},
 initPassiveLoading() {
 throw new Error("Not implemented: initPassiveLoading");
},
 setTitleUsingUrl(url = "", downloadUrl = null) {
 this.url = url;
 this.baseUrl = url.split("#")[0];
 let title = (0, _pdfjsLib.getPdfFilenameFromUrl)(url, "");
 if (!title) {
 try {
 title =
 decodeURIComponent((0, _pdfjsLib.getFilenameFromUrl)(url)) ||
 url;
} catch (ex) {
 title = url;
}
}
 this.setTitle(title);
},
 setTitle(title = this._title) {
 this._title = title;
 if (this.isViewerEmbedded) {
 return;
}
},
 get _docFilename() {
 return (
 this._contentDispositionFilename ||
 (0, _pdfjsLib.getPdfFilenameFromUrl)(this.url)
);
},
async close() {
 this._unblockDocumentLoadEvent();
 this._hideViewBookmark();
 if (!this.pdfLoadingTask) {
 return;
}
 if (
 this.pdfDocument?.annotationStorage.size > 0 &&
 this._annotationStorageModified
 ) {
 try {
 await this.save();
} catch (reason) { }
}
const promises = [];
 promises.push(this.pdfLoadingTask.destroy());
 this.pdfLoadingTask = null;
 if (this.pdfDocument) {
 this.pdfDocument = null;
 this.pdfViewer.setDocument(null);
 this.pdfLinkService.setDocument(null);
}
 this.pdfLinkService.externalLinkEnabled = true;
 this.store = null;
 this.isInitialViewSet = false;
 this.url = "";
 this.baseUrl = "";
 this.documentInfo = null;
 this.metadata = null;
 this._contentDispositionFilename = null;
 this._contentLength = null;
 this._docStats = null;
 promises.push(this.pdfScriptingManager.destroyPromise);
 this.setTitle();
 this.pdfHistory?.reset();
 this.toolbar.reset();
 this._PDFBug?.cleanup();
 await Promise.all(promises);
},
async open(file, args) {
 if (this.pdfLoadingTask) {
 await this.close();
}
const workerParameters = _app_options.AppOptions.getAll(
 _app_options.OptionKind.WORKER
);
 for (const key in workerParameters) {
 _pdfjsLib.GlobalWorkerOptions[key] = workerParameters[key];
}
const parameters = Object.create(null);
 if (typeof file === "string") {
 this.setTitleUsingUrl(file, file);
 parameters.url = encodeURI(file);
} else if (file && "byteLength" in file) {
 parameters.data = file;
} else if (file.url && file.originalUrl) {
 this.setTitleUsingUrl(file.originalUrl, file.url);
 parameters.url = file.url;
}
const apiParameters = _app_options.AppOptions.getAll(
 _app_options.OptionKind.API
);
 for (const key in apiParameters) {
 let value = apiParameters[key];
 if (key === "docBaseUrl" && !value) {
}
 parameters[key] = value;
}
 if (args) {
 for (const key in args) {
 parameters[key] = args[key];
}
}
 chrome.storage.local.get(['pdfData'], (result) => {
 let loadingTask = null;
 if(result.pdfData) {
const pdfDataResponse = result.pdfData;
const binaryString = atob(pdfDataResponse.data);
const len = binaryString.length;
const bytes = new Uint8Array(len);
 for (let i = 0; i < len; i++) {
 bytes[i] = binaryString.charCodeAt(i);
}
const pdfBlob = new Blob([bytes], { type: 'application/pdf' });
const reader = new FileReader();
 reader.onloadend = (event) => {
 if (event.target.readyState === FileReader.DONE) {
const pdfData = event.target.result;
 loadingTask = _pdfjsLib.getDocument({data: pdfData});
 
 this.pdfLoadingTask = loadingTask;
 loadingTask.onProgress = ({ loaded, total }) => {
 this.progress(loaded / total);
};
 loadingTask.onUnsupportedFeature = this.fallback.bind(this);
 return loadingTask.promise.then(
 (pdfDocument) => {
 this.load(pdfDocument);
},
 (reason) => {
 if (loadingTask !== this.pdfLoadingTask) {
 return undefined;
}
 let key = "loading_error";
 if (reason instanceof _pdfjsLib.InvalidPDFException) {
 key = "invalid_file_error";
} else if (reason instanceof _pdfjsLib.MissingPDFException) {
 key = "missing_file_error";
} else if (
 reason instanceof _pdfjsLib.UnexpectedResponseException
 ) {
 key = "unexpected_response_error";
}
 const errorMessage =
 errorMessages[key] || "An unknown error occurred.";
 return this._documentError(errorMessage, {
 message: reason?.message,
});
}
 );
}
};
 reader.readAsArrayBuffer(pdfBlob);
} else {
 loadingTask = (0, _pdfjsLib.getDocument)(parameters);
 this.pdfLoadingTask = loadingTask;
 loadingTask.onProgress = ({ loaded, total }) => {
 this.progress(loaded / total);
};
 loadingTask.onUnsupportedFeature = this.fallback.bind(this);
 return loadingTask.promise.then(
 (pdfDocument) => {
 this.load(pdfDocument);
},
 (reason) => {
 if (loadingTask !== this.pdfLoadingTask) {
 return undefined;
}
 let key = "loading_error";
 if (reason instanceof _pdfjsLib.InvalidPDFException) {
 key = "invalid_file_error";
} else if (reason instanceof _pdfjsLib.MissingPDFException) {
 key = "missing_file_error";
} else if (
 reason instanceof _pdfjsLib.UnexpectedResponseException
 ) {
 key = "unexpected_response_error";
}
 const errorMessage =
 errorMessages[key] || "An unknown error occurred.";
 return this._documentError(errorMessage, {
 message: reason?.message,
});} ); } });},
 fallback(featureId) {
 this.externalServices.reportTelemetry({
 type: "unsupportedFeature",
 featureId,
});
},
 _documentError(message, moreInfo = null) {
 this._unblockDocumentLoadEvent();
 this._otherError(message, moreInfo);
 this.eventBus.dispatch("documenterror", {
 source: this,
 message,
 reason: moreInfo?.message ?? null,
});
},
 _otherError(message, moreInfo = null) {
const moreInfoText = [
 `PDF.js v${_pdfjsLib.version || "?"} (build: ${_pdfjsLib.build || "?"
})`,
 ];
 if (moreInfo) {
 moreInfoText.push(`Message: ${moreInfo.message}`);
 if (moreInfo.stack) {
 moreInfoText.push(`Stack: ${moreInfo.stack}`);
} else {
 if (moreInfo.filename) {
 moreInfoText.push(`File: ${moreInfo.filename}`);
}
 if (moreInfo.lineNumber) {
 moreInfoText.push(`Line: ${moreInfo.lineNumber}`);
}
}
}
 console.error(`${message}\n\n${moreInfoText.join("\n")}`);
 this.fallback();
},
 progress(level) {
const percent = Math.round(level * 100);
 if (percent <= this.loadingBar.percent) {
 return;
}
 this.loadingBar.percent = percent;
const disableAutoFetch =
 this.pdfDocument?.loadingParams.disableAutoFetch ??
 _app_options.AppOptions.get("disableAutoFetch");
 if (!disableAutoFetch || isNaN(percent)) {
 return;
}
 if (this.disableAutoFetchLoadingBarTimeout) {
 clearTimeout(this.disableAutoFetchLoadingBarTimeout);
 this.disableAutoFetchLoadingBarTimeout = null;
}
 this.loadingBar.show();
 this.disableAutoFetchLoadingBarTimeout = setTimeout(() => {
 this.loadingBar.hide();
 this.disableAutoFetchLoadingBarTimeout = null;
}, DISABLE_AUTO_FETCH_LOADING_BAR_TIMEOUT);
},
 load(pdfDocument) {
 this.pdfDocument = pdfDocument;
 pdfDocument.getDownloadInfo().then(({ length }) => {
 this._contentLength = length;
 this.loadingBar.hide();
 firstPagePromise.then(() => {
 this.eventBus.dispatch("documentloaded", {
 source: this,
});
});
});
const pageLayoutPromise = pdfDocument
 .getPageLayout()
 .catch(function () { });
const pageModePromise = pdfDocument
 .getPageMode()
 .catch(function () { });
const openActionPromise = pdfDocument
 .getOpenAction()
 .catch(function () { });
 this.toolbar.setPagesCount(pdfDocument.numPages, false);
 let baseDocumentUrl;
 baseDocumentUrl = null;
 this.pdfLinkService.setDocument(pdfDocument, baseDocumentUrl);
const pdfViewer = this.pdfViewer;
 pdfViewer.setDocument(pdfDocument);
const { firstPagePromise, onePageRendered, pagesPromise } = pdfViewer;
const storedPromise = (this.store = new _view_history.ViewHistory(
 pdfDocument.fingerprints[0]
 ))
 .getMultiple({
 page: null,
 zoom: _ui_utils.DEFAULT_SCALE_VALUE,
 scrollLeft: "0",
 scrollTop: "0",
 rotation: null,
 scrollMode: _ui_utils.ScrollMode.UNKNOWN,
 spreadMode: _ui_utils.SpreadMode.UNKNOWN,
})
 .catch(() => {
 return Object.create(null);
});
 firstPagePromise.then((pdfPage) => {
 this.loadingBar.setWidth(this.appConfig.viewerContainer);
 this._initializeAnnotationStorageCallbacks(pdfDocument);
 Promise.all([
 _ui_utils.animationStarted,
 storedPromise,
 pageLayoutPromise,
 pageModePromise,
 openActionPromise,
 ])
 .then(
 async ([
 timeStamp,
 stored,
 pageLayout,
 pageMode,
 openAction,
 ]) => {
const viewOnLoad = _app_options.AppOptions.get("viewOnLoad");
 this._initializePdfHistory({
 fingerprint: pdfDocument.fingerprints[0],
 viewOnLoad,
 initialDest: openAction?.dest,
});
const initialBookmark = this.initialBookmark;
const zoom = _app_options.AppOptions.get("defaultZoomValue");
 let hash = zoom ? `zoom=${zoom}` : null;
 let rotation = null;
 let scrollMode =
 _app_options.AppOptions.get("scrollModeOnLoad");
 let spreadMode =
 _app_options.AppOptions.get("spreadModeOnLoad");
 if (stored.page && viewOnLoad !== ViewOnLoad.INITIAL) {
 hash =
 `page=${stored.page}&zoom=${zoom || stored.zoom},` +
 `${stored.scrollLeft},${stored.scrollTop}`;
 rotation = parseInt(stored.rotation, 10);
 if (scrollMode === _ui_utils.ScrollMode.UNKNOWN) {
 scrollMode = stored.scrollMode | 0;
}
 if (spreadMode === _ui_utils.SpreadMode.UNKNOWN) {
 spreadMode = stored.spreadMode | 0;
}
}
 if (
 pageLayout &&
 scrollMode === _ui_utils.ScrollMode.UNKNOWN &&
 spreadMode === _ui_utils.SpreadMode.UNKNOWN
 ) {
 const modes = (0, _ui_utils.apiPageLayoutToViewerModes)(
 pageLayout
 );
 spreadMode = modes.spreadMode;
}
 this.setInitialView(hash, {
 rotation,
 scrollMode,
 spreadMode,
});
 this.eventBus.dispatch("documentinit", {
 source: this,
});
 if (!this.isViewerEmbedded) {
 pdfViewer.focus();
}
 await Promise.race([
 pagesPromise,
 new Promise((resolve) => {
 setTimeout(resolve, FORCE_PAGES_LOADED_TIMEOUT);
}),
 ]);
 if (!initialBookmark && !hash) {
 return;
}
 if (pdfViewer.hasEqualPageSizes) {
 return;
}
 this.initialBookmark = initialBookmark;
 pdfViewer.currentScaleValue = pdfViewer.currentScaleValue;
 this.setInitialView(hash);
}
 )
 .catch(() => {
 this.setInitialView();
})
 .then(function () {
 pdfViewer.update();
});
});
 pagesPromise.then(
 () => {
 this._unblockDocumentLoadEvent();
},
 (reason) => {
const errorMessage = errorMessages["loading_error"];
 this._documentError(errorMessage, {
 message: reason?.message,
});
}
);
 onePageRendered.then((data) => {
 this.externalServices.reportTelemetry({
 type: "pageInfo",
 timestamp: data.timestamp,
});
 pdfViewer.optionalContentConfigPromise.then(
 (optionalContentConfig) => {
 if (pdfDocument !== this.pdfDocument) {
 return; }});});
 this._initializePageLabels(pdfDocument);
 this._initializeMetadata(pdfDocument).then(() => {
 injectZetaMarkerScripts();
});
},
async _scriptingDocProperties(pdfDocument) {
 if (!this.documentInfo) {
 await new Promise((resolve) => {
 this.eventBus._on("metadataloaded", resolve, {
 once: true,
});
});
 if (pdfDocument !== this.pdfDocument) {
 return null;
}
}
 if (!this._contentLength) {
 await new Promise((resolve) => {
 this.eventBus._on("documentloaded", resolve, {
 once: true,
});
});
 if (pdfDocument !== this.pdfDocument) {
 return null;
}
}
 return {
 ...this.documentInfo,
 baseURL: this.baseUrl,
 filesize: this._contentLength,
 filename: this._docFilename,
 metadata: this.metadata?.getRaw(),
 authors: this.metadata?.get("dc:creator"),
 numPages: this.pagesCount,
 URL: this.url,
};
},
async _initializeMetadata(pdfDocument) {
const { info, metadata, contentDispositionFilename, contentLength } =
 await pdfDocument.getMetadata();
 if (pdfDocument !== this.pdfDocument) {
 return;
}
 this.documentInfo = info;
 this.metadata = metadata;
 this._contentDispositionFilename ??= contentDispositionFilename;
 this._contentLength ??= contentLength;
 console.log(
 `PDF ${pdfDocument.fingerprints[0]} [${info.PDFFormatVersion} ` +
 `${(info.Producer || "-").trim()} / ${(
 info.Creator || "-"
 ).trim()}] ` +
 `(PDF.js: ${_pdfjsLib.version || "?"} [${_pdfjsLib.build || "?"
}])`
);

 let pdfTitle = info.Title;
const metadataTitle = metadata?.get("dc:title");
 if (metadataTitle) {
 if (
 metadataTitle !== "Untitled" &&
 !/[\uFFF0-\uFFFF]/g.test(metadataTitle)
 ) {
 pdfTitle = metadataTitle;
}
}
 if (pdfTitle) {
 this.setTitle(
 `${pdfTitle} - ${this._contentDispositionFilename || this._title}`
);
} else if (this._contentDispositionFilename) {
 this.setTitle(this._contentDispositionFilename);
}
 if (
 info.IsXFAPresent &&
 !info.IsAcroFormPresent &&
 !pdfDocument.isPureXfa
 ) {
 if (pdfDocument.loadingParams.enableXfa) {
 console.warn(
 "Warning: XFA Foreground documents are not supported"
);
} else {
 console.warn("Warning: XFA support is not enabled");
}
 this.fallback(_pdfjsLib.UNSUPPORTED_FEATURES.forms);
} else if (
 (info.IsAcroFormPresent || info.IsXFAPresent) &&
 !this.pdfViewer.renderForms
 ) {
 console.warn("Warning: Interactive form support is not enabled");
 this.fallback(_pdfjsLib.UNSUPPORTED_FEATURES.forms);
}
 if (info.IsSignaturesPresent) {
 console.warn(
 "Warning: Digital signatures validation is not supported"
);
 this.fallback(_pdfjsLib.UNSUPPORTED_FEATURES.signatures);
}
 let versionId = "other";
 if (KNOWN_VERSIONS.includes(info.PDFFormatVersion)) {
 versionId = `v${info.PDFFormatVersion.replace(".", "_")}`;
}
 let generatorId = "other";
 if (info.Producer) {
 const producer = info.Producer.toLowerCase();
 KNOWN_GENERATORS.some(function (generator) {
 if (!producer.includes(generator)) {
 return false;
}
 generatorId = generator.replace(/[ .-]/g, "_");
 return true;
});
}
 let formType = null;
 if (info.IsXFAPresent) {
 formType = "xfa";
} else if (info.IsAcroFormPresent) {
 formType = "acroform";
}
 this.externalServices.reportTelemetry({
 type: "documentInfo",
 version: versionId,
 generator: generatorId,
 formType,
});
 this.eventBus.dispatch("metadataloaded", {
 source: this,
});
},
async _initializePageLabels(pdfDocument) {
const labels = await pdfDocument.getPageLabels();
 if (pdfDocument !== this.pdfDocument) {
 return;
}
 if (!labels || _app_options.AppOptions.get("disablePageLabels")) {
 return;
}
const numLabels = labels.length;
 let standardLabels = 0,
 emptyLabels = 0;
 for (let i = 0; i < numLabels; i++) {
 const label = labels[i];
 if (label === (i + 1).toString()) {
 standardLabels++;
} else if (label === "") {
 emptyLabels++;
} else {
 break;
}
}
 if (standardLabels >= numLabels || emptyLabels >= numLabels) {
 return;
}
const { pdfViewer, toolbar } = this;
 pdfViewer.setPageLabels(labels);
 toolbar.setPagesCount(numLabels, true);
 toolbar.setPageNumber(
 pdfViewer.currentPageNumber,
 pdfViewer.currentPageLabel
);

},
 
 _initializePdfHistory({ fingerprint, viewOnLoad, initialDest = null }) {
 if (!this.pdfHistory) {
 return;
}
 this.pdfHistory.initialize({
 fingerprint,
 resetHistory: viewOnLoad === ViewOnLoad.INITIAL,
 updateUrl: _app_options.AppOptions.get("historyUpdateUrl"),
});
 if (this.pdfHistory.initialBookmark) {
 this.initialBookmark = this.pdfHistory.initialBookmark;
 this.initialRotation = this.pdfHistory.initialRotation;
}
 if (
 initialDest &&
 !this.initialBookmark &&
 viewOnLoad === ViewOnLoad.UNKNOWN
 ) {
 this.initialBookmark = JSON.stringify(initialDest);
 this.pdfHistory.push({
 explicitDest: initialDest,
 pageNumber: null,
});
}
},
 _initializeAnnotationStorageCallbacks(pdfDocument) {
 if (pdfDocument !== this.pdfDocument) {
 return;
}
const { annotationStorage } = pdfDocument;
 annotationStorage.onSetModified = () => {
 window.addEventListener("beforeunload", beforeUnload);
 this._annotationStorageModified = true;
};
 annotationStorage.onResetModified = () => {
 window.removeEventListener("beforeunload", beforeUnload);
 delete this._annotationStorageModified;
};
},
 setInitialView(storedHash, { rotation, scrollMode, spreadMode } = {}) {
const setRotation = (angle) => {
 if ((0, _ui_utils.isValidRotation)(angle)) {
 this.pdfViewer.pagesRotation = angle;
}
};
const setViewerModes = (scroll, spread) => {
 if ((0, _ui_utils.isValidScrollMode)(scroll)) {
 this.pdfViewer.scrollMode = scroll;
}
 if ((0, _ui_utils.isValidSpreadMode)(spread)) {
 this.pdfViewer.spreadMode = spread;
}
};
 this.isInitialViewSet = true;
 setViewerModes(scrollMode, spreadMode);
 if (this.initialBookmark) {
 setRotation(this.initialRotation);
 delete this.initialRotation;
 this.pdfLinkService.setHash(this.initialBookmark);
 this.initialBookmark = null;
} else if (storedHash) {
 setRotation(rotation);
 this.pdfLinkService.setHash(storedHash);
}
 this.toolbar.setPageNumber(
 this.pdfViewer.currentPageNumber,
 this.pdfViewer.currentPageLabel
);
 if (!this.pdfViewer.currentScaleValue) {
 this.pdfViewer.currentScaleValue = _ui_utils.DEFAULT_SCALE_VALUE;
}
},
 _cleanup() {
 if (!this.pdfDocument) {
 return;
}
 this.pdfViewer.cleanup();
 this.pdfDocument.cleanup(
 this.pdfViewer.renderer === _ui_utils.RendererType.SVG
);
},
 bindEvents() {
const { eventBus, _boundEvents } = this;
 eventBus._on("resize", webViewerResize);
 eventBus._on("pagerendered", webViewerPageRendered);
 eventBus._on("updateviewarea", webViewerUpdateViewarea);
 eventBus._on("pagechanging", webViewerPageChanging);
 eventBus._on("scalechanging", webViewerScaleChanging);
 eventBus._on("nextpage", webViewerNextPage);
 eventBus._on("previouspage", webViewerPreviousPage);
 eventBus._on("zoomin", webViewerZoomIn);
 eventBus._on("zoomout", webViewerZoomOut);
 eventBus._on("zoomreset", webViewerZoomReset);
 eventBus._on("pagenumberchanged", webViewerPageNumberChanged);
 eventBus._on("scalechanged", webViewerScaleChanged);
 if (_app_options.AppOptions.get("pdfBug")) {
 _boundEvents.reportPageStatsPDFBug = reportPageStatsPDFBug;
 eventBus._on("pagerendered", _boundEvents.reportPageStatsPDFBug);
 eventBus._on("pagechanging", _boundEvents.reportPageStatsPDFBug);
}
},
 bindWindowEvents() {
const { eventBus, _boundEvents } = this;
 function addWindowResolutionChange(evt = null) {
 if (evt) {
 webViewerResolutionChange(evt);
}
 const mediaQueryList = window.matchMedia(
 `(resolution: ${window.devicePixelRatio || 1}dppx)`
);
 mediaQueryList.addEventListener(
 "change",
 addWindowResolutionChange,
 {
 once: true,
}
);
 _boundEvents.removeWindowResolutionChange ||= function () {
 mediaQueryList.removeEventListener(
 "change",
 addWindowResolutionChange
);
 _boundEvents.removeWindowResolutionChange = null;
};
}
 addWindowResolutionChange();
 _boundEvents.windowResize = () => {
 eventBus.dispatch("resize", {
 source: window,
});
};
 _boundEvents.windowHashChange = () => {
 eventBus.dispatch("hashchange", {
 source: window,
 hash: document.location.hash.substring(1),
});
};
 _boundEvents.windowUpdateFromSandbox = (event) => {
 eventBus.dispatch("updatefromsandbox", {
 source: window,
 detail: event.detail,
});
};
 window.addEventListener(
 "visibilitychange",
 webViewerVisibilityChange
);
 window.addEventListener("wheel", webViewerWheel, {
 passive: false,
});
 window.addEventListener("touchstart", webViewerTouchStart, {
 passive: false,
});
 window.addEventListener("keydown", webViewerKeyDown);
 window.addEventListener("resize", _boundEvents.windowResize);
 window.addEventListener("hashchange", _boundEvents.windowHashChange);
 window.addEventListener(
 "updatefromsandbox",
 _boundEvents.windowUpdateFromSandbox
);
},
 unbindEvents() {
const { eventBus, _boundEvents } = this;
 eventBus._off("resize", webViewerResize);
 eventBus._off("pagerendered", webViewerPageRendered);
 eventBus._off("updateviewarea", webViewerUpdateViewarea);
 eventBus._off("pagechanging", webViewerPageChanging);
 eventBus._off("scalechanging", webViewerScaleChanging);
 eventBus._off("nextpage", webViewerNextPage);
 eventBus._off("previouspage", webViewerPreviousPage);
 eventBus._off("zoomin", webViewerZoomIn);
 eventBus._off("zoomout", webViewerZoomOut);
 eventBus._off("zoomreset", webViewerZoomReset);
 eventBus._off("pagenumberchanged", webViewerPageNumberChanged);
 eventBus._off("scalechanged", webViewerScaleChanged);
 if (_boundEvents.reportPageStatsPDFBug) {
 eventBus._off("pagerendered", _boundEvents.reportPageStatsPDFBug);
 eventBus._off("pagechanging", _boundEvents.reportPageStatsPDFBug);
 _boundEvents.reportPageStatsPDFBug = null;
}
},
 unbindWindowEvents() {
const { _boundEvents } = this;
 window.removeEventListener(
 "visibilitychange",
 webViewerVisibilityChange
);
 window.removeEventListener("wheel", webViewerWheel, {
 passive: false,
});
 window.removeEventListener("touchstart", webViewerTouchStart, {
 passive: false,
});
 window.removeEventListener("keydown", webViewerKeyDown);
 window.removeEventListener("resize", _boundEvents.windowResize);
 window.removeEventListener(
 "hashchange",
 _boundEvents.windowHashChange
);
 window.removeEventListener(
 "updatefromsandbox",
 _boundEvents.windowUpdateFromSandbox
);
 _boundEvents.removeWindowResolutionChange?.();
 _boundEvents.windowResize = null;
 _boundEvents.windowHashChange = null;
 _boundEvents.windowUpdateFromSandbox = null;
},
 accumulateWheelTicks(ticks) {
 if (
 (this._wheelUnusedTicks > 0 && ticks < 0) ||
 (this._wheelUnusedTicks < 0 && ticks > 0)
 ) {
 this._wheelUnusedTicks = 0;
}
 this._wheelUnusedTicks += ticks;
const wholeTicks =
 Math.sign(this._wheelUnusedTicks) *
 Math.floor(Math.abs(this._wheelUnusedTicks));
 this._wheelUnusedTicks -= wholeTicks;
 return wholeTicks;
},
 _unblockDocumentLoadEvent() {
 document.blockUnblockOnload?.(false);
 this._unblockDocumentLoadEvent = () => { };
},
 _reportDocumentStatsTelemetry() {
const { stats } = this.pdfDocument;
 if (stats !== this._docStats) {
 this._docStats = stats;
 this.externalServices.reportTelemetry({
 type: "documentStats",
 stats, });} },
 get scriptingReady() {
 return this.pdfScriptingManager.ready;}, };
 exports.PDFViewerApplication = PDFViewerApplication;
 {
 const HOSTED_VIEWER_ORIGINS = [
 "null",
 "http://mozilla.github.io",
 "https://mozilla.github.io",
 ];
 var validateFileURL = function (file) {
 if (!file) {
 return;
}
 try {
 const viewerOrigin = new URL(window.location.href).origin || "null";
 if (HOSTED_VIEWER_ORIGINS.includes(viewerOrigin)) {
 return; }
} catch (ex) {
 const errorMessage = errorMessages["loading_error"];
 PDFViewerApplication._documentError(errorMessage, {
 message: ex?.message,
});
 throw ex; }};}
 async function loadFakeWorker() {
 _pdfjsLib.GlobalWorkerOptions.workerSrc ||=
 _app_options.AppOptions.get("workerSrc");
 await (0, _pdfjsLib.loadScript)(_pdfjsLib.PDFWorker.workerSrc);
}
 async function loadPDFBug(self) {
 const { debuggerScriptPath } = self.appConfig;
 const { PDFBug } = await import(debuggerScriptPath);
 self._PDFBug = PDFBug;
}
 function reportPageStatsPDFBug({ pageNumber }) {
 if (!globalThis.Stats?.enabled) {
 return;
}
 const pageView = PDFViewerApplication.pdfViewer.getPageView(
 pageNumber - 1
 );
 globalThis.Stats.add(pageNumber, pageView?.pdfPage?.stats);
}
 function webViewerInitialized() {
 const { appConfig, eventBus } = PDFViewerApplication;
 let file;
 const queryString = document.location.search.substring(1);
 const params = (0, _ui_utils.parseQueryString)(queryString);
 file = params.get("file") ?? _app_options.AppOptions.get("defaultUrl");
 validateFileURL(file);
 appConfig.mainContainer.addEventListener("dragover", function (evt) {
 evt.preventDefault();
 evt.dataTransfer.dropEffect =
 evt.dataTransfer.effectAllowed === "copy" ? "copy" : "move";
});
 appConfig.mainContainer.addEventListener("drop", function (evt) {
 evt.preventDefault();
const { files } = evt.dataTransfer;
 if (!files || files.length === 0) {
 return;
}
 eventBus.dispatch("fileinputchange", {
 source: this,
 fileInput: evt.dataTransfer,
});
});
 if (!PDFViewerApplication.supportsDocumentFonts) {
 _app_options.AppOptions.set("disableFontFace", true);
 console.warn("Web Fonts Disabled.");
}
 appConfig.mainContainer.addEventListener(
 "transitionend",
 function (evt) {
 if (evt.target === this) {
 eventBus.dispatch("resize", {
 source: this,
});}},
 true
 );
 try {
 if (file) {
 PDFViewerApplication.open(file);
} else {
 PDFViewerApplication._hideViewBookmark();
}
} catch (reason) {
const errorMessage = errorMessages["loading_error"];
 PDFViewerApplication._documentError(errorMessage, reason);
}}
 function webViewerPageRendered({ pageNumber, error }) {
 if (pageNumber === PDFViewerApplication.page) {
 PDFViewerApplication.toolbar.updateLoadingIndicatorState(false);
}
 if (error) {
const errorMessage = errorMessages["rendering_error"];
 PDFViewerApplication._otherError(errorMessage, error);
}
 PDFViewerApplication._reportDocumentStatsTelemetry();
}
 function webViewerUpdateViewarea({ location }) {
 if (PDFViewerApplication.isInitialViewSet) {
 PDFViewerApplication.store
 ?.setMultiple({
 page: location.pageNumber,
 zoom: location.scale,
 scrollLeft: location.left,
 scrollTop: location.top,
 rotation: location.rotation,
})
 .catch(() => { });
}
 const currentPage = PDFViewerApplication.pdfViewer.getPageView(
 PDFViewerApplication.page - 1
 );
 const loading =
 currentPage?.renderingState !== _ui_utils.RenderingStates.FINISHED;
 PDFViewerApplication.toolbar.updateLoadingIndicatorState(loading);
}
 function webViewerResize() {
 const { pdfDocument, pdfViewer } = PDFViewerApplication;
 pdfViewer.updateContainerHeightCss();
 if (!pdfDocument) {
 return;
}
 const currentScaleValue = pdfViewer.currentScaleValue;
 if (
 currentScaleValue === "auto" ||
 currentScaleValue === "page-fit" ||
 currentScaleValue === "page-width"
 ) {
 pdfViewer.currentScaleValue = currentScaleValue;
}
 pdfViewer.update();
}
 function webViewerNextPage() {
 PDFViewerApplication.pdfViewer.nextPage();
}
 function webViewerPreviousPage() {
 PDFViewerApplication.pdfViewer.previousPage();
}
 function webViewerZoomIn() {
 PDFViewerApplication.zoomIn();
}
 function webViewerZoomOut() {
 PDFViewerApplication.zoomOut();
}
 function webViewerZoomReset() {
 PDFViewerApplication.zoomReset();
}
 function webViewerPageNumberChanged(evt) {
 const pdfViewer = PDFViewerApplication.pdfViewer;
 if (evt.value !== "") {
 PDFViewerApplication.pdfLinkService.goToPage(evt.value);
}
 if (
 evt.value !== pdfViewer.currentPageNumber.toString() &&
 evt.value !== pdfViewer.currentPageLabel
 ) {
 PDFViewerApplication.toolbar.setPageNumber(
 pdfViewer.currentPageNumber,
 pdfViewer.currentPageLabel
); }}
 function webViewerScaleChanged(evt) {
 PDFViewerApplication.pdfViewer.currentScaleValue = evt.value;
}
 function webViewerScaleChanging(evt) {
 PDFViewerApplication.toolbar.setPageScale(evt.presetValue, evt.scale);
 PDFViewerApplication.pdfViewer.update();
}
 function webViewerPageChanging({ pageNumber, pageLabel }) {
 PDFViewerApplication.toolbar.setPageNumber(pageNumber, pageLabel);
}
 function webViewerResolutionChange(evt) {
 PDFViewerApplication.pdfViewer.refresh();
}
 function webViewerVisibilityChange(evt) {
 if (document.visibilityState === "visible") {
 setZoomDisabledTimeout(); }}
 let zoomDisabledTimeout = null;
 function setZoomDisabledTimeout() {
 if (zoomDisabledTimeout) {
 clearTimeout(zoomDisabledTimeout);
}
 zoomDisabledTimeout = setTimeout(function () {
 zoomDisabledTimeout = null;
}, WHEEL_ZOOM_DISABLED_TIMEOUT); }
 function webViewerWheel(evt) {
 const { pdfViewer, supportedMouseWheelZoomModifierKeys } =
 PDFViewerApplication;
 if (
 (evt.ctrlKey && supportedMouseWheelZoomModifierKeys.ctrlKey) ||
 (evt.metaKey && supportedMouseWheelZoomModifierKeys.metaKey)
 ) {
 evt.preventDefault();
 if (zoomDisabledTimeout || document.visibilityState === "hidden") {
 return;
}
const deltaMode = evt.deltaMode;
const delta = (0, _ui_utils.normalizeWheelEventDirection)(evt);
const previousScale = pdfViewer.currentScale;
 let ticks = 0;
 if (
 deltaMode === WheelEvent.DOM_DELTA_LINE ||
 deltaMode === WheelEvent.DOM_DELTA_PAGE
 ) {
 if (Math.abs(delta) >= 1) {
 ticks = Math.sign(delta);
} else {
 ticks = PDFViewerApplication.accumulateWheelTicks(delta);
}} else {
 const PIXELS_PER_LINE_SCALE = 30;
 ticks = PDFViewerApplication.accumulateWheelTicks(
 delta / PIXELS_PER_LINE_SCALE );}
 if (ticks < 0) {
 PDFViewerApplication.zoomOut(-ticks);
} else if (ticks > 0) {
 PDFViewerApplication.zoomIn(ticks);
}
const currentScale = pdfViewer.currentScale;
 if (previousScale !== currentScale) {
 const scaleCorrectionFactor = currentScale / previousScale - 1;
 const rect = pdfViewer.container.getBoundingClientRect();
 const dx = evt.clientX - rect.left;
 const dy = evt.clientY - rect.top;
 pdfViewer.container.scrollLeft += dx * scaleCorrectionFactor;
 pdfViewer.container.scrollTop += dy * scaleCorrectionFactor; }} else {
 setZoomDisabledTimeout(); }}
 function webViewerTouchStart(evt) {
 if (evt.touches.length > 1) {
 evt.preventDefault(); }}
 function webViewerKeyDown(evt) {
 if (PDFViewerApplication.overlayManager.active) {
 return; }
 const { eventBus, pdfViewer } = PDFViewerApplication;
 let handled = false,
 ensureViewerFocused = false;
 const cmd =
 (evt.ctrlKey ? 1 : 0) |
 (evt.altKey ? 2 : 0) |
 (evt.shiftKey ? 4 : 0) |
 (evt.metaKey ? 8 : 0);
 if (cmd === 1 || cmd === 8 || cmd === 5 || cmd === 12) {
 switch (evt.keyCode) {
 case 71:
 if (!PDFViewerApplication.supportsIntegratedFind) {
 const { state } = PDFViewerApplication.findController;
 if (state) {
const eventState = Object.assign(Object.create(null), state, {
 source: window,
 type: "again",
 findPrevious: cmd === 5 || cmd === 12,
});
 eventBus.dispatch("find", eventState);
}
 handled = true;
}
 break;
 case 61:
 case 107:
 case 187:
 case 171:
 PDFViewerApplication.zoomIn();
 handled = true;
 break;
 case 173:
 case 109:
 case 189:
 PDFViewerApplication.zoomOut();
 handled = true;
 break;
 case 48:
 case 96:
 setTimeout(function () {
 PDFViewerApplication.zoomReset();
});
 handled = false;
 break;
 case 38:
 if (PDFViewerApplication.page > 1) {
 PDFViewerApplication.page = 1;
 handled = true;
 ensureViewerFocused = true;
}
 break;
 case 40:
 if (PDFViewerApplication.page < PDFViewerApplication.pagesCount) {
 PDFViewerApplication.page = PDFViewerApplication.pagesCount;
 handled = true;
 ensureViewerFocused = true;
}
 break; }}
 if (cmd === 1 || cmd === 8) {
 switch (evt.keyCode) {
 case 79:
 {
 eventBus.dispatch("openfile", {
 source: window,
});
 handled = true;
}
 break;}}
 if (cmd === 3 || cmd === 10) {
 switch (evt.keyCode) {
 case 71:
 PDFViewerApplication.appConfig.toolbar.pageNumber.select();
 handled = true;
 break; }}
 if (handled) {
 if (ensureViewerFocused) {
 pdfViewer.focus();
}
 evt.preventDefault();
 return;
}
 const curElement = (0, _ui_utils.getActiveOrFocusedElement)();
 const curElementTagName = curElement?.tagName.toUpperCase();
 if (
 curElementTagName === "INPUT" ||
 curElementTagName === "TEXTAREA" ||
 curElementTagName === "SELECT" ||
 curElement?.isContentEditable
 ) {
 if (evt.keyCode !== 27) {
 return; }}
 if (cmd === 0) {
 let turnPage = 0,
 turnOnlyIfPageFit = false;
 switch (evt.keyCode) {
 case 38:
 case 33:
 if (pdfViewer.isVerticalScrollbarEnabled) {
 turnOnlyIfPageFit = true;
}
 turnPage = -1;
 break;
 case 8:
 turnOnlyIfPageFit = true;
 turnPage = -1;
 break;
 case 37:
 if (pdfViewer.isHorizontalScrollbarEnabled) {
 turnOnlyIfPageFit = true;
}
 case 75:
 case 80:
 turnPage = -1;
 break;
 case 40:
 case 34:
 if (pdfViewer.isVerticalScrollbarEnabled) { turnOnlyIfPageFit = true;}
 turnPage = 1;
 break;
 case 13:
 case 32:
 turnOnlyIfPageFit = true;
 turnPage = 1;
 break;
 case 39:
 if (pdfViewer.isHorizontalScrollbarEnabled) {
 turnOnlyIfPageFit = true;}
 case 74:
 case 78:
 turnPage = 1;
 break;
 case 36:
 if (PDFViewerApplication.page > 1) {
 PDFViewerApplication.page = 1;
 handled = true;
 ensureViewerFocused = true;}
 break;
 case 35:
 if (PDFViewerApplication.page < PDFViewerApplication.pagesCount) {
 PDFViewerApplication.page = PDFViewerApplication.pagesCount;
 handled = true;
 ensureViewerFocused = true;}
 break;}
 if (
 turnPage !== 0 &&
 (!turnOnlyIfPageFit || pdfViewer.currentScaleValue === "page-fit")) {
 if (turnPage > 0) {
 pdfViewer.nextPage(); } else {
 pdfViewer.previousPage();}
 handled = true;}}
 if (cmd === 4) {
 switch (evt.keyCode) {
 case 13:
 case 32:
 if (pdfViewer.currentScaleValue !== "page-fit") {
 break;}
 pdfViewer.previousPage();
 handled = true;
 break;}}
 if (!handled) {
 if (
 (evt.keyCode >= 33 && evt.keyCode <= 40) ||
 (evt.keyCode === 32 && curElementTagName !== "BUTTON")) {
 ensureViewerFocused = true;}}
 if (ensureViewerFocused && !pdfViewer.containsElement(curElement)) {
 pdfViewer.focus();
}
 if (handled) {
 evt.preventDefault();}}
 function beforeUnload(evt) {
 evt.preventDefault();
 evt.returnValue = "";
 return false;}},
 (module) => {
 let pdfjsLib;
 if (typeof window !== "undefined" && window["pdfjs-dist/build/pdf"]) {
 pdfjsLib = window["pdfjs-dist/build/pdf"];
} else {
 pdfjsLib = require("../build/pdf.min.js");
}
 module.exports = pdfjsLib;
},
 (__unused_webpack_module, exports) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
 exports.WaitOnType =
 exports.EventBus =
 exports.AutomationEventBus =
 void 0;
 exports.waitOnEventOrTimeout = waitOnEventOrTimeout;
const WaitOnType = {
 EVENT: "event",
 TIMEOUT: "timeout",
};
 exports.WaitOnType = WaitOnType;
 function waitOnEventOrTimeout({ target, name, delay = 0 }) {
 return new Promise(function (resolve, reject) {
 if (
 typeof target !== "object" ||
 !(name && typeof name === "string") ||
 !(Number.isInteger(delay) && delay >= 0)
 ) {
 throw new Error("waitOnEventOrTimeout - invalid parameters.");
}
 function handler(type) {
 if (target instanceof EventBus) {
 target._off(name, eventHandler);
} else {
 target.removeEventListener(name, eventHandler);
}
 if (timeout) {
 clearTimeout(timeout);
}
 resolve(type);
}
const eventHandler = handler.bind(null, WaitOnType.EVENT);
 if (target instanceof EventBus) {
 target._on(name, eventHandler);
} else {
 target.addEventListener(name, eventHandler);
}
const timeoutHandler = handler.bind(null, WaitOnType.TIMEOUT);
const timeout = setTimeout(timeoutHandler, delay);
});}
class EventBus {
 #listeners = Object.create(null);
 on(eventName, listener, options = null) {
 this._on(eventName, listener, {
 external: true,
 once: options?.once,
});
}
 off(eventName, listener, options = null) {
 this._off(eventName, listener, {
 external: true,
 once: options?.once,
});
}
 dispatch(eventName, data) {
const eventListeners = this.#listeners[eventName];
 if (!eventListeners || eventListeners.length === 0) {
 return;
}
 let externalListeners;
 for (const { listener, external, once } of eventListeners.slice(0)) {
 if (once) {
 this._off(eventName, listener);
}
 if (external) {
 (externalListeners ||= []).push(listener);
 continue;
}
 listener(data);
}
 if (externalListeners) {
 for (const listener of externalListeners) {
 listener(data);
}
 externalListeners = null;
}}
 _on(eventName, listener, options = null) {
const eventListeners = (this.#listeners[eventName] ||= []);
 eventListeners.push({
 listener,
 external: options?.external === true,
 once: options?.once === true,
});
}
 _off(eventName, listener, options = null) {
const eventListeners = this.#listeners[eventName];
 if (!eventListeners) {
 return;
}
 for (let i = 0, ii = eventListeners.length; i < ii; i++) {
 if (eventListeners[i].listener === listener) {
 eventListeners.splice(i, 1);
 return;}}}}
 exports.EventBus = EventBus;
class AutomationEventBus extends EventBus {
 dispatch(eventName, data) {
 throw new Error("Not implemented: AutomationEventBus.dispatch");
}
}
 exports.AutomationEventBus = AutomationEventBus;
},
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
},
 (__unused_webpack_module, exports) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
 exports.GrabToPan = void 0;
const CSS_CLASS_GRAB = "grab-to-pan-grab";
class GrabToPan {
 constructor(options) {
 this.element = options.element;
 this.document = options.element.ownerDocument;
 if (typeof options.ignoreTarget === "function") {
 this.ignoreTarget = options.ignoreTarget;
}
 this.onActiveChanged = options.onActiveChanged;
 this.activate = this.activate.bind(this);
 this.deactivate = this.deactivate.bind(this);
 this.toggle = this.toggle.bind(this);
 this._onMouseDown = this.#onMouseDown.bind(this);
 this._onMouseMove = this.#onMouseMove.bind(this);
 this._endPan = this.#endPan.bind(this);
const overlay = (this.overlay = document.createElement("div"));
 overlay.className = "grab-to-pan-grabbing";
}
 activate() {
 if (!this.active) {
 this.active = true;
 this.element.addEventListener("mousedown", this._onMouseDown, true);
 this.element.classList.add(CSS_CLASS_GRAB);
 this.onActiveChanged?.(true);
}
}
 deactivate() {
 if (this.active) {
 this.active = false;
 this.element.removeEventListener(
 "mousedown",
 this._onMouseDown,
 true
);
 this._endPan();
 this.element.classList.remove(CSS_CLASS_GRAB);
 this.onActiveChanged?.(false);
}
}
 toggle() {
 if (this.active) {
 this.deactivate();
} else {
 this.activate();
}
}
 ignoreTarget(node) {
 return node.matches(
 "a[href], a[href] *, input, textarea, button, button *, select, option"
);
}
 #onMouseDown(event) {
 if (event.button !== 0 || this.ignoreTarget(event.target)) {
 return;
}
 if (event.originalTarget) {
 try {
 event.originalTarget.tagName;
} catch (e) {
 return;}}
 this.scrollLeftStart = this.element.scrollLeft;
 this.scrollTopStart = this.element.scrollTop;
 this.clientXStart = event.clientX;
 this.clientYStart = event.clientY;
 this.document.addEventListener("mousemove", this._onMouseMove, true);
 this.document.addEventListener("mouseup", this._endPan, true);
 this.element.addEventListener("scroll", this._endPan, true);
 event.preventDefault();
 event.stopPropagation();
const focusedElement = document.activeElement;
 if (focusedElement && !focusedElement.contains(event.target)) {
 focusedElement.blur();
}
}
 #onMouseMove(event) {
 this.element.removeEventListener("scroll", this._endPan, true);
 if (!(event.buttons & 1)) {
 this._endPan();
 return;
}
const xDiff = event.clientX - this.clientXStart;
const yDiff = event.clientY - this.clientYStart;
const scrollTop = this.scrollTopStart - yDiff;
const scrollLeft = this.scrollLeftStart - xDiff;
 if (this.element.scrollTo) {
 this.element.scrollTo({
 top: scrollTop,
 left: scrollLeft,
 behavior: "instant",
});
} else {
 this.element.scrollTop = scrollTop;
 this.element.scrollLeft = scrollLeft;
}
 if (!this.overlay.parentNode) {
 document.body.append(this.overlay);
}
}
 #endPan() {
 this.element.removeEventListener("scroll", this._endPan, true);
 this.document.removeEventListener(
 "mousemove",
 this._onMouseMove,
 true
);
 this.document.removeEventListener("mouseup", this._endPan, true);
 this.overlay.remove();
}}
 exports.GrabToPan = GrabToPan;
},
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
},
 (__unused_webpack_module, exports) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
 exports.OverlayManager = void 0;
class OverlayManager {
 #overlays = new WeakMap();
 #active = null;
 get active() {
 return this.#active;
}
async register(dialog, canForceClose = false) {
 if (typeof dialog !== "object") {
 throw new Error("Not enough parameters.");
} else if (this.#overlays.has(dialog)) {
 throw new Error("The overlay is already registered.");
}
 this.#overlays.set(dialog, {
 canForceClose,
});
 dialog.addEventListener("cancel", (evt) => {
 this.#active = null;
});
}
async unregister(dialog) {
 if (!this.#overlays.has(dialog)) {
 throw new Error("The overlay does not exist.");
} else if (this.#active === dialog) {
 throw new Error(
 "The overlay cannot be removed while it is active."
);
}
 this.#overlays.delete(dialog);
}
async open(dialog) {
 if (!this.#overlays.has(dialog)) {
 throw new Error("The overlay does not exist.");
} else if (this.#active) {
 if (this.#active === dialog) {
 throw new Error("The overlay is already active.");
} else if (this.#overlays.get(dialog).canForceClose) {
 await this.close(); } else {
 throw new Error("Another overlay is currently active.");
}}
 this.#active = dialog;
 dialog.showModal();
}
async close(dialog = this.#active) {
 if (!this.#overlays.has(dialog)) {
 throw new Error("The overlay does not exist.");
} else if (!this.#active) {
 throw new Error("The overlay is currently not active.");
} else if (this.#active !== dialog) {
 throw new Error("Another overlay is currently active.");
}
 dialog.close();
 this.#active = null;}}
 exports.OverlayManager = OverlayManager;
},
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
var _pdfjsLib = __webpack_require__(5);
},
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
},
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
 exports.BaseTreeViewer = void 0;
var _ui_utils = __webpack_require__(1);
const TREEITEM_OFFSET_TOP = -100;
const TREEITEM_SELECTED_CLASS = "selected";
class BaseTreeViewer {
 constructor(options) {
 if (this.constructor === BaseTreeViewer) {
 throw new Error("Cannot initialize BaseTreeViewer.");
}
 this.container = options.container;
 this.eventBus = options.eventBus;
 this.reset();
}
 reset() {
 this._pdfDocument = null;
 this._lastToggleIsShow = true;
 this._currentTreeItem = null;
 this.container.textContent = "";
 this.container.classList.remove("treeWithDeepNesting");
}
 _dispatchEvent(count) {
 throw new Error("Not implemented: _dispatchEvent");
}
 _bindLink(element, params) {
 throw new Error("Not implemented: _bindLink");
}
 _normalizeTextContent(str) {
 return (0, _ui_utils.removeNullCharacters)(str, true) || "\u2013";
}
 _addToggleButton(div, hidden = false) {
const toggler = document.createElement("div");
 toggler.className = "treeItemToggler";
 if (hidden) {
 toggler.classList.add("treeItemsHidden");
}
 toggler.onclick = (evt) => {
 evt.stopPropagation();
 toggler.classList.toggle("treeItemsHidden");
 if (evt.shiftKey) {
const shouldShowAll =
 !toggler.classList.contains("treeItemsHidden");
 this._toggleTreeItem(div, shouldShowAll);
}
};
 div.prepend(toggler);
}
 _toggleTreeItem(root, show = false) {
 this._lastToggleIsShow = show;
 for (const toggler of root.querySelectorAll(".treeItemToggler")) {
 toggler.classList.toggle("treeItemsHidden", !show);
}
}
 _toggleAllTreeItems() {
 this._toggleTreeItem(this.container, !this._lastToggleIsShow);
}
 _finishRendering(fragment, count, hasAnyNesting = false) {
 if (hasAnyNesting) {
 this.container.classList.add("treeWithDeepNesting");
 this._lastToggleIsShow =
 !fragment.querySelector(".treeItemsHidden");
}
 this.container.append(fragment);
 this._dispatchEvent(count);
}
 render(params) {
 throw new Error("Not implemented: render");
}
 _updateCurrentTreeItem(treeItem = null) {
 if (this._currentTreeItem) {
 this._currentTreeItem.classList.remove(TREEITEM_SELECTED_CLASS);
 this._currentTreeItem = null;
}
 if (treeItem) {
 treeItem.classList.add(TREEITEM_SELECTED_CLASS);
 this._currentTreeItem = treeItem;
}
}
 _scrollToCurrentTreeItem(treeItem) {
 if (!treeItem) {
 return;
}
 let currentNode = treeItem.parentNode;
 while (currentNode && currentNode !== this.container) {
 if (currentNode.classList.contains("treeItem")) {
const toggler = currentNode.firstElementChild;
 toggler?.classList.remove("treeItemsHidden");
}
 currentNode = currentNode.parentNode;
}
 this._updateCurrentTreeItem(treeItem);
 this.container.scrollTo(
 treeItem.offsetLeft,
 treeItem.offsetTop + TREEITEM_OFFSET_TOP
);}}
 exports.BaseTreeViewer = BaseTreeViewer;
},
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
},
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
 exports.PDFFindBar = void 0;
const MATCHES_COUNT_LIMIT = 1000;
class PDFFindBar {
 constructor(options, eventBus) {
 this.opened = false;
 this.bar = options.bar;
 this.eventBus = eventBus;
 this.eventBus._on("resize", this.#adjustWidth.bind(this));
}
 reset() {
 this.updateUIState();
}
 updateResultsCount({ current = 0, total = 0 } = {}) {
const limit = MATCHES_COUNT_LIMIT;
 let matchCountMsg = Promise.resolve("");
 if (total > 0) {
 if (total > limit) {
 matchCountMsg = `You have reached the maximum limit of ${limit} matches.`;
} else {
 matchCountMsg = `${current} of ${total} matches`;
}
}
 matchCountMsg.then((msg) => {
 this.#adjustWidth();
});
}
 open() {
 if (!this.opened) {
 this.opened = true;
 this.bar.classList.remove("hidden");
}
 this.#adjustWidth();
}
 close() {
 if (!this.opened) {
 return;
}
 this.opened = false;
 this.bar.classList.add("hidden");
 this.eventBus.dispatch("findbarclose", {
 source: this,
});
}
 toggle() {
 if (this.opened) {
 this.close();
} else {
 this.open();
}
}
 #adjustWidth() {
 if (!this.opened) {
 return;
}
 this.bar.classList.remove("wrapContainers");
const findbarHeight = this.bar.clientHeight;
const inputContainerHeight = this.bar.firstElementChild.clientHeight;
 if (findbarHeight > inputContainerHeight) {
 this.bar.classList.add("wrapContainers");}}}
 exports.PDFFindBar = PDFFindBar;
},
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
 exports.PDFFindController = exports.FindState = void 0;
var _ui_utils = __webpack_require__(1);
var _pdfjsLib = __webpack_require__(5);
const FindState = {
 FOUND: 0,
 NOT_FOUND: 1,
 WRAPPED: 2,
 PENDING: 3,
};
 exports.FindState = FindState;
const FIND_TIMEOUT = 250;
const MATCH_SCROLL_OFFSET_TOP = -50;
const MATCH_SCROLL_OFFSET_LEFT = -400;
const CHARACTERS_TO_NORMALIZE = {
 "\u2010": "-",
 "\u2018": "'",
 "\u2019": "'",
 "\u201A": "'",
 "\u201B": "'",
 "\u201C": '"',
 "\u201D": '"',
 "\u201E": '"',
 "\u201F": '"',
 "\u00BC": "1/4",
 "\u00BD": "1/2",
 "\u00BE": "3/4",
};
const DIACRITICS_EXCEPTION = new Set([
 0x3099, 0x309a, 0x094d, 0x09cd, 0x0a4d, 0x0acd, 0x0b4d, 0x0bcd, 0x0c4d,
 0x0ccd, 0x0d3b, 0x0d3c, 0x0d4d, 0x0dca, 0x0e3a, 0x0eba, 0x0f84, 0x1039,
 0x103a, 0x1714, 0x1734, 0x17d2, 0x1a60, 0x1b44, 0x1baa, 0x1bab, 0x1bf2,
 0x1bf3, 0x2d7f, 0xa806, 0xa82c, 0xa8c4, 0xa953, 0xa9c0, 0xaaf6, 0xabed,
 0x0c56, 0x0f71, 0x0f72, 0x0f7a, 0x0f7b, 0x0f7c, 0x0f7d, 0x0f80, 0x0f74,
 ]);
 let DIACRITICS_EXCEPTION_STR;
const DIACRITICS_REG_EXP = /\p{M}+/gu;
const SPECIAL_CHARS_REG_EXP =
 /([.*+?^${}()|[\]\\])|(\p{P})|(\s+)|(\p{M})|(\p{L})/gu;
const NOT_DIACRITIC_FROM_END_REG_EXP = /([^\p{M}])\p{M}*$/u;
const NOT_DIACRITIC_FROM_START_REG_EXP = /^\p{M}*([^\p{M}])/u;
const SYLLABLES_REG_EXP =
 /[\uAC00-\uD7AF\uFA6C\uFACF-\uFAD1\uFAD5-\uFAD7]+/g;
const SYLLABLES_LENGTHS = new Map();
const FIRST_CHAR_SYLLABLES_REG_EXP =
 "[\\u1100-\\u1112\\ud7a4-\\ud7af\\ud84a\\ud84c\\ud850\\ud854\\ud857\\ud85f]";
const NFKC_CHARS_TO_NORMALIZE = new Map();
 let noSyllablesRegExp = null;
 let withSyllablesRegExp = null;
 function normalize(text) {
 const syllablePositions = [];
 let m;
 while ((m = SYLLABLES_REG_EXP.exec(text)) !== null) {
 let { index } = m;
 for (const char of m[0]) {
 let len = SYLLABLES_LENGTHS.get(char);
 if (!len) {
 len = char.normalize("NFD").length;
 SYLLABLES_LENGTHS.set(char, len);
}
 syllablePositions.push([len, index++]);
}
}
 let normalizationRegex;
 if (syllablePositions.length === 0 && noSyllablesRegExp) {
 normalizationRegex = noSyllablesRegExp;
} else if (syllablePositions.length > 0 && withSyllablesRegExp) {
 normalizationRegex = withSyllablesRegExp;
} else {
const replace = Object.keys(CHARACTERS_TO_NORMALIZE).join("");
const toNormalizeWithNFKC =
 "\u2460-\u2473" +
 "\u24b6-\u24ff" +
 "\u3244-\u32bf" +
 "\u32d0-\u32fe" +
 "\uff00-\uffef";
const regexp = `([${replace}])|([${toNormalizeWithNFKC}])|(\\p{M}+(?:-\\n)?)|(\\S-\\n)|(\\p{Ideographic}\\n)|(\\n)`;
 if (syllablePositions.length === 0) {
 normalizationRegex = noSyllablesRegExp = new RegExp(
 regexp + "|(\\u0000)",
 "gum"
);
} else {
 normalizationRegex = withSyllablesRegExp = new RegExp(
 regexp + `|(${FIRST_CHAR_SYLLABLES_REG_EXP})`,
 "gum"
);
}
}
 const rawDiacriticsPositions = [];
 while ((m = DIACRITICS_REG_EXP.exec(text)) !== null) {
 rawDiacriticsPositions.push([m[0].length, m.index]);
}
 let normalized = text.normalize("NFD");
 const positions = [[0, 0]];
 let rawDiacriticsIndex = 0;
 let syllableIndex = 0;
 let shift = 0;
 let shiftOrigin = 0;
 let eol = 0;
 let hasDiacritics = false;
 normalized = normalized.replace(
 normalizationRegex,
 (match, p1, p2, p3, p4, p5, p6, p7, i) => {
 i -= shiftOrigin;
 if (p1) {
const replacement = CHARACTERS_TO_NORMALIZE[p1];
const jj = replacement.length;
 for (let j = 1; j < jj; j++) {
 positions.push([i - shift + j, shift - j]);
}
 shift -= jj - 1;
 return replacement;
}
 if (p2) {
 let replacement = NFKC_CHARS_TO_NORMALIZE.get(p2);
 if (!replacement) {
 replacement = p2.normalize("NFKC");
 NFKC_CHARS_TO_NORMALIZE.set(p2, replacement);
}
const jj = replacement.length;
 for (let j = 1; j < jj; j++) {
 positions.push([i - shift + j, shift - j]);
}
 shift -= jj - 1;
 return replacement;
}
 if (p3) {
const hasTrailingDashEOL = p3.endsWith("\n");
const len = hasTrailingDashEOL ? p3.length - 2 : p3.length;
 hasDiacritics = true;
 let jj = len;
 if (i + eol === rawDiacriticsPositions[rawDiacriticsIndex]?.[1]) {
 jj -= rawDiacriticsPositions[rawDiacriticsIndex][0];
 ++rawDiacriticsIndex;
}
 for (let j = 1; j <= jj; j++) {
 positions.push([i - 1 - shift + j, shift - j]);
}
 shift -= jj;
 shiftOrigin += jj;
 if (hasTrailingDashEOL) {
 i += len - 1;
 positions.push([i - shift + 1, 1 + shift]);
 shift += 1;
 shiftOrigin += 1;
 eol += 1;
 return p3.slice(0, len);
}
 return p3;
}
 if (p4) {
 positions.push([i - shift + 1, 1 + shift]);
 shift += 1;
 shiftOrigin += 1;
 eol += 1;
 return p4.charAt(0);
}
 if (p5) {
 positions.push([i - shift + 1, shift]);
 shiftOrigin += 1;
 eol += 1;
 return p5.charAt(0);
}
 if (p6) {
 positions.push([i - shift + 1, shift - 1]);
 shift -= 1;
 shiftOrigin += 1;
 eol += 1;
 return " ";
}
 if (i + eol === syllablePositions[syllableIndex]?.[1]) {
const newCharLen = syllablePositions[syllableIndex][0] - 1;
 ++syllableIndex;
 for (let j = 1; j <= newCharLen; j++) {
 positions.push([i - (shift - j), shift - j]);
}
 shift -= newCharLen;
 shiftOrigin += newCharLen;
}
 return p7;
}
 );
 positions.push([normalized.length, shift]);
 return [normalized, positions, hasDiacritics];
}
class PDFFindController {
 constructor({ linkService, eventBus }) {
 this._linkService = linkService;
 this._eventBus = eventBus;
 this.#reset();
 eventBus._on("find", this.#onFind.bind(this));
 eventBus._on("findbarclose", this.#onFindBarClose.bind(this));
}
 get highlightMatches() {
 return this._highlightMatches;
}
 get pageMatches() {
 return this._pageMatches;
}
 get pageMatchesLength() {
 return this._pageMatchesLength;
}
 get selected() {
 return this._selected;
}
 get state() {
 return this._state;
}
 setDocument(pdfDocument) {
 if (this._pdfDocument) {
 this.#reset();
}
 if (!pdfDocument) {
 return;
}
 this._pdfDocument = pdfDocument;
 this._firstPageCapability.resolve();
}
 #onFind(state) {
 if (!state) {
 return;
}
const pdfDocument = this._pdfDocument;
const { type } = state;
 if (this._state === null || this.#shouldDirtyMatch(state)) {
 this._dirtyMatch = true;
}
 this._state = state;
 if (type !== "highlightallchange") {
 this.#updateUIState(FindState.PENDING);
}
 this._firstPageCapability.promise.then(() => {
 if (
 !this._pdfDocument ||
 (pdfDocument && this._pdfDocument !== pdfDocument)
 ) {
 return;
}
 this.#extractText();
 const findbarClosed = !this._highlightMatches;
 const pendingTimeout = !!this._findTimeout;
 if (this._findTimeout) {
 clearTimeout(this._findTimeout);
 this._findTimeout = null;
}
 if (!type) {
 this._findTimeout = setTimeout(() => {
 this.#nextMatch();
 this._findTimeout = null;
}, FIND_TIMEOUT);
} else if (this._dirtyMatch) {
 this.#nextMatch();
} else if (type === "again") {
 this.#nextMatch();
} else if (type === "highlightallchange") {
 if (pendingTimeout) {
 this.#nextMatch();
} else {
 this._highlightMatches = true;
}
 this.#updateAllPages();
} else {
 this.#nextMatch();
}
});
}
 scrollMatchIntoView({
 element = null,
 selectedLeft = 0,
 pageIndex = -1,
 matchIndex = -1,
}) {
 if (!this._scrollMatches || !element) {
 return;
} else if (
 matchIndex === -1 ||
 matchIndex !== this._selected.matchIdx
 ) {
 return;
} else if (pageIndex === -1 || pageIndex !== this._selected.pageIdx) {
 return;
}
 this._scrollMatches = false;
const spot = {
 top: MATCH_SCROLL_OFFSET_TOP,
 left: selectedLeft + MATCH_SCROLL_OFFSET_LEFT,
};
 (0, _ui_utils.scrollIntoView)(element, spot, true);
}
 #reset() {
 this._highlightMatches = false;
 this._scrollMatches = false;
 this._pdfDocument = null;
 this._pageMatches = [];
 this._pageMatchesLength = [];
 this._state = null;
 this._selected = {
 pageIdx: -1,
 matchIdx: -1,
};
 this._offset = {
 pageIdx: null,
 matchIdx: null,
 wrapped: false,
};
 this._extractTextPromises = [];
 this._pageContents = [];
 this._pageDiffs = [];
 this._hasDiacritics = [];
 this._matchesCountTotal = 0;
 this._pagesToSearch = null;
 this._pendingFindMatches = new Set();
 this._resumePageIdx = null;
 this._dirtyMatch = false;
 clearTimeout(this._findTimeout);
 this._findTimeout = null;
 this._firstPageCapability = (0, _pdfjsLib.createPromiseCapability)();
}
 get #query() {
 if (this._state.query !== this._rawQuery) {
 this._rawQuery = this._state.query;
 [this._normalizedQuery] = normalize(this._state.query);
}
 return this._normalizedQuery;
}
 #shouldDirtyMatch(state) {
 if (state.query !== this._state.query) {
 return true;
}
 switch (state.type) {
 case "again":
const pageNumber = this._selected.pageIdx + 1;
const linkService = this._linkService;
 if (
 pageNumber >= 1 &&
 pageNumber <= linkService.pagesCount &&
 pageNumber !== linkService.page &&
 !linkService.isPageVisible(pageNumber)
 ) {
 return true;
}
 return false;
 case "highlightallchange":
 return false;
}
 return true;
}
 #convertToRegExpString(query, hasDiacritics) {
 let isUnicode = false;
 query = query.replace(
 SPECIAL_CHARS_REG_EXP,
 (match, p1, p2, p3, p4, p5) => {
 if (p1) {
 return `[ ]*\\${p1}[ ]*`;
}
 if (p2) {
 return `[ ]*${p2}[ ]*`;
}
 if (p3) {
 return "[ ]+";
}
 if (p4) {
 return DIACRITICS_EXCEPTION.has(p4.charCodeAt(0)) ? p4 : "";
}
 if (hasDiacritics) {
 isUnicode = true;
 return `${p5}\\p{M}*`;
}
 return p5;
}
);
const trailingSpaces = "[ ]*";
 if (query.endsWith(trailingSpaces)) {
 query = query.slice(0, query.length - trailingSpaces.length);
}
 return [isUnicode, query];
}
 #calculateMatch(pageIndex) {
 let query = this.#query;
 if (query.length === 0) {
 return;
}
const { phraseSearch } = this._state;
const hasDiacritics = this._hasDiacritics[pageIndex];
 let isUnicode = false;
 if (phraseSearch) {
 [isUnicode, query] = this.#convertToRegExpString(
 query,
 hasDiacritics
);
} else {
 const match = query.match(/\S+/g);
 if (match) {
 query = match
 .sort()
 .reverse()
 .map((q) => {
const [isUnicodePart, queryPart] =
 this.#convertToRegExpString(q, hasDiacritics);
 isUnicode ||= isUnicodePart;
 return `(${queryPart})`;
})
 .join("|");
}
}
 if (this._resumePageIdx === pageIndex) {
 this._resumePageIdx = null;
 this.#nextPageMatch();
}
const pageMatchesCount = this._pageMatches[pageIndex].length;
 if (pageMatchesCount > 0) {
 this._matchesCountTotal += pageMatchesCount;
 this.#updateUIResultsCount();
}
}
 #extractText() {
 if (this._extractTextPromises.length > 0) {
 return;
}
 let promise = Promise.resolve();
 for (let i = 0, ii = this._linkService.pagesCount; i < ii; i++) {
 const extractTextCapability = (0,
 _pdfjsLib.createPromiseCapability)();
 this._extractTextPromises[i] = extractTextCapability.promise;
 promise = promise.then(() => {
 return this._pdfDocument
 .getPage(i + 1)
 .then((pdfPage) => {
 return pdfPage.getTextContent();
})
 .then(
 (textContent) => {
 const strBuf = [];
 for (const textItem of textContent.items) {
 strBuf.push(textItem.str);
 if (textItem.hasEOL) {
 strBuf.push("\n");
}
}
 [
 this._pageContents[i],
 this._pageDiffs[i],
 this._hasDiacritics[i],
 ] = normalize(strBuf.join(""));
 extractTextCapability.resolve();
},
 (reason) => {
 console.error(
 `Unable to get text content for page ${i + 1}`,
 reason
 );
 this._pageContents[i] = "";
 this._pageDiffs[i] = null;
 this._hasDiacritics[i] = false;
 extractTextCapability.resolve();
}
);
});
}
}
 #updatePage(index) {
 if (this._scrollMatches && this._selected.pageIdx === index) {
 this._linkService.page = index + 1;
}
}
 #updateAllPages() {
 this._eventBus.dispatch("updatetextlayermatches", {
 source: this,
 pageIndex: -1,
});
}
 #nextMatch() {
const previous = this._state.findPrevious;
const currentPageIndex = this._linkService.page - 1;
const numPages = this._linkService.pagesCount;
 this._highlightMatches = true;
 if (this._dirtyMatch) {
 this._dirtyMatch = false;
 this._selected.pageIdx = this._selected.matchIdx = -1;
 this._offset.pageIdx = currentPageIndex;
 this._offset.matchIdx = null;
 this._offset.wrapped = false;
 this._resumePageIdx = null;
 this._pageMatches.length = 0;
 this._pageMatchesLength.length = 0;
 this._matchesCountTotal = 0;
 this.#updateAllPages();
 for (let i = 0; i < numPages; i++) {
 if (this._pendingFindMatches.has(i)) {
 continue;
}
 this._pendingFindMatches.add(i);
 this._extractTextPromises[i].then(() => {
 this._pendingFindMatches.delete(i);
 this.#calculateMatch(i);
});
}
}
 if (this.#query === "") {
 this.#updateUIState(FindState.FOUND);
 return;
}
 if (this._resumePageIdx) {
 return;
}
const offset = this._offset;
 this._pagesToSearch = numPages;
 if (offset.matchIdx !== null) {
 const numPageMatches = this._pageMatches[offset.pageIdx].length;
 if (
 (!previous && offset.matchIdx + 1 < numPageMatches) ||
 (previous && offset.matchIdx > 0)
 ) {
 offset.matchIdx = previous
 ? offset.matchIdx - 1
 : offset.matchIdx + 1;
 this.#updateMatch(true);
 return;
}
 this.#advanceOffsetPage(previous);
}
 this.#nextPageMatch();
}
 #matchesReady(matches) {
const offset = this._offset;
const numMatches = matches.length;
const previous = this._state.findPrevious;
 if (numMatches) {
 offset.matchIdx = previous ? numMatches - 1 : 0;
 this.#updateMatch(true);
 return true;
}
 this.#advanceOffsetPage(previous);
 if (offset.wrapped) {
 offset.matchIdx = null;
 if (this._pagesToSearch < 0) {
 this.#updateMatch(false);
 return true;
}
}
 return false;
}
 #nextPageMatch() {
 if (this._resumePageIdx !== null) {
 console.error("There can only be one pending page.");
}
 let matches = null;
 do {
 const pageIdx = this._offset.pageIdx;
 matches = this._pageMatches[pageIdx];
 if (!matches) {
 this._resumePageIdx = pageIdx;
 break;
}
} while (!this.#matchesReady(matches));
}
 #advanceOffsetPage(previous) {
const offset = this._offset;
const numPages = this._linkService.pagesCount;
 offset.pageIdx = previous ? offset.pageIdx - 1 : offset.pageIdx + 1;
 offset.matchIdx = null;
 this._pagesToSearch--;
 if (offset.pageIdx >= numPages || offset.pageIdx < 0) {
 offset.pageIdx = previous ? numPages - 1 : 0;
 offset.wrapped = true;
}
}
 #updateMatch(found = false) {
 let state = FindState.NOT_FOUND;
const wrapped = this._offset.wrapped;
 this._offset.wrapped = false;
 if (found) {
 const previousPage = this._selected.pageIdx;
 this._selected.pageIdx = this._offset.pageIdx;
 this._selected.matchIdx = this._offset.matchIdx;
 state = wrapped ? FindState.WRAPPED : FindState.FOUND;
 if (
 previousPage !== -1 &&
 previousPage !== this._selected.pageIdx
 ) {
 this.#updatePage(previousPage);
}
}
 this.#updateUIState(state, this._state.findPrevious);
 if (this._selected.pageIdx !== -1) {
 this._scrollMatches = true;
 this.#updatePage(this._selected.pageIdx);
}
}
 #onFindBarClose(evt) {
const pdfDocument = this._pdfDocument;
 this._firstPageCapability.promise.then(() => {
 if (
 !this._pdfDocument ||
 (pdfDocument && this._pdfDocument !== pdfDocument)
 ) {
 return;
}
 if (this._findTimeout) {
 clearTimeout(this._findTimeout);
 this._findTimeout = null;
}
 if (this._resumePageIdx) {
 this._resumePageIdx = null;
 this._dirtyMatch = true;
}
 this.#updateUIState(FindState.FOUND);
 this._highlightMatches = false;
 this.#updateAllPages();
});
}
 #requestMatchesCount() {
const { pageIdx, matchIdx } = this._selected;
 let current = 0,
 total = this._matchesCountTotal;
 if (matchIdx !== -1) {
 for (let i = 0; i < pageIdx; i++) {
 current += this._pageMatches[i]?.length || 0;
}
 current += matchIdx + 1;
}
 if (current < 1 || current > total) {
 current = total = 0;
}
 return {
 current,
 total,
};
}
 #updateUIResultsCount() {
 this._eventBus.dispatch("updatefindmatchescount", {
 source: this,
 matchesCount: this.#requestMatchesCount(),
});
}
 #updateUIState(state, previous = false) {
 this._eventBus.dispatch("updatefindcontrolstate", {
 source: this,
 state,
 previous,
 matchesCount: this.#requestMatchesCount(),
 rawQuery: this._state?.query ?? null,
});
}
}
 exports.PDFFindController = PDFFindController;
},
 (__unused_webpack_module, exports) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
 exports.CharacterType = void 0;
 exports.getCharacterType = getCharacterType;
const CharacterType = {
 SPACE: 0,
 ALPHA_LETTER: 1,
 PUNCT: 2,
 HAN_LETTER: 3,
 KATAKANA_LETTER: 4,
 HIRAGANA_LETTER: 5,
 HALFWIDTH_KATAKANA_LETTER: 6,
 THAI_LETTER: 7,
};
 exports.CharacterType = CharacterType;
 function isAlphabeticalScript(charCode) {
 return charCode < 0x2e80;
}
 function isAscii(charCode) {
 return (charCode & 0xff80) === 0;
}
 function isAsciiAlpha(charCode) {
 return (
 (charCode >= 0x61 && charCode <= 0x7a) ||
 (charCode >= 0x41 && charCode <= 0x5a)
 );
}
 function isAsciiDigit(charCode) {
 return charCode >= 0x30 && charCode <= 0x39;
}
 function isAsciiSpace(charCode) {
 return (
 charCode === 0x20 ||
 charCode === 0x09 ||
 charCode === 0x0d ||
 charCode === 0x0a
 );
}
 function isHan(charCode) {
 return (
 (charCode >= 0x3400 && charCode <= 0x9fff) ||
 (charCode >= 0xf900 && charCode <= 0xfaff)
 );
}
 function isKatakana(charCode) {
 return charCode >= 0x30a0 && charCode <= 0x30ff;
}
 function isHiragana(charCode) {
 return charCode >= 0x3040 && charCode <= 0x309f;
}
 function isHalfwidthKatakana(charCode) {
 return charCode >= 0xff60 && charCode <= 0xff9f;
}
 function isThai(charCode) {
 return (charCode & 0xff80) === 0x0e00;
}
 function getCharacterType(charCode) {
 if (isAlphabeticalScript(charCode)) {
 if (isAscii(charCode)) {
 if (isAsciiSpace(charCode)) {
 return CharacterType.SPACE;
} else if (
 isAsciiAlpha(charCode) ||
 isAsciiDigit(charCode) ||
 charCode === 0x5f
 ) {
 return CharacterType.ALPHA_LETTER;
}
 return CharacterType.PUNCT;
} else if (isThai(charCode)) {
 return CharacterType.THAI_LETTER;
} else if (charCode === 0xa0) {
 return CharacterType.SPACE;
}
 return CharacterType.ALPHA_LETTER;
}
 if (isHan(charCode)) {
 return CharacterType.HAN_LETTER;
} else if (isKatakana(charCode)) {
 return CharacterType.KATAKANA_LETTER;
} else if (isHiragana(charCode)) {
 return CharacterType.HIRAGANA_LETTER;
} else if (isHalfwidthKatakana(charCode)) {
 return CharacterType.HALFWIDTH_KATAKANA_LETTER;
}
 return CharacterType.ALPHA_LETTER;
}
},
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
 exports.PDFHistory = void 0;
 exports.isDestArraysEqual = isDestArraysEqual;
 exports.isDestHashesEqual = isDestHashesEqual;
var _ui_utils = __webpack_require__(1);
var _event_utils = __webpack_require__(6);
const HASH_CHANGE_TIMEOUT = 1000;
const POSITION_UPDATED_THRESHOLD = 50;
const UPDATE_VIEWAREA_TIMEOUT = 1000;
 function getCurrentHash() {
 return document.location.hash;
}
class PDFHistory {
 constructor({ linkService, eventBus }) {
 this.linkService = linkService;
 this.eventBus = eventBus;
 this._initialized = false;
 this._fingerprint = "";
 this.reset();
 this._boundEvents = null;
 this.eventBus._on("pagesinit", () => {
 this._isPagesLoaded = false;
 this.eventBus._on(
 "pagesloaded",
 (evt) => {
 this._isPagesLoaded = !!evt.pagesCount;
},
 {
 once: true,
}
);
});
}
 initialize({ fingerprint, resetHistory = false, updateUrl = false }) {
 if (!fingerprint || typeof fingerprint !== "string") {
 console.error(
 'PDFHistory.initialize: The "fingerprint" must be a non-empty string.'
);
 return;
}
 if (this._initialized) {
 this.reset();
}
const reInitialized =
 this._fingerprint !== "" && this._fingerprint !== fingerprint;
 this._fingerprint = fingerprint;
 this._updateUrl = updateUrl === true;
 this._initialized = true;
 this._bindEvents();
const state = window.history.state;
 this._popStateInProgress = false;
 this._blockHashChange = 0;
 this._currentHash = getCurrentHash();
 this._numPositionUpdates = 0;
 this._uid = this._maxUid = 0;
 this._destination = null;
 this._position = null;
 if (!this._isValidState(state, true) || resetHistory) {
 const { hash, page, rotation } = this._parseCurrentHash(true);
 if (!hash || reInitialized || resetHistory) {
 this._pushOrReplaceState(null, true);
 return;
}
 this._pushOrReplaceState(
 {
 hash,
 page,
 rotation,
},
 true
);
 return;
}
const destination = state.destination;
 this._updateInternalState(destination, state.uid, true);
 if (destination.rotation !== undefined) {
 this._initialRotation = destination.rotation;
}
 if (destination.dest) {
 this._initialBookmark = JSON.stringify(destination.dest);
 this._destination.page = null;
} else if (destination.hash) {
 this._initialBookmark = destination.hash;
} else if (destination.page) {
 this._initialBookmark = `page=${destination.page}`;
}
}
 reset() {
 if (this._initialized) {
 this._pageHide();
 this._initialized = false;
 this._unbindEvents();
}
 if (this._updateViewareaTimeout) {
 clearTimeout(this._updateViewareaTimeout);
 this._updateViewareaTimeout = null;
}
 this._initialBookmark = null;
 this._initialRotation = null;
}
 push({ namedDest = null, explicitDest, pageNumber }) {
 if (!this._initialized) {
 return;
}
 if (namedDest && typeof namedDest !== "string") {
 console.error(
 "PDFHistory.push: " +
 `"${namedDest}" is not a valid namedDest parameter.`
);
 return;
} else if (!Array.isArray(explicitDest)) {
 console.error(
 "PDFHistory.push: " +
 `"${explicitDest}" is not a valid explicitDest parameter.`
);
 return;
} else if (!this._isValidPage(pageNumber)) {
 if (pageNumber !== null || this._destination) {
 console.error(
 "PDFHistory.push: " +
 `"${pageNumber}" is not a valid pageNumber parameter.`
);
 return;
}
}
const hash = namedDest || JSON.stringify(explicitDest);
 if (!hash) {
 return;
}
 let forceReplace = false;
 if (
 this._destination &&
 (isDestHashesEqual(this._destination.hash, hash) ||
 isDestArraysEqual(this._destination.dest, explicitDest))
 ) {
 if (this._destination.page) {
 return;
}
 forceReplace = true;
}
 if (this._popStateInProgress && !forceReplace) {
 return;
}
 this._pushOrReplaceState(
 {
 dest: explicitDest,
 hash,
 page: pageNumber,
 rotation: this.linkService.rotation,
},
 forceReplace
);
 if (!this._popStateInProgress) {
 this._popStateInProgress = true;
 Promise.resolve().then(() => {
 this._popStateInProgress = false;
});
}
}
 pushPage(pageNumber) {
 if (!this._initialized) {
 return;
}
 if (!this._isValidPage(pageNumber)) {
 console.error(
 `PDFHistory.pushPage: "${pageNumber}" is not a valid page number.`
);
 return;
}
 if (this._destination?.page === pageNumber) {
 return;
}
 if (this._popStateInProgress) {
 return;
}
 this._pushOrReplaceState({
 dest: null,
 hash: `page=${pageNumber}`,
 page: pageNumber,
 rotation: this.linkService.rotation,
});
 if (!this._popStateInProgress) {
 this._popStateInProgress = true;
 Promise.resolve().then(() => {
 this._popStateInProgress = false;
});
}
}
 pushCurrentPosition() {
 if (!this._initialized || this._popStateInProgress) {
 return;
}
 this._tryPushCurrentPosition();
}
 back() {
 if (!this._initialized || this._popStateInProgress) {
 return;
}
const state = window.history.state;
 if (this._isValidState(state) && state.uid > 0) {
 window.history.back();
}
}
 forward() {
 if (!this._initialized || this._popStateInProgress) {
 return;
}
const state = window.history.state;
 if (this._isValidState(state) && state.uid < this._maxUid) {
 window.history.forward();
}
}
 get popStateInProgress() {
 return (
 this._initialized &&
 (this._popStateInProgress || this._blockHashChange > 0)
);
}
 get initialBookmark() {
 return this._initialized ? this._initialBookmark : null;
}
 get initialRotation() {
 return this._initialized ? this._initialRotation : null;
}
 _pushOrReplaceState(destination, forceReplace = false) {
const shouldReplace = forceReplace || !this._destination;
const newState = {
 fingerprint: this._fingerprint,
 uid: shouldReplace ? this._uid : this._uid + 1,
 destination,
};
 this._updateInternalState(destination, newState.uid);
 let newUrl;
 if (this._updateUrl && destination?.hash) {
 const baseUrl = document.location.href.split("#")[0];
 if (!baseUrl.startsWith("file://")) {
 newUrl = `${baseUrl}#${destination.hash}`;
}
}
 if (shouldReplace) {
 window.history.replaceState(newState, "", newUrl);
} else {
 window.history.pushState(newState, "", newUrl);
}
}
 _tryPushCurrentPosition(temporary = false) {
 if (!this._position) {
 return;
}
 let position = this._position;
 if (temporary) {
 position = Object.assign(Object.create(null), this._position);
 position.temporary = true;
}
 if (!this._destination) {
 this._pushOrReplaceState(position);
 return;
}
 if (this._destination.temporary) {
 this._pushOrReplaceState(position, true);
 return;
}
 if (this._destination.hash === position.hash) {
 return;
}
 if (
 !this._destination.page &&
 (POSITION_UPDATED_THRESHOLD <= 0 ||
 this._numPositionUpdates <= POSITION_UPDATED_THRESHOLD)
 ) {
 return;
}
 let forceReplace = false;
 if (
 this._destination.page >= position.first &&
 this._destination.page <= position.page
 ) {
 if (
 this._destination.dest !== undefined ||
 !this._destination.first
 ) {
 return;
}
 forceReplace = true;
}
 this._pushOrReplaceState(position, forceReplace);
}
 _isValidPage(val) {
 return (
 Number.isInteger(val) &&
 val > 0 &&
 val <= this.linkService.pagesCount
);
}
 _isValidState(state, checkReload = false) {
 if (!state) {
 return false;
}
 if (state.fingerprint !== this._fingerprint) {
 if (checkReload) {
 if (
 typeof state.fingerprint !== "string" ||
 state.fingerprint.length !== this._fingerprint.length
 ) {
 return false;
}
const [perfEntry] = performance.getEntriesByType("navigation");
 if (perfEntry?.type !== "reload") {
 return false;
}
} else {
 return false;
}
}
 if (!Number.isInteger(state.uid) || state.uid < 0) {
 return false;
}
 if (
 state.destination === null ||
 typeof state.destination !== "object"
 ) {
 return false;
}
 return true;
}
 _updateInternalState(destination, uid, removeTemporary = false) {
 if (this._updateViewareaTimeout) {
 clearTimeout(this._updateViewareaTimeout);
 this._updateViewareaTimeout = null;
}
 if (removeTemporary && destination?.temporary) {
 delete destination.temporary;
}
 this._destination = destination;
 this._uid = uid;
 this._maxUid = Math.max(this._maxUid, uid);
 this._numPositionUpdates = 0;
}
 _parseCurrentHash(checkNameddest = false) {
const hash = unescape(getCurrentHash()).substring(1);
const params = (0, _ui_utils.parseQueryString)(hash);
const nameddest = params.get("nameddest") || "";
 let page = params.get("page") | 0;
 if (
 !this._isValidPage(page) ||
 (checkNameddest && nameddest.length > 0)
 ) {
 page = null;
}
 return {
 hash,
 page,
 rotation: this.linkService.rotation,
};
}
 _updateViewarea({ location }) {
 if (this._updateViewareaTimeout) {
 clearTimeout(this._updateViewareaTimeout);
 this._updateViewareaTimeout = null;
}
 this._position = {
 hash: location.pdfOpenParams.substring(1),
 page: this.linkService.page,
 first: location.pageNumber,
 rotation: location.rotation,
};
 if (this._popStateInProgress) {
 return;
}
 if (
 POSITION_UPDATED_THRESHOLD > 0 &&
 this._isPagesLoaded &&
 this._destination &&
 !this._destination.page
 ) {
 this._numPositionUpdates++;
}
 if (UPDATE_VIEWAREA_TIMEOUT > 0) {
 this._updateViewareaTimeout = setTimeout(() => {
 if (!this._popStateInProgress) {
 this._tryPushCurrentPosition(true);
}
 this._updateViewareaTimeout = null;
}, UPDATE_VIEWAREA_TIMEOUT);
}
}
 _popState({ state }) {
const newHash = getCurrentHash(),
 hashChanged = this._currentHash !== newHash;
 this._currentHash = newHash;
 if (!state) {
 this._uid++;
 const { hash, page, rotation } = this._parseCurrentHash();
 this._pushOrReplaceState(
 {
 hash,
 page,
 rotation,
},
 true
);
 return;
}
 if (!this._isValidState(state)) {
 return;
}
 this._popStateInProgress = true;
 if (hashChanged) {
 this._blockHashChange++;
 (0, _event_utils.waitOnEventOrTimeout)({
 target: window,
 name: "hashchange",
 delay: HASH_CHANGE_TIMEOUT,
}).then(() => {
 this._blockHashChange--;
});
}
const destination = state.destination;
 this._updateInternalState(destination, state.uid, true);
 if ((0, _ui_utils.isValidRotation)(destination.rotation)) {
 this.linkService.rotation = destination.rotation;
}
 if (destination.dest) {
 this.linkService.goToDestination(destination.dest);
} else if (destination.hash) {
 this.linkService.setHash(destination.hash);
} else if (destination.page) {
 this.linkService.page = destination.page;
}
 Promise.resolve().then(() => {
 this._popStateInProgress = false;
});
}
 _pageHide() {
 if (!this._destination || this._destination.temporary) {
 this._tryPushCurrentPosition();
}
}
 _bindEvents() {
 if (this._boundEvents) {
 return;
}
 this._boundEvents = {
 updateViewarea: this._updateViewarea.bind(this),
 popState: this._popState.bind(this),
 pageHide: this._pageHide.bind(this),
};
 this.eventBus._on("updateviewarea", this._boundEvents.updateViewarea);
 window.addEventListener("popstate", this._boundEvents.popState);
 window.addEventListener("pagehide", this._boundEvents.pageHide);
}
 _unbindEvents() {
 if (!this._boundEvents) {
 return;
}
 this.eventBus._off(
 "updateviewarea",
 this._boundEvents.updateViewarea
);
 window.removeEventListener("popstate", this._boundEvents.popState);
 window.removeEventListener("pagehide", this._boundEvents.pageHide);
 this._boundEvents = null;
}
}
 exports.PDFHistory = PDFHistory;
 function isDestHashesEqual(destHash, pushHash) {
 if (typeof destHash !== "string" || typeof pushHash !== "string") {
 return false;
}
 if (destHash === pushHash) {
 return true;
}
 const nameddest = (0, _ui_utils.parseQueryString)(destHash).get(
 "nameddest"
 );
 if (nameddest === pushHash) {
 return true;
}
 return false;
}
 function isDestArraysEqual(firstDest, secondDest) {
 function isEntryEqual(first, second) {
 if (typeof first !== typeof second) {
 return false;
}
 if (Array.isArray(first) || Array.isArray(second)) {
 return false;
}
 if (first !== null && typeof first === "object" && second !== null) {
 if (Object.keys(first).length !== Object.keys(second).length) {
 return false;
}
 for (const key in first) {
 if (!isEntryEqual(first[key], second[key])) {
 return false;
}
}
 return true;
}
 return (
 first === second || (Number.isNaN(first) && Number.isNaN(second))
);
}
 if (!(Array.isArray(firstDest) && Array.isArray(secondDest))) {
 return false;
}
 if (firstDest.length !== secondDest.length) {
 return false;
}
 for (let i = 0, ii = firstDest.length; i < ii; i++) {
 if (!isEntryEqual(firstDest[i], secondDest[i])) {
 return false;
}
}
 return true;
}
},
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
},
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
},
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});

 
},
 
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
 exports.PDFRenderingQueue = void 0;
var _pdfjsLib = __webpack_require__(5);
var _ui_utils = __webpack_require__(1);
const CLEANUP_TIMEOUT = 30000;
class PDFRenderingQueue {
 constructor() {
 this.pdfViewer = null;
 this.onIdle = null;
 this.highestPriorityPage = null;
 this.idleTimeout = null;
}
 setViewer(pdfViewer) {
 this.pdfViewer = pdfViewer;
}
 isHighestPriority(view) {
 return this.highestPriorityPage === view.renderingId;
}
 hasViewer() {
 return !!this.pdfViewer;
}
 renderHighestPriority(currentlyVisiblePages) {
 if (this.idleTimeout) {
 clearTimeout(this.idleTimeout);
 this.idleTimeout = null;
}
 if (this.pdfViewer.forceRendering(currentlyVisiblePages)) {
 return;
}
 if (this.onIdle) {
 this.idleTimeout = setTimeout(
 this.onIdle.bind(this),
 CLEANUP_TIMEOUT
);
}
}
 getHighestPriority(
 visible,
 views,
 scrolledDown,
 preRenderExtra = false
 ) {
const visibleViews = visible.views,
 numVisible = visibleViews.length;
 if (numVisible === 0) {
 return null;
}
 for (let i = 0; i < numVisible; i++) {
 const view = visibleViews[i].view;
 if (!this.isViewFinished(view)) {
 return view;
}
}
const firstId = visible.first.id,
 lastId = visible.last.id;
 if (lastId - firstId + 1 > numVisible) {
 const visibleIds = visible.ids;
 for (let i = 1, ii = lastId - firstId; i < ii; i++) {
const holeId = scrolledDown ? firstId + i : lastId - i;
 if (visibleIds.has(holeId)) {
 continue;
}
const holeView = views[holeId - 1];
 if (!this.isViewFinished(holeView)) {
 return holeView;
}
}
}
 let preRenderIndex = scrolledDown ? lastId : firstId - 2;
 let preRenderView = views[preRenderIndex];
 if (preRenderView && !this.isViewFinished(preRenderView)) {
 return preRenderView;
}
 if (preRenderExtra) {
 preRenderIndex += scrolledDown ? 1 : -1;
 preRenderView = views[preRenderIndex];
 if (preRenderView && !this.isViewFinished(preRenderView)) {
 return preRenderView;
}
}
 return null;
}
 isViewFinished(view) {
 return view.renderingState === _ui_utils.RenderingStates.FINISHED;
}
 renderView(view) {
 switch (view.renderingState) {
 case _ui_utils.RenderingStates.FINISHED:
 return false;
 case _ui_utils.RenderingStates.PAUSED:
 this.highestPriorityPage = view.renderingId;
 view.resume();
 break;
 case _ui_utils.RenderingStates.RUNNING:
 this.highestPriorityPage = view.renderingId;
 break;
 case _ui_utils.RenderingStates.INITIAL:
 this.highestPriorityPage = view.renderingId;
 view
 .draw()
 .finally(() => {
 this.renderHighestPriority();
})
 .catch((reason) => {
 if (reason instanceof _pdfjsLib.RenderingCancelledException) {
 return;
}
 console.error(`renderView: "${reason}"`);
});
 break;
}
 return true;
}
}
 exports.PDFRenderingQueue = PDFRenderingQueue;
},
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
 exports.PDFScriptingManager = void 0;
var _ui_utils = __webpack_require__(1);
var _pdfjsLib = __webpack_require__(5);
class PDFScriptingManager {
 constructor({
 eventBus,
 sandboxBundleSrc = null,
 scriptingFactory = null,
 docPropertiesLookup = null,
}) {
 this._pdfDocument = null;
 this._pdfViewer = null;
 this._closeCapability = null;
 this._destroyCapability = null;
 this._scripting = null;
 this._mouseState = Object.create(null);
 this._ready = false;
 this._eventBus = eventBus;
 this._sandboxBundleSrc = sandboxBundleSrc;
 this._scriptingFactory = scriptingFactory;
 this._docPropertiesLookup = docPropertiesLookup;
}
 setViewer(pdfViewer) {
 this._pdfViewer = pdfViewer;
}
async setDocument(pdfDocument) {
 if (this._pdfDocument) {
 await this._destroyScripting();
}
 this._pdfDocument = pdfDocument;
 if (!pdfDocument) {
 return;
}
const [objects, calculationOrder, docActions] = await Promise.all([
 pdfDocument.getFieldObjects(),
 pdfDocument.getCalculationOrderIds(),
 pdfDocument.getJSActions(),
 ]);
 if (!objects && !docActions) {
 await this._destroyScripting();
 return;
}
 if (pdfDocument !== this._pdfDocument) {
 return;
}
 try {
 this._scripting = this._createScripting();
} catch (error) {
 console.error(
 `PDFScriptingManager.setDocument: "${error?.message}".`
);
 await this._destroyScripting();
 return;
}
 this._internalEvents.set("updatefromsandbox", (event) => {
 if (event?.source !== window) {
 return;
}
 this._updateFromSandbox(event.detail);
});
 this._internalEvents.set("dispatcheventinsandbox", (event) => {
 this._scripting?.dispatchEventInSandbox(event.detail);
});
 this._internalEvents.set(
 "pagechanging",
 ({ pageNumber, previous }) => {
 if (pageNumber === previous) {
 return;
}
 this._dispatchPageClose(previous);
 this._dispatchPageOpen(pageNumber);
}
);
 this._internalEvents.set("pagerendered", ({ pageNumber }) => {
 if (!this._pageOpenPending.has(pageNumber)) {
 return;
}
 if (pageNumber !== this._pdfViewer.currentPageNumber) {
 return;
}
 this._dispatchPageOpen(pageNumber);
});
 this._internalEvents.set("pagesdestroy", async (event) => {
 await this._dispatchPageClose(this._pdfViewer.currentPageNumber);
 await this._scripting?.dispatchEventInSandbox({
 id: "doc",
 name: "WillClose",
});
 this._closeCapability?.resolve();
});
 this._domEvents.set("mousedown", (event) => {
 this._mouseState.isDown = true;
});
 this._domEvents.set("mouseup", (event) => {
 this._mouseState.isDown = false;
});
 for (const [name, listener] of this._internalEvents) {
 this._eventBus._on(name, listener);
}
 for (const [name, listener] of this._domEvents) {
 window.addEventListener(name, listener, true);
}
 try {
 const docProperties = await this._getDocProperties();
 if (pdfDocument !== this._pdfDocument) {
 return;
}
 await this._scripting.createSandbox({
 objects,
 calculationOrder,
 appInfo: {
 platform: navigator.platform,
 language: navigator.language,
},
 docInfo: {
 ...docProperties,
 actions: docActions,
},
});
 this._eventBus.dispatch("sandboxcreated", {
 source: this,
});
} catch (error) {
 console.error(
 `PDFScriptingManager.setDocument: "${error?.message}".`
);
 await this._destroyScripting();
 return;
}
 await this._scripting?.dispatchEventInSandbox({
 id: "doc",
 name: "Open",
});
 await this._dispatchPageOpen(this._pdfViewer.currentPageNumber, true);
 Promise.resolve().then(() => {
 if (pdfDocument === this._pdfDocument) {
 this._ready = true;
}
});
}
 get mouseState() {
 return this._mouseState;
}
 get destroyPromise() {
 return this._destroyCapability?.promise || null;
}
 get ready() {
 return this._ready;
}
 get _internalEvents() {
 return (0, _pdfjsLib.shadow)(this, "_internalEvents", new Map());
}
 get _domEvents() {
 return (0, _pdfjsLib.shadow)(this, "_domEvents", new Map());
}
 get _pageOpenPending() {
 return (0, _pdfjsLib.shadow)(this, "_pageOpenPending", new Set());
}
 get _visitedPages() {
 return (0, _pdfjsLib.shadow)(this, "_visitedPages", new Map());
}
async _updateFromSandbox(detail) {
const { id, siblings, command, value } = detail;
 if (!id) {
 switch (command) {
 case "clear":
 console.clear();
 break;
 case "error":
 console.error(value);
 break;
 case "layout":
 const modes = (0, _ui_utils.apiPageLayoutToViewerModes)(value);
 this._pdfViewer.spreadMode = modes.spreadMode;
 break;
 case "page-num":
 this._pdfViewer.currentPageNumber = value + 1;
 break;
 case "zoom":
 this._pdfViewer.currentScaleValue = value;
 break;
 case "FirstPage":
 this._pdfViewer.currentPageNumber = 1;
 break;
 case "LastPage":
 this._pdfViewer.currentPageNumber = this._pdfViewer.pagesCount;
 break;
 case "NextPage":
 this._pdfViewer.nextPage();
 break;
 case "PrevPage":
 this._pdfViewer.previousPage();
 break;
 case "ZoomViewIn":
 this._pdfViewer.increaseScale();
 break;
 case "ZoomViewOut":
 this._pdfViewer.decreaseScale();
 break;
}
 return;
}
 delete detail.id;
 delete detail.siblings;
const ids = siblings ? [id, ...siblings] : [id];
 for (const elementId of ids) {
 const element = document.querySelector(
 `[data-element-id="${elementId}"]`
);
 if (element) {
 element.dispatchEvent(
 new CustomEvent("updatefromsandbox", {
 detail,
})
);
} else {
 this._pdfDocument?.annotationStorage.setValue(elementId, detail);
}
}
}
async _dispatchPageOpen(pageNumber, initialize = false) {
const pdfDocument = this._pdfDocument,
 visitedPages = this._visitedPages;
 if (initialize) {
 this._closeCapability = (0, _pdfjsLib.createPromiseCapability)();
}
 if (!this._closeCapability) {
 return;
}
const pageView = this._pdfViewer.getPageView(pageNumber - 1);
 if (pageView?.renderingState !== _ui_utils.RenderingStates.FINISHED) {
 this._pageOpenPending.add(pageNumber);
 return;
}
 this._pageOpenPending.delete(pageNumber);
const actionsPromise = (async () => {
 const actions = await (!visitedPages.has(pageNumber)
 ? pageView.pdfPage?.getJSActions()
 : null);
 if (pdfDocument !== this._pdfDocument) {
 return;
}
 await this._scripting?.dispatchEventInSandbox({
 id: "page",
 name: "PageOpen",
 pageNumber,
 actions,
});
})();
 visitedPages.set(pageNumber, actionsPromise);
}
async _dispatchPageClose(pageNumber) {
const pdfDocument = this._pdfDocument,
 visitedPages = this._visitedPages;
 if (!this._closeCapability) {
 return;
}
 if (this._pageOpenPending.has(pageNumber)) {
 return;
}
const actionsPromise = visitedPages.get(pageNumber);
 if (!actionsPromise) {
 return;
}
 visitedPages.set(pageNumber, null);
 await actionsPromise;
 if (pdfDocument !== this._pdfDocument) {
 return;
}
 await this._scripting?.dispatchEventInSandbox({
 id: "page",
 name: "PageClose",
 pageNumber,
});
}
async _getDocProperties() {
 if (this._docPropertiesLookup) {
 return this._docPropertiesLookup(this._pdfDocument);
}
 throw new Error("_getDocProperties: Unable to lookup properties.");
}
 _createScripting() {
 this._destroyCapability = (0, _pdfjsLib.createPromiseCapability)();
 if (this._scripting) {
 throw new Error("_createScripting: Scripting already exists.");
}
 if (this._scriptingFactory) {
 return this._scriptingFactory.createScripting({
 sandboxBundleSrc: this._sandboxBundleSrc,
});
}
 throw new Error("_createScripting: Cannot create scripting.");
}
async _destroyScripting() {
 if (!this._scripting) {
 this._pdfDocument = null;
 this._destroyCapability?.resolve();
 return;
}
 if (this._closeCapability) {
 await Promise.race([
 this._closeCapability.promise,
 new Promise((resolve) => {
 setTimeout(resolve, 1000);
}),
 ]).catch((reason) => { });
 this._closeCapability = null;
}
 this._pdfDocument = null;
 try {
 await this._scripting.destroySandbox();
} catch (ex) { }
 for (const [name, listener] of this._internalEvents) {
 this._eventBus._off(name, listener);
}
 this._internalEvents.clear();
 for (const [name, listener] of this._domEvents) {
 window.removeEventListener(name, listener, true);
}
 this._domEvents.clear();
 this._pageOpenPending.clear();
 this._visitedPages.clear();
 this._scripting = null;
 delete this._mouseState.isDown;
 this._ready = false;
 this._destroyCapability?.resolve();
}
}
 exports.PDFScriptingManager = PDFScriptingManager;
},
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
},
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
},
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
},
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
 exports.TempImageFactory = void 0;
class TempImageFactory {
static #tempCanvas = null;
static getCanvas(width, height) {
const tempCanvas = (this.#tempCanvas ||=
 document.createElement("canvas"));
 tempCanvas.width = width;
 tempCanvas.height = height;
const ctx = tempCanvas.getContext("2d", {
 alpha: false,
});
 ctx.save();
 ctx.fillStyle = "rgb(255, 255, 255)";
 ctx.fillRect(0, 0, width, height);
 ctx.restore();
 return [tempCanvas, tempCanvas.getContext("2d")];
}
static destroyCanvas() {
const tempCanvas = this.#tempCanvas;
 if (tempCanvas) {
 tempCanvas.width = 0;
 tempCanvas.height = 0;
}
 this.#tempCanvas = null;
}
}
 exports.TempImageFactory = TempImageFactory;

 
},
 
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
 exports.PagesCountLimit =
 exports.PDFViewer =
 exports.PDFPageViewBuffer =
 void 0;
var _pdfjsLib = __webpack_require__(5);
var _ui_utils = __webpack_require__(1);
var _pdf_page_view = __webpack_require__(32);
var _pdf_rendering_queue = __webpack_require__(22);
var _pdf_link_service = __webpack_require__(3);
var _struct_tree_layer_builder = __webpack_require__(34);
var _text_layer_builder = __webpack_require__(36);
var _xfa_layer_builder = __webpack_require__(37);
const DEFAULT_CACHE_SIZE = 10;
const ENABLE_PERMISSIONS_CLASS = "enablePermissions";
const PagesCountLimit = {
 FORCE_SCROLL_MODE_PAGE: 15000,
 FORCE_LAZY_PAGE_INIT: 7500,
 PAUSE_EAGER_PAGE_INIT: 250,
};
 exports.PagesCountLimit = PagesCountLimit;
class PDFPageViewBuffer {
 #buf = new Set();
 #size = 0;
 constructor(size) {
 this.#size = size;
}
 push(view) {
const buf = this.#buf;
 if (buf.has(view)) {
 buf.delete(view);
}
 buf.add(view);
 if (buf.size > this.#size) {
 this.#destroyFirstView();
}
}
 resize(newSize, idsToKeep = null) {
 this.#size = newSize;
const buf = this.#buf;
 if (idsToKeep) {
 const ii = buf.size;
 let i = 1;
 for (const view of buf) {
 if (idsToKeep.has(view.id)) {
 buf.delete(view);
 buf.add(view);
}
 if (++i > ii) {
 break;
}
}
}
 while (buf.size > this.#size) {
 this.#destroyFirstView();
}
}
 has(view) {
 return this.#buf.has(view);
}
 [Symbol.iterator]() {
 return this.#buf.keys();
}
 #destroyFirstView() {
const firstView = this.#buf.keys().next().value;
 firstView?.destroy();
 this.#buf.delete(firstView);
}
}
 exports.PDFPageViewBuffer = PDFPageViewBuffer;
class PDFViewer {
 #buffer = null;
 #annotationMode = _pdfjsLib.AnnotationMode.ENABLE_FORMS;
 #enablePermissions = false;
 #previousContainerHeight = 0;
 #scrollModePageState = null;
 #onVisibilityChange = null;
 constructor(options) {
const viewerVersion = "3.1.81";
 if (_pdfjsLib.version !== viewerVersion) {
 throw new Error(
 `The API version "${_pdfjsLib.version}" does not match the Viewer version "${viewerVersion}".`
);
}
 this.container = options.container;
 this.viewer = options.viewer || options.container.firstElementChild;
 if (
 !(
 this.container?.tagName.toUpperCase() === "DIV" &&
 this.viewer?.tagName.toUpperCase() === "DIV"
 )
 ) {
 throw new Error("Invalid `container` and/or `viewer` option.");
}
 if (
 this.container.offsetParent &&
 getComputedStyle(this.container).position !== "absolute"
 ) {
 throw new Error("The `container` must be absolutely positioned.");
}
 this.eventBus = options.eventBus;
 this.linkService =
 options.linkService || new _pdf_link_service.SimpleLinkService();
 this.findController = options.findController || null;
 this._scriptingManager = options.scriptingManager || null;
 this.removePageBorders = options.removePageBorders || false;
 this.textLayerMode =
 options.textLayerMode ?? _ui_utils.TextLayerMode.ENABLE;
 this.#annotationMode =
 options.annotationMode ?? _pdfjsLib.AnnotationMode.ENABLE_FORMS;
 this.imageResourcesPath = options.imageResourcesPath || "";
 this.renderer = options.renderer || _ui_utils.RendererType.CANVAS;
 this.useOnlyCssZoom = options.useOnlyCssZoom || false;
 this.maxCanvasPixels = options.maxCanvasPixels;
 this.#enablePermissions = options.enablePermissions || false;
 this.pageColors = options.pageColors || null;
 if (
 this.pageColors &&
 !(
 CSS.supports("color", this.pageColors.background) &&
 CSS.supports("color", this.pageColors.foreground)
 )
 ) {
 if (this.pageColors.background || this.pageColors.foreground) {
 console.warn(
 "PDFViewer: Ignoring `pageColors`-option, since the browser doesn't support the values used."
);
}
 this.pageColors = null;
}
 this.defaultRenderingQueue = !options.renderingQueue;
 if (this.defaultRenderingQueue) {
 this.renderingQueue = new _pdf_rendering_queue.PDFRenderingQueue();
 this.renderingQueue.setViewer(this);
} else {
 this.renderingQueue = options.renderingQueue;
}
 this.scroll = (0, _ui_utils.watchScroll)(
 this.container,
 this._scrollUpdate.bind(this)
);
 this._resetView();
 if (this.removePageBorders) {
 this.viewer.classList.add("removePageBorders");
}
 this.updateContainerHeightCss();
}
 get pagesCount() {
 return this._pages.length;
}
 getPageView(index) {
 return this._pages[index];
}
 get pageViewsReady() {
 if (!this._pagesCapability.settled) {
 return false;
}
 return this._pages.every(function (pageView) {
 return pageView?.pdfPage;
});
}
 get renderForms() {
 return this.#annotationMode === _pdfjsLib.AnnotationMode.ENABLE_FORMS;
}
 get enableScripting() {
 return !!this._scriptingManager;
}
 get currentPageNumber() {
 return this._currentPageNumber;
}
 set currentPageNumber(val) {
 if (!Number.isInteger(val)) {
 throw new Error("Invalid page number.");
}
 if (!this.pdfDocument) {
 return;
}
 if (!this._setCurrentPageNumber(val, true)) {
 console.error(`currentPageNumber: "${val}" is not a valid page.`);
}
}
 _setCurrentPageNumber(val, resetCurrentPageView = false) {
 if (this._currentPageNumber === val) {
 if (resetCurrentPageView) {
 this.#resetCurrentPageView();
}
 return true;
}
 if (!(0 < val && val <= this.pagesCount)) {
 return false;
}
const previous = this._currentPageNumber;
 this._currentPageNumber = val;
 this.eventBus.dispatch("pagechanging", {
 source: this,
 pageNumber: val,
 pageLabel: this._pageLabels?.[val - 1] ?? null,
 previous,
});
 if (resetCurrentPageView) {
 this.#resetCurrentPageView();
}
 return true;
}
 get currentPageLabel() {
 return this._pageLabels?.[this._currentPageNumber - 1] ?? null;
}
 set currentPageLabel(val) {
 if (!this.pdfDocument) {
 return;
}
 let page = val | 0;
 if (this._pageLabels) {
 const i = this._pageLabels.indexOf(val);
 if (i >= 0) {
 page = i + 1;
}
}
 if (!this._setCurrentPageNumber(page, true)) {
 console.error(`currentPageLabel: "${val}" is not a valid page.`);
}
}
 get currentScale() {
 return this._currentScale !== _ui_utils.UNKNOWN_SCALE
 ? this._currentScale
 : _ui_utils.DEFAULT_SCALE;
}
 set currentScale(val) {
 if (isNaN(val)) {
 throw new Error("Invalid numeric scale.");
}
 if (!this.pdfDocument) {
 return;
}
 this._setScale(val, false);
}
 get currentScaleValue() {
 return this._currentScaleValue;
}
 set currentScaleValue(val) {
 if (!this.pdfDocument) {
 return;
}
 this._setScale(val, false);
}
 get firstPagePromise() {
 return this.pdfDocument ? this._firstPageCapability.promise : null;
}
 get onePageRendered() {
 return this.pdfDocument
 ? this._onePageRenderedCapability.promise
 : null;
}
 get pagesPromise() {
 return this.pdfDocument ? this._pagesCapability.promise : null;
}
 #initializePermissions(permissions) {
const params = {
 annotationMode: this.#annotationMode,
 textLayerMode: this.textLayerMode,
};
 if (!permissions) {
 return params;
}
 if (!permissions.includes(_pdfjsLib.PermissionFlag.COPY)) {
 this.viewer.classList.add(ENABLE_PERMISSIONS_CLASS);
}
 if (
 !permissions.includes(
 _pdfjsLib.PermissionFlag.MODIFY_ANNOTATIONS
 ) &&
 !permissions.includes(
 _pdfjsLib.PermissionFlag.FILL_INTERACTIVE_FORMS
 ) &&
 this.#annotationMode === _pdfjsLib.AnnotationMode.ENABLE_FORMS
 ) {
 params.annotationMode = _pdfjsLib.AnnotationMode.ENABLE;
}
 return params;
}
 #onePageRenderedOrForceFetch() {
 if (
 document.visibilityState === "hidden" ||
 !this.container.offsetParent ||
 this._getVisiblePages().views.length === 0
 ) {
 return Promise.resolve();
}
const visibilityChangePromise = new Promise((resolve) => {
 this.#onVisibilityChange = () => {
 if (document.visibilityState !== "hidden") {
 return;
}
 resolve();
 document.removeEventListener(
 "visibilitychange",
 this.#onVisibilityChange
);
 this.#onVisibilityChange = null;
};
 document.addEventListener(
 "visibilitychange",
 this.#onVisibilityChange
);
});
 return Promise.race([
 this._onePageRenderedCapability.promise,
 visibilityChangePromise,
 ]);
}
 setDocument(pdfDocument) {
 if (this.pdfDocument) {
 this.eventBus.dispatch("pagesdestroy", {
 source: this,
});
 this._cancelRendering();
 this._resetView();
 this.findController?.setDocument(null);
 this._scriptingManager?.setDocument(null);
}
 this.pdfDocument = pdfDocument;
 if (!pdfDocument) {
 return;
}
const isPureXfa = pdfDocument.isPureXfa;
const pagesCount = pdfDocument.numPages;
const firstPagePromise = pdfDocument.getPage(1);
const optionalContentConfigPromise =
 pdfDocument.getOptionalContentConfig();
const permissionsPromise = this.#enablePermissions
 ? pdfDocument.getPermissions()
 : Promise.resolve();
 if (pagesCount > PagesCountLimit.FORCE_SCROLL_MODE_PAGE) {
 console.warn(
 "Forcing PAGE-scrolling for performance reasons, given the length of the document."
);
 const mode = (this._scrollMode = _ui_utils.ScrollMode.PAGE);
 this.eventBus.dispatch("scrollmodechanged", {
 source: this,
 mode,
});
}
 this._pagesCapability.promise.then(
 () => {
 this.eventBus.dispatch("pagesloaded", {
 source: this,
 pagesCount,
});
},
 () => { }
);
 Promise.all([firstPagePromise, permissionsPromise])
 .then(([firstPdfPage, permissions]) => {
 if (pdfDocument !== this.pdfDocument) {
 return;
}
 this._firstPageCapability.resolve(firstPdfPage);
 this._optionalContentConfigPromise = optionalContentConfigPromise;
const { annotationMode, textLayerMode } =
 this.#initializePermissions(permissions);
const viewerElement =
 this._scrollMode === _ui_utils.ScrollMode.PAGE
 ? null
 : this.viewer;
const scale = this.currentScale;
const viewport = firstPdfPage.getViewport({
 scale: scale * _pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS,
});
const textLayerFactory =
 textLayerMode !== _ui_utils.TextLayerMode.DISABLE && !isPureXfa
 ? this
 : null;
const xfaLayerFactory = isPureXfa ? this : null;
 for (let pageNum = 1; pageNum <= pagesCount; ++pageNum) {
 const pageView = new _pdf_page_view.PDFPageView({
 container: viewerElement,
 eventBus: this.eventBus,
 id: pageNum,
 scale,
 defaultViewport: viewport.clone(),
 optionalContentConfigPromise,
 renderingQueue: this.renderingQueue,
 textLayerFactory,
 textLayerMode,
 annotationMode,
 xfaLayerFactory,
 textHighlighterFactory: this,
 structTreeLayerFactory: this,
 imageResourcesPath: this.imageResourcesPath,
 renderer: this.renderer,
 useOnlyCssZoom: this.useOnlyCssZoom,
 maxCanvasPixels: this.maxCanvasPixels,
 pageColors: this.pageColors,
});
 this._pages.push(pageView);
}
const firstPageView = this._pages[0];
 if (firstPageView) {
 firstPageView.setPdfPage(firstPdfPage);
 this.linkService.cachePageRef(1, firstPdfPage.ref);
}
 if (this._scrollMode === _ui_utils.ScrollMode.PAGE) {
 this.#ensurePageViewVisible();
} else if (this._spreadMode !== _ui_utils.SpreadMode.NONE) {
 this._updateSpreadMode();
}
 this.#onePageRenderedOrForceFetch().then(async () => {
 this.findController?.setDocument(pdfDocument);
 this._scriptingManager?.setDocument(pdfDocument);
 if (
 pdfDocument.loadingParams.disableAutoFetch ||
 pagesCount > PagesCountLimit.FORCE_LAZY_PAGE_INIT
 ) {
 this._pagesCapability.resolve();
 return;
}
 let getPagesLeft = pagesCount - 1;
 if (getPagesLeft <= 0) {
 this._pagesCapability.resolve();
 return;
}
 for (let pageNum = 2; pageNum <= pagesCount; ++pageNum) {
const promise = pdfDocument.getPage(pageNum).then(
 (pdfPage) => {
const pageView = this._pages[pageNum - 1];
 if (!pageView.pdfPage) {
 pageView.setPdfPage(pdfPage);
}
 this.linkService.cachePageRef(pageNum, pdfPage.ref);
 if (--getPagesLeft === 0) {
 this._pagesCapability.resolve();
}
},
 (reason) => {
 console.error(
 `Unable to get page ${pageNum} to initialize viewer`,
 reason
 );
 if (--getPagesLeft === 0) {
 this._pagesCapability.resolve();
}
}
 );
 if (pageNum % PagesCountLimit.PAUSE_EAGER_PAGE_INIT === 0) {
 await promise;
}
}
});
 this.eventBus.dispatch("pagesinit", {
 source: this,
});
 pdfDocument.getMetadata().then(({ info }) => {
 if (pdfDocument !== this.pdfDocument) {
 return;
}
 if (info.Language) {
 this.viewer.lang = info.Language;
}
});
 if (this.defaultRenderingQueue) {
 this.update();
}
})
 .catch((reason) => {
 console.error("Unable to initialize viewer", reason);
 this._pagesCapability.reject(reason);
});
}
 setPageLabels(labels) {
 if (!this.pdfDocument) {
 return;
}
 if (!labels) {
 this._pageLabels = null;
} else if (
 !(
 Array.isArray(labels) &&
 this.pdfDocument.numPages === labels.length
 )
 ) {
 this._pageLabels = null;
 console.error(`setPageLabels: Invalid page labels.`);
} else {
 this._pageLabels = labels;
}
 for (let i = 0, ii = this._pages.length; i < ii; i++) {
 this._pages[i].setPageLabel(this._pageLabels?.[i] ?? null);
}
}
 _resetView() {
 this._pages = [];
 this._currentPageNumber = 1;
 this._currentScale = _ui_utils.UNKNOWN_SCALE;
 this._currentScaleValue = null;
 this._pageLabels = null;
 this.#buffer = new PDFPageViewBuffer(DEFAULT_CACHE_SIZE);
 this._location = null;
 this._optionalContentConfigPromise = null;
 this._firstPageCapability = (0, _pdfjsLib.createPromiseCapability)();
 this._onePageRenderedCapability = (0,
 _pdfjsLib.createPromiseCapability)();
 this._pagesCapability = (0, _pdfjsLib.createPromiseCapability)();
 this._scrollMode = _ui_utils.ScrollMode.VERTICAL;
 this._previousScrollMode = _ui_utils.ScrollMode.UNKNOWN;
 this._spreadMode = _ui_utils.SpreadMode.NONE;
 this.#scrollModePageState = {
 previousPageNumber: 1,
 scrollDown: true,
 pages: [],
};
 if (this.#onVisibilityChange) {
 document.removeEventListener(
 "visibilitychange",
 this.#onVisibilityChange
);
 this.#onVisibilityChange = null;
}
 this.viewer.textContent = "";
 this._updateScrollMode();
 this.viewer.removeAttribute("lang");
 this.viewer.classList.remove(ENABLE_PERMISSIONS_CLASS);
}
 #ensurePageViewVisible() {
 if (this._scrollMode !== _ui_utils.ScrollMode.PAGE) {
 throw new Error(
 "#ensurePageViewVisible: Invalid scrollMode value."
);
}
const pageNumber = this._currentPageNumber,
 state = this.#scrollModePageState,
 viewer = this.viewer;
 viewer.textContent = "";
 state.pages.length = 0;
 if (this._spreadMode === _ui_utils.SpreadMode.NONE) {
 const pageView = this._pages[pageNumber - 1];
 viewer.append(pageView.div);
 state.pages.push(pageView);
} else {
 const pageIndexSet = new Set(),
 parity = this._spreadMode - 1;
 if (parity === -1) {
 pageIndexSet.add(pageNumber - 1);
} else if (pageNumber % 2 !== parity) {
 pageIndexSet.add(pageNumber - 1);
 pageIndexSet.add(pageNumber);
} else {
 pageIndexSet.add(pageNumber - 2);
 pageIndexSet.add(pageNumber - 1);
}
 const spread = document.createElement("div");
 spread.className = "spread";
 for (const i of pageIndexSet) {
const pageView = this._pages[i];
 if (!pageView) {
 continue;
}
 spread.append(pageView.div);
 state.pages.push(pageView);
}
 viewer.append(spread);
}
 state.scrollDown = pageNumber >= state.previousPageNumber;
 state.previousPageNumber = pageNumber;
}
 _scrollUpdate() {
 if (this.pagesCount === 0) {
 return;
}
 this.update();
}
 #scrollIntoView(pageView, pageSpot = null) {
const { div, id } = pageView;
 if (this._currentPageNumber !== id) {
 this._setCurrentPageNumber(id);
}
 if (this._scrollMode === _ui_utils.ScrollMode.PAGE) {
 this.#ensurePageViewVisible();
 this.update();
}
 if (!pageSpot) {
 const left = div.offsetLeft + div.clientLeft,
 right = left + div.clientWidth;
 const { scrollLeft, clientWidth } = this.container;
 if (
 this._scrollMode === _ui_utils.ScrollMode.HORIZONTAL ||
 left < scrollLeft ||
 right > scrollLeft + clientWidth
 ) {
 pageSpot = {
 left: 0,
 top: 0,
};
}
}
 (0, _ui_utils.scrollIntoView)(div, pageSpot);
 if (!this._currentScaleValue && this._location) {
 this._location = null;
}
}
 #isSameScale(newScale) {
 return (
 newScale === this._currentScale ||
 Math.abs(newScale - this._currentScale) < 1e-15
);
}
 _setScaleUpdatePages(
 newScale,
 newValue,
 noScroll = false,
 preset = false
 ) {
 this._currentScaleValue = newValue.toString();
 if (this.#isSameScale(newScale)) {
 if (preset) {
 this.eventBus.dispatch("scalechanging", {
 source: this,
 scale: newScale,
 presetValue: newValue,
});
}
 return;
}
 _ui_utils.docStyle.setProperty(
 "--scale-factor",
 newScale * _pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS
);
const updateArgs = {
 scale: newScale,
};
 for (const pageView of this._pages) {
 pageView.update(updateArgs);
}
 this._currentScale = newScale;
 if (!noScroll) {
 let page = this._currentPageNumber,
 dest;
 if (this._location) {
 page = this._location.pageNumber;
 dest = [
 null,
 {
 name: "XYZ",
},
 this._location.left,
 this._location.top,
 null,
 ];
}
 this.scrollPageIntoView({
 pageNumber: page,
 destArray: dest,
 allowNegativeOffset: true,
});
}
 this.eventBus.dispatch("scalechanging", {
 source: this,
 scale: newScale,
 presetValue: preset ? newValue : undefined,
});
 if (this.defaultRenderingQueue) {
 this.update();
}
 this.updateContainerHeightCss();
}
 get _pageWidthScaleFactor() {
 if (
 this._spreadMode !== _ui_utils.SpreadMode.NONE &&
 this._scrollMode !== _ui_utils.ScrollMode.HORIZONTAL
 ) {
 return 2;
}
 return 1;
}
 _setScale(value, noScroll = false) {
 let scale = parseFloat(value);
 if (scale > 0) {
 this._setScaleUpdatePages(scale, value, noScroll, false);
} else {
 const currentPage = this._pages[this._currentPageNumber - 1];
 if (!currentPage) {
 return;
}
 let hPadding = _ui_utils.SCROLLBAR_PADDING,
 vPadding = _ui_utils.VERTICAL_PADDING;
 if (this.removePageBorders) {
 hPadding = vPadding = 0;
} else if (this._scrollMode === _ui_utils.ScrollMode.HORIZONTAL) {
 [hPadding, vPadding] = [vPadding, hPadding];
}
 const pageWidthScale =
 (((this.container.clientWidth - hPadding) / currentPage.width) *
 currentPage.scale) /
 this._pageWidthScaleFactor;
 const pageHeightScale =
 ((this.container.clientHeight - vPadding) / currentPage.height) *
 currentPage.scale;
 switch (value) {
 case "page-actual":
 scale = 1;
 break;
 case "page-width":
 scale = pageWidthScale;
 break;
 case "page-height":
 scale = pageHeightScale;
 break;
 case "page-fit":
 scale = Math.min(pageWidthScale, pageHeightScale);
 break;
 case "auto":
 const horizontalScale = (0, _ui_utils.isPortraitOrientation)(
 currentPage
 )
 ? pageWidthScale
 : Math.min(pageHeightScale, pageWidthScale);
 scale = Math.min(_ui_utils.MAX_AUTO_SCALE, horizontalScale);
 break;
 default:
 console.error(
 `_setScale: "${value}" is an unknown zoom value.`
);
 return;
}
 this._setScaleUpdatePages(scale, value, noScroll, true);
}
}
 #resetCurrentPageView() {
const pageView = this._pages[this._currentPageNumber - 1];
 this.#scrollIntoView(pageView);
}
 pageLabelToPageNumber(label) {
 if (!this._pageLabels) {
 return null;
}
const i = this._pageLabels.indexOf(label);
 if (i < 0) {
 return null;
}
 return i + 1;
}
 scrollPageIntoView({
 pageNumber,
 destArray = null,
 allowNegativeOffset = false,
 ignoreDestinationZoom = false,
}) {
 if (!this.pdfDocument) {
 return;
}
const pageView =
 Number.isInteger(pageNumber) && this._pages[pageNumber - 1];
 if (!pageView) {
 console.error(
 `scrollPageIntoView: "${pageNumber}" is not a valid pageNumber parameter.`
);
 return;
}
 if (!destArray) {
 this._setCurrentPageNumber(pageNumber, true);
 return;
}
 let x = 0,
 y = 0;
 let width = 0,
 height = 0,
 widthScale,
 heightScale;
const changeOrientation = pageView.rotation % 180 !== 0;
const pageWidth =
 (changeOrientation ? pageView.height : pageView.width) /
 pageView.scale /
 _pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS;
const pageHeight =
 (changeOrientation ? pageView.width : pageView.height) /
 pageView.scale /
 _pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS;
 let scale = 0;
 switch (destArray[1].name) {
 case "XYZ":
 x = destArray[2];
 y = destArray[3];
 scale = destArray[4];
 x = x !== null ? x : 0;
 y = y !== null ? y : pageHeight;
 break;
 case "Fit":
 case "FitB":
 scale = "page-fit";
 break;
 case "FitH":
 case "FitBH":
 y = destArray[2];
 scale = "page-width";
 if (y === null && this._location) {
 x = this._location.left;
 y = this._location.top;
} else if (typeof y !== "number" || y < 0) {
 y = pageHeight;
}
 break;
 case "FitV":
 case "FitBV":
 x = destArray[2];
 width = pageWidth;
 height = pageHeight;
 scale = "page-height";
 break;
 case "FitR":
 x = destArray[2];
 y = destArray[3];
 width = destArray[4] - x;
 height = destArray[5] - y;
const hPadding = this.removePageBorders
 ? 0
 : _ui_utils.SCROLLBAR_PADDING;
const vPadding = this.removePageBorders
 ? 0
 : _ui_utils.VERTICAL_PADDING;
 widthScale =
 (this.container.clientWidth - hPadding) /
 width /
 _pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS;
 heightScale =
 (this.container.clientHeight - vPadding) /
 height /
 _pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS;
 scale = Math.min(Math.abs(widthScale), Math.abs(heightScale));
 break;
 default:
 console.error(
 `scrollPageIntoView: "${destArray[1].name}" is not a valid destination type.`
);
 return;
}
 if (!ignoreDestinationZoom) {
 if (scale && scale !== this._currentScale) {
 this.currentScaleValue = scale;
} else if (this._currentScale === _ui_utils.UNKNOWN_SCALE) {
 this.currentScaleValue = _ui_utils.DEFAULT_SCALE_VALUE;
}
}
 if (scale === "page-fit" && !destArray[4]) {
 this.#scrollIntoView(pageView);
 return;
}
const boundingRect = [
 pageView.viewport.convertToViewportPoint(x, y),
 pageView.viewport.convertToViewportPoint(x + width, y + height),
 ];
 let left = Math.min(boundingRect[0][0], boundingRect[1][0]);
 let top = Math.min(boundingRect[0][1], boundingRect[1][1]);
 if (!allowNegativeOffset) {
 left = Math.max(left, 0);
 top = Math.max(top, 0);
}
 this.#scrollIntoView(pageView, {
 left,
 top,
});
}
 _updateLocation(firstPage) {
const currentScale = this._currentScale;
const currentScaleValue = this._currentScaleValue;
const normalizedScaleValue =
 parseFloat(currentScaleValue) === currentScale
 ? Math.round(currentScale * 10000) / 100
 : currentScaleValue;
const pageNumber = firstPage.id;
const currentPageView = this._pages[pageNumber - 1];
const container = this.container;
const topLeft = currentPageView.getPagePoint(
 container.scrollLeft - firstPage.x,
 container.scrollTop - firstPage.y
);
const intLeft = Math.round(topLeft[0]);
const intTop = Math.round(topLeft[1]);
 let pdfOpenParams = `#page=${pageNumber}`;
 pdfOpenParams += `&zoom=${normalizedScaleValue},${intLeft},${intTop}`;
 this._location = {
 pageNumber,
 scale: normalizedScaleValue,
 top: intTop,
 left: intLeft,
 rotation: this._pagesRotation,
 pdfOpenParams,
};
}
 update() {
const visible = this._getVisiblePages();
const visiblePages = visible.views,
 numVisiblePages = visiblePages.length;
 if (numVisiblePages === 0) {
 return;
}
const newCacheSize = Math.max(
 DEFAULT_CACHE_SIZE,
 2 * numVisiblePages + 1
);
 this.#buffer.resize(newCacheSize, visible.ids);
 this.renderingQueue.renderHighestPriority(visible);
const isSimpleLayout =
 this._spreadMode === _ui_utils.SpreadMode.NONE &&
 (this._scrollMode === _ui_utils.ScrollMode.PAGE ||
 this._scrollMode === _ui_utils.ScrollMode.VERTICAL);
const currentId = this._currentPageNumber;
 let stillFullyVisible = false;
 for (const page of visiblePages) {
 if (page.percent < 100) {
 break;
}
 if (page.id === currentId && isSimpleLayout) {
 stillFullyVisible = true;
 break;
}
}
 this._setCurrentPageNumber(
 stillFullyVisible ? currentId : visiblePages[0].id
);
 this._updateLocation(visible.first);
 this.eventBus.dispatch("updateviewarea", {
 source: this,
 location: this._location,
});
}
 containsElement(element) {
 return this.container.contains(element);
}
 focus() {
 this.container.focus();
}
 get _isContainerRtl() {
 return getComputedStyle(this.container).direction === "rtl";
}
 get isHorizontalScrollbarEnabled() {
 return this.container.scrollWidth > this.container.clientWidth;
}
 get isVerticalScrollbarEnabled() {
 return this.container.scrollHeight > this.container.clientHeight;
}
 _getVisiblePages() {
const views =
 this._scrollMode === _ui_utils.ScrollMode.PAGE
 ? this.#scrollModePageState.pages
 : this._pages,
 horizontal = this._scrollMode === _ui_utils.ScrollMode.HORIZONTAL,
 rtl = horizontal && this._isContainerRtl;
 return (0, _ui_utils.getVisibleElements)({
 scrollEl: this.container,
 views,
 sortByVisibility: true,
 horizontal,
 rtl,
});
}
 isPageVisible(pageNumber) {
 if (!this.pdfDocument) {
 return false;
}
 if (
 !(
 Number.isInteger(pageNumber) &&
 pageNumber > 0 &&
 pageNumber <= this.pagesCount
 )
 ) {
 console.error(
 `isPageVisible: "${pageNumber}" is not a valid page.`
);
 return false;
}
 return this._getVisiblePages().ids.has(pageNumber);
}
 isPageCached(pageNumber) {
 if (!this.pdfDocument) {
 return false;
}
 if (
 !(
 Number.isInteger(pageNumber) &&
 pageNumber > 0 &&
 pageNumber <= this.pagesCount
 )
 ) {
 console.error(`isPageCached: "${pageNumber}" is not a valid page.`);
 return false;
}
const pageView = this._pages[pageNumber - 1];
 return this.#buffer.has(pageView);
}
 cleanup() {
 for (const pageView of this._pages) {
 if (
 pageView.renderingState !== _ui_utils.RenderingStates.FINISHED
 ) {
 pageView.reset();
}
}
}
 _cancelRendering() {
 for (const pageView of this._pages) {
 pageView.cancelRendering();
}
}
async #ensurePdfPageLoaded(pageView) {
 if (pageView.pdfPage) {
 return pageView.pdfPage;
}
 try {
 const pdfPage = await this.pdfDocument.getPage(pageView.id);
 if (!pageView.pdfPage) {
 pageView.setPdfPage(pdfPage);
}
 if (!this.linkService._cachedPageNumber?.(pdfPage.ref)) {
 this.linkService.cachePageRef(pageView.id, pdfPage.ref);
}
 return pdfPage;
} catch (reason) {
 console.error("Unable to get page for page view", reason);
 return null;
}
}
 #getScrollAhead(visible) {
 if (visible.first?.id === 1) {
 return true;
} else if (visible.last?.id === this.pagesCount) {
 return false;
}
 switch (this._scrollMode) {
 case _ui_utils.ScrollMode.PAGE:
 return this.#scrollModePageState.scrollDown;
 case _ui_utils.ScrollMode.HORIZONTAL:
 return this.scroll.right;
}
 return this.scroll.down;
}
 #toggleLoadingIconSpinner(visibleIds) {
 for (const id of visibleIds) {
 const pageView = this._pages[id - 1];
 pageView?.toggleLoadingIconSpinner(true);
}
 for (const pageView of this.#buffer) {
 if (visibleIds.has(pageView.id)) {
 continue;
}
 pageView.toggleLoadingIconSpinner(false);
}
}
 forceRendering(currentlyVisiblePages) {
const visiblePages = currentlyVisiblePages || this._getVisiblePages();
const scrollAhead = this.#getScrollAhead(visiblePages);
const preRenderExtra =
 this._spreadMode !== _ui_utils.SpreadMode.NONE &&
 this._scrollMode !== _ui_utils.ScrollMode.HORIZONTAL;
const pageView = this.renderingQueue.getHighestPriority(
 visiblePages,
 this._pages,
 scrollAhead,
 preRenderExtra
);
 this.#toggleLoadingIconSpinner(visiblePages.ids);
 if (pageView) {
 this.#ensurePdfPageLoaded(pageView).then(() => {
 this.renderingQueue.renderView(pageView);
});
 return true;
}
 return false;
}
 createTextLayerBuilder({
 textLayerDiv,
 pageIndex,
 viewport,
 eventBus,
 highlighter,
 accessibilityManager = null,
}) {
 return new _text_layer_builder.TextLayerBuilder({
 textLayerDiv,
 eventBus,
 pageIndex,
 viewport,
 highlighter,
 accessibilityManager,
});
}
 createXfaLayerBuilder({
 pageDiv,
 pdfPage,
 annotationStorage = this.pdfDocument?.annotationStorage,
}) {
 return new _xfa_layer_builder.XfaLayerBuilder({
 pageDiv,
 pdfPage,
 annotationStorage,
 linkService: this.linkService,
});
}
 createStructTreeLayerBuilder({ pdfPage }) {
 return new _struct_tree_layer_builder.StructTreeLayerBuilder({
 pdfPage,
});
}
 get hasEqualPageSizes() {
const firstPageView = this._pages[0];
 for (let i = 1, ii = this._pages.length; i < ii; ++i) {
 const pageView = this._pages[i];
 if (
 pageView.width !== firstPageView.width ||
 pageView.height !== firstPageView.height
 ) {
 return false;
}
}
 return true;
}
 getPagesOverview() {
 return this._pages.map((pageView) => {
 const viewport = pageView.pdfPage.getViewport({
 scale: 1,
});
 if ((0, _ui_utils.isPortraitOrientation)(viewport)) {
 return {
 width: viewport.width,
 height: viewport.height,
 rotation: viewport.rotation,
};
}
 return {
 width: viewport.height,
 height: viewport.width,
 rotation: (viewport.rotation - 90) % 360,
};
});
}
 get optionalContentConfigPromise() {
 if (!this.pdfDocument) {
 return Promise.resolve(null);
}
 if (!this._optionalContentConfigPromise) {
 console.error("optionalContentConfigPromise: Not initialized yet.");
 return this.pdfDocument.getOptionalContentConfig();
}
 return this._optionalContentConfigPromise;
}
 set optionalContentConfigPromise(promise) {
 if (!(promise instanceof Promise)) {
 throw new Error(`Invalid optionalContentConfigPromise: ${promise}`);
}
 if (!this.pdfDocument) {
 return;
}
 if (!this._optionalContentConfigPromise) {
 return;
}
 this._optionalContentConfigPromise = promise;
const updateArgs = {
 optionalContentConfigPromise: promise,
};
 for (const pageView of this._pages) {
 pageView.update(updateArgs);
}
 this.update();
 this.eventBus.dispatch("optionalcontentconfigchanged", {
 source: this,
 promise,
});
}
 get scrollMode() {
 return this._scrollMode;
}
 set scrollMode(mode) {
 if (this._scrollMode === mode) {
 return;
}
 if (!(0, _ui_utils.isValidScrollMode)(mode)) {
 throw new Error(`Invalid scroll mode: ${mode}`);
}
 if (this.pagesCount > PagesCountLimit.FORCE_SCROLL_MODE_PAGE) {
 return;
}
 this._previousScrollMode = this._scrollMode;
 this._scrollMode = mode;
 this.eventBus.dispatch("scrollmodechanged", {
 source: this,
 mode,
});
 this._updateScrollMode(this._currentPageNumber);
}
 _updateScrollMode(pageNumber = null) {
const scrollMode = this._scrollMode,
 viewer = this.viewer;
 viewer.classList.toggle(
 "scrollHorizontal",
 scrollMode === _ui_utils.ScrollMode.HORIZONTAL
);
 viewer.classList.toggle(
 "scrollWrapped",
 scrollMode === _ui_utils.ScrollMode.WRAPPED
);
 if (!this.pdfDocument || !pageNumber) {
 return;
}
 if (scrollMode === _ui_utils.ScrollMode.PAGE) {
 this.#ensurePageViewVisible();
} else if (this._previousScrollMode === _ui_utils.ScrollMode.PAGE) {
 this._updateSpreadMode();
}
 if (this._currentScaleValue && isNaN(this._currentScaleValue)) {
 this._setScale(this._currentScaleValue, true);
}
 this._setCurrentPageNumber(pageNumber, true);
 this.update();
}
 get spreadMode() {
 return this._spreadMode;
}
 set spreadMode(mode) {
 if (this._spreadMode === mode) {
 return;
}
 if (!(0, _ui_utils.isValidSpreadMode)(mode)) {
 throw new Error(`Invalid spread mode: ${mode}`);
}
 this._spreadMode = mode;
 this.eventBus.dispatch("spreadmodechanged", {
 source: this,
 mode,
});
 this._updateSpreadMode(this._currentPageNumber);
}
 _updateSpreadMode(pageNumber = null) {
 if (!this.pdfDocument) {
 return;
}
const viewer = this.viewer,
 pages = this._pages;
 if (this._scrollMode === _ui_utils.ScrollMode.PAGE) {
 this.#ensurePageViewVisible();
} else {
 viewer.textContent = "";
 if (this._spreadMode === _ui_utils.SpreadMode.NONE) {
 for (const pageView of this._pages) {
 viewer.append(pageView.div);
}
} else {
const parity = this._spreadMode - 1;
 let spread = null;
 for (let i = 0, ii = pages.length; i < ii; ++i) {
 if (spread === null) {
 spread = document.createElement("div");
 spread.className = "spread";
 viewer.append(spread);
} else if (i % 2 === parity) {
 spread = spread.cloneNode(false);
 viewer.append(spread);
}
 spread.append(pages[i].div);
}
}
}
 if (!pageNumber) {
 return;
}
 if (this._currentScaleValue && isNaN(this._currentScaleValue)) {
 this._setScale(this._currentScaleValue, true);
}
 this._setCurrentPageNumber(pageNumber, true);
 this.update();
}
 _getPageAdvance(currentPageNumber, previous = false) {
 switch (this._scrollMode) {
 case _ui_utils.ScrollMode.WRAPPED: {
const { views } = this._getVisiblePages(),
 pageLayout = new Map();
 for (const { id, y, percent, widthPercent } of views) {
 if (percent === 0 || widthPercent < 100) {
 continue;
}
 let yArray = pageLayout.get(y);
 if (!yArray) {
 pageLayout.set(y, (yArray ||= []));
}
 yArray.push(id);
}
 for (const yArray of pageLayout.values()) {
 const currentIndex = yArray.indexOf(currentPageNumber);
 if (currentIndex === -1) {
 continue;
}
 const numPages = yArray.length;
 if (numPages === 1) {
 break;
}
 if (previous) {
 for (let i = currentIndex - 1, ii = 0; i >= ii; i--) {
 const currentId = yArray[i],
 expectedId = yArray[i + 1] - 1;
 if (currentId < expectedId) {
 return currentPageNumber - expectedId;
}
}
} else {
 for (let i = currentIndex + 1, ii = numPages; i < ii; i++) {
 const currentId = yArray[i],
 expectedId = yArray[i - 1] + 1;
 if (currentId > expectedId) {
 return expectedId - currentPageNumber;
}
}
}
 if (previous) {
const firstId = yArray[0];
 if (firstId < currentPageNumber) {
 return currentPageNumber - firstId + 1;
}
} else {
const lastId = yArray[numPages - 1];
 if (lastId > currentPageNumber) {
 return lastId - currentPageNumber + 1;
}
}
 break;
}
 break;
}
 case _ui_utils.ScrollMode.HORIZONTAL: {
 break;
}
 case _ui_utils.ScrollMode.PAGE:
 case _ui_utils.ScrollMode.VERTICAL: {
 if (this._spreadMode === _ui_utils.SpreadMode.NONE) {
 break;
}
const parity = this._spreadMode - 1;
 if (previous && currentPageNumber % 2 !== parity) {
 break;
} else if (!previous && currentPageNumber % 2 === parity) {
 break;
}
const { views } = this._getVisiblePages(),
 expectedId = previous
 ? currentPageNumber - 1
 : currentPageNumber + 1;
 for (const { id, percent, widthPercent } of views) {
 if (id !== expectedId) {
 continue;
}
 if (percent > 0 && widthPercent === 100) {
 return 2;
}
 break;
}
 break;
}
}
 return 1;
}
 nextPage() {
const currentPageNumber = this._currentPageNumber,
 pagesCount = this.pagesCount;
 if (currentPageNumber >= pagesCount) {
 return false;
}
const advance = this._getPageAdvance(currentPageNumber, false) || 1;
 this.currentPageNumber = Math.min(
 currentPageNumber + advance,
 pagesCount
);
 return true;
}
 previousPage() {
const currentPageNumber = this._currentPageNumber;
 if (currentPageNumber <= 1) {
 return false;
}
const advance = this._getPageAdvance(currentPageNumber, true) || 1;
 this.currentPageNumber = Math.max(currentPageNumber - advance, 1);
 return true;
}
 increaseScale(steps = 1) {
 let newScale = this._currentScale;
 do {
 newScale = (newScale * _ui_utils.DEFAULT_SCALE_DELTA).toFixed(2);
 newScale = Math.ceil(newScale * 10) / 10;
 newScale = Math.min(_ui_utils.MAX_SCALE, newScale);
} while (--steps > 0 && newScale < _ui_utils.MAX_SCALE);
 this.currentScaleValue = newScale;
}
 decreaseScale(steps = 1) {
 let newScale = this._currentScale;
 do {
 newScale = (newScale / _ui_utils.DEFAULT_SCALE_DELTA).toFixed(2);
 newScale = Math.floor(newScale * 10) / 10;
 newScale = Math.max(_ui_utils.MIN_SCALE, newScale);
} while (--steps > 0 && newScale > _ui_utils.MIN_SCALE);
 this.currentScaleValue = newScale;
}
 updateContainerHeightCss() {
const height = this.container.clientHeight;
 if (height !== this.#previousContainerHeight) {
 this.#previousContainerHeight = height;
 _ui_utils.docStyle.setProperty(
 "--viewer-container-height",
 `${height}px`
);
}
}
 refresh() {
 if (!this.pdfDocument) {
 return;
}
const updateArgs = {};
 for (const pageView of this._pages) {
 pageView.update(updateArgs);
}
 this.update();
}
}
 exports.PDFViewer = PDFViewer;
},
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
},
 (__unused_webpack_module, exports) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
},
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
},
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
 exports.PDFPageView = void 0;
var _pdfjsLib = __webpack_require__(5);
var _ui_utils = __webpack_require__(1);
var _app_options = __webpack_require__(2);
var _text_accessibility = __webpack_require__(33);
const MAX_CANVAS_PIXELS =
 _app_options.compatibilityParams.maxCanvasPixels || 16777216;
class PDFPageView {
 #annotationMode = _pdfjsLib.AnnotationMode.ENABLE_FORMS;
 constructor(options) {
const container = options.container;
const defaultViewport = options.defaultViewport;
 this.id = options.id;
 this.renderingId = "page" + this.id;
 this.pdfPage = null;
 this.pageLabel = null;
 this.rotation = 0;
 this.scale = options.scale || _ui_utils.DEFAULT_SCALE;
 this.viewport = defaultViewport;
 this.pdfPageRotate = defaultViewport.rotation;
 this._optionalContentConfigPromise =
 options.optionalContentConfigPromise || null;
 this.hasRestrictedScaling = false;
 this.textLayerMode =
 options.textLayerMode ?? _ui_utils.TextLayerMode.ENABLE;
 this.#annotationMode =
 options.annotationMode ?? _pdfjsLib.AnnotationMode.ENABLE_FORMS;
 this.imageResourcesPath = options.imageResourcesPath || "";
 this.useOnlyCssZoom = options.useOnlyCssZoom || false;
 this.maxCanvasPixels = options.maxCanvasPixels || MAX_CANVAS_PIXELS;
 this.pageColors = options.pageColors || null;
 this.eventBus = options.eventBus;
 this.renderingQueue = options.renderingQueue;
 this.textLayerFactory = options.textLayerFactory;
 this.xfaLayerFactory = options.xfaLayerFactory;
 this.structTreeLayerFactory = options.structTreeLayerFactory;
 this.renderer = options.renderer || _ui_utils.RendererType.CANVAS;
 this.paintedViewportMap = new WeakMap();
 this.renderingState = _ui_utils.RenderingStates.INITIAL;
 this.resume = null;
 this._renderError = null;
 this._isStandalone = !this.renderingQueue?.hasViewer();
 this._annotationCanvasMap = null;
 this.annotationLayer = null;
 this.textLayer = null;
 this.zoomLayer = null;
 this.xfaLayer = null;
 this.structTreeLayer = null;
const div = document.createElement("div");
 div.className = "page";
 div.style.width = Math.floor(this.viewport.width) + "px";
 div.style.height = Math.floor(this.viewport.height) + "px";
 div.setAttribute("data-page-number", this.id);
 div.setAttribute("role", "region");
 div.setAttribute("aria-label", "Page " + this.id);
 this.div = div;
 container?.append(div);
 if (this._isStandalone) {
 const { optionalContentConfigPromise } = options;
 if (optionalContentConfigPromise) {
 optionalContentConfigPromise.then((optionalContentConfig) => {
 if (
 optionalContentConfigPromise !==
 this._optionalContentConfigPromise
 ) {
 return;
}
});
}
}
}
 setPdfPage(pdfPage) {
 this.pdfPage = pdfPage;
 this.pdfPageRotate = pdfPage.rotate;
const totalRotation = (this.rotation + this.pdfPageRotate) % 360;
 this.viewport = pdfPage.getViewport({
 scale: this.scale * _pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS,
 rotation: totalRotation,
});
 this.reset();
}
 destroy() {
 this.reset();
 this.pdfPage?.cleanup();
}
async _renderAnnotationLayer() {
 let error = null;
 try {
 await this.annotationLayer.render(this.viewport, "display");
} catch (ex) {
 console.error(`_renderAnnotationLayer: "${ex}".`);
 error = ex;
} finally {
 this.eventBus.dispatch("annotationlayerrendered", {
 source: this,
 pageNumber: this.id,
 error,
});
}
}
async _renderXfaLayer() {
 let error = null;
 try {
 const result = await this.xfaLayer.render(this.viewport, "display");
 if (result?.textDivs && this.textHighlighter) {
 this._buildXfaTextContentItems(result.textDivs);
}
} catch (ex) {
 console.error(`_renderXfaLayer: "${ex}".`);
 error = ex;
} finally {
 this.eventBus.dispatch("xfalayerrendered", {
 source: this,
 pageNumber: this.id,
 error,
});
}
}
async _buildXfaTextContentItems(textDivs) {
const text = await this.pdfPage.getTextContent();
const items = [];
 for (const item of text.items) {
 items.push(item.str);
}
 this.textHighlighter.setTextMapping(textDivs, items);
 this.textHighlighter.enable();
}
 _resetZoomLayer(removeFromDOM = false) {
 if (!this.zoomLayer) {
 return;
}
const zoomLayerCanvas = this.zoomLayer.firstChild;
 this.paintedViewportMap.delete(zoomLayerCanvas);
 zoomLayerCanvas.width = 0;
 zoomLayerCanvas.height = 0;
 if (removeFromDOM) {
 this.zoomLayer.remove();
}
 this.zoomLayer = null;
}
 reset({
 keepZoomLayer = false,
 keepAnnotationLayer = false,
 keepXfaLayer = false,
} = {}) {
 this.cancelRendering({
 keepAnnotationLayer,
 keepXfaLayer,
});
 this.renderingState = _ui_utils.RenderingStates.INITIAL;
const div = this.div;
 div.style.width = Math.floor(this.viewport.width) + "px";
 div.style.height = Math.floor(this.viewport.height) + "px";
const childNodes = div.childNodes,
 zoomLayerNode = (keepZoomLayer && this.zoomLayer) || null,
 annotationLayerNode =
 (keepAnnotationLayer && this.annotationLayer?.div) || null,
 xfaLayerNode = (keepXfaLayer && this.xfaLayer?.div) || null;
 for (let i = childNodes.length - 1; i >= 0; i--) {
 const node = childNodes[i];
 switch (node) {
 case zoomLayerNode:
 case annotationLayerNode:
 case xfaLayerNode:
 continue;
}
 node.remove();
}
 div.removeAttribute("data-loaded");
 if (annotationLayerNode) {
 this.annotationLayer.hide();
}
 if (xfaLayerNode) {
 this.xfaLayer.hide();
}
 if (!zoomLayerNode) {
 if (this.canvas) {
 this.paintedViewportMap.delete(this.canvas);
 this.canvas.width = 0;
 this.canvas.height = 0;
 delete this.canvas;
}
 this._resetZoomLayer();
}
 if (this.svg) {
 this.paintedViewportMap.delete(this.svg);
 delete this.svg;
}
 this.loadingIconDiv = document.createElement("div");
 this.loadingIconDiv.className = "loadingIcon notVisible";
 if (this._isStandalone) {
 this.toggleLoadingIconSpinner(true);
}
 this.loadingIconDiv.setAttribute("role", "img");
 this.loadingIconDiv?.setAttribute("aria-label", "Loading...");
 div.append(this.loadingIconDiv);
}
 update({
 scale = 0,
 rotation = null,
 optionalContentConfigPromise = null,
}) {
 this.scale = scale || this.scale;
 if (typeof rotation === "number") {
 this.rotation = rotation;
}
 if (optionalContentConfigPromise instanceof Promise) {
 this._optionalContentConfigPromise = optionalContentConfigPromise;
 optionalContentConfigPromise.then((optionalContentConfig) => {
 if (
 optionalContentConfigPromise !==
 this._optionalContentConfigPromise
 ) {
 return;
}
});
}
const totalRotation = (this.rotation + this.pdfPageRotate) % 360;
 this.viewport = this.viewport.clone({
 scale: this.scale * _pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS,
 rotation: totalRotation,
});
 if (this._isStandalone) {
 _ui_utils.docStyle.setProperty(
 "--scale-factor",
 this.viewport.scale
);
}
 if (this.svg) {
 this.cssTransform({
 target: this.svg,
 redrawAnnotationLayer: true,
 redrawXfaLayer: true,
});
 this.eventBus.dispatch("pagerendered", {
 source: this,
 pageNumber: this.id,
 cssTransform: true,
 timestamp: performance.now(),
 error: this._renderError,
});
 return;
}
 let isScalingRestricted = false;
 if (this.canvas && this.maxCanvasPixels > 0) {
 const outputScale = this.outputScale;
 if (
 ((Math.floor(this.viewport.width) * outputScale.sx) | 0) *
 ((Math.floor(this.viewport.height) * outputScale.sy) | 0) >
 this.maxCanvasPixels
 ) {
 isScalingRestricted = true;
}
}
 if (this.canvas) {
 if (
 this.useOnlyCssZoom ||
 (this.hasRestrictedScaling && isScalingRestricted)
 ) {
 this.cssTransform({
 target: this.canvas,
 redrawAnnotationLayer: true,
 redrawXfaLayer: true,
});
 this.eventBus.dispatch("pagerendered", {
 source: this,
 pageNumber: this.id,
 cssTransform: true,
 timestamp: performance.now(),
 error: this._renderError,
});
 return;
}
 if (!this.zoomLayer && !this.canvas.hidden) {
 this.zoomLayer = this.canvas.parentNode;
 this.zoomLayer.style.position = "absolute";
}
}
 if (this.zoomLayer) {
 this.cssTransform({
 target: this.zoomLayer.firstChild,
});
}
 this.reset({
 keepZoomLayer: true,
 keepAnnotationLayer: true,
 keepXfaLayer: true,
});
}
 cancelRendering({
 keepAnnotationLayer = false,
 keepXfaLayer = false,
} = {}) {
 if (this.paintTask) {
 this.paintTask.cancel();
 this.paintTask = null;
}
 this.resume = null;
 if (this.textLayer) {
 this.textLayer.cancel();
 this.textLayer = null;
}
 if (
 this.annotationLayer &&
 (!keepAnnotationLayer || !this.annotationLayer.div)
 ) {
 this.annotationLayer.cancel();
 this.annotationLayer = null;
 this._annotationCanvasMap = null;
}
 
 if (this.xfaLayer && (!keepXfaLayer || !this.xfaLayer.div)) {
 this.xfaLayer.cancel();
 this.xfaLayer = null;
 this.textHighlighter?.disable();
}
 if (this._onTextLayerRendered) {
 this.eventBus._off("textlayerrendered", this._onTextLayerRendered);
 this._onTextLayerRendered = null;
}
}
 cssTransform({
 target,
 redrawAnnotationLayer = false,
 redrawXfaLayer = false,
}) {
const width = this.viewport.width;
const height = this.viewport.height;
const div = this.div;
 target.style.width =
 target.parentNode.style.width =
 div.style.width =
 Math.floor(width) + "px";
 target.style.height =
 target.parentNode.style.height =
 div.style.height =
 Math.floor(height) + "px";
const relativeRotation =
 this.viewport.rotation -
 this.paintedViewportMap.get(target).rotation;
const absRotation = Math.abs(relativeRotation);
 let scaleX = 1,
 scaleY = 1;
 if (absRotation === 90 || absRotation === 270) {
 scaleX = height / width;
 scaleY = width / height;
}
 target.style.transform = `rotate(${relativeRotation}deg) scale(${scaleX}, ${scaleY})`;
 if (this.textLayer) {
 const textLayerViewport = this.textLayer.viewport;
 const textRelativeRotation =
 this.viewport.rotation - textLayerViewport.rotation;
 const textAbsRotation = Math.abs(textRelativeRotation);
 let scale = width / textLayerViewport.width;
 if (textAbsRotation === 90 || textAbsRotation === 270) {
 scale = width / textLayerViewport.height;
}
 const textLayerDiv = this.textLayer.textLayerDiv;
 let transX, transY;
 switch (textAbsRotation) {
 case 0:
 transX = transY = 0;
 break;
 case 90:
 transX = 0;
 transY = "-" + textLayerDiv.style.height;
 break;
 case 180:
 transX = "-" + textLayerDiv.style.width;
 transY = "-" + textLayerDiv.style.height;
 break;
 case 270:
 transX = "-" + textLayerDiv.style.width;
 transY = 0;
 break;
 default:
 console.error("Bad rotation value.");
 break;
}
 textLayerDiv.style.transform =
 `rotate(${textAbsRotation}deg) ` +
 `scale(${scale}) ` +
 `translate(${transX}, ${transY})`;
 textLayerDiv.style.transformOrigin = "0% 0%";
}
 if (redrawAnnotationLayer && this.annotationLayer) {
 this._renderAnnotationLayer();
}
 if (redrawXfaLayer && this.xfaLayer) {
 this._renderXfaLayer();
}
}
 get width() {
 return this.viewport.width;
}
 get height() {
 return this.viewport.height;
}
 getPagePoint(x, y) {
 return this.viewport.convertToPdfPoint(x, y);
}
 toggleLoadingIconSpinner(viewVisible = false) {
 this.loadingIconDiv?.classList.toggle("notVisible", !viewVisible);
}
 draw() {
 if (this.renderingState !== _ui_utils.RenderingStates.INITIAL) {
 console.error("Must be in new state before drawing");
 this.reset();
}
const { div, pdfPage } = this;
 if (!pdfPage) {
 this.renderingState = _ui_utils.RenderingStates.FINISHED;
 if (this.loadingIconDiv) {
 this.loadingIconDiv.remove();
 delete this.loadingIconDiv;
}
 return Promise.reject(new Error("pdfPage is not loaded"));
}
 this.renderingState = _ui_utils.RenderingStates.RUNNING;
const canvasWrapper = document.createElement("div");
 canvasWrapper.style.width = div.style.width;
 canvasWrapper.style.height = div.style.height;
 canvasWrapper.classList.add("canvasWrapper");
const lastDivBeforeTextDiv = this.annotationLayer?.div;
 if (lastDivBeforeTextDiv) {
 lastDivBeforeTextDiv.before(canvasWrapper);
} else {
 div.append(canvasWrapper);
}
 let textLayer = null;
 if (
 this.textLayerMode !== _ui_utils.TextLayerMode.DISABLE &&
 this.textLayerFactory
 ) {
 this._accessibilityManager ||=
 new _text_accessibility.TextAccessibilityManager();
 const textLayerDiv = document.createElement("div");
 textLayerDiv.className = "textLayer";
 textLayerDiv.style.width = canvasWrapper.style.width;
 textLayerDiv.style.height = canvasWrapper.style.height;
 if (lastDivBeforeTextDiv) {
 lastDivBeforeTextDiv.before(textLayerDiv);
} else {
 div.append(textLayerDiv);
}
 textLayer = this.textLayerFactory.createTextLayerBuilder({
 textLayerDiv,
 pageIndex: this.id - 1,
 viewport: this.viewport,
 eventBus: this.eventBus,
 highlighter: this.textHighlighter,
 accessibilityManager: this._accessibilityManager,
});
}
 this.textLayer = textLayer;
 if (this.xfaLayer?.div) {
 div.append(this.xfaLayer.div);
}
 let renderContinueCallback = null;
 if (this.renderingQueue) {
 renderContinueCallback = (cont) => {
 if (!this.renderingQueue.isHighestPriority(this)) {
 this.renderingState = _ui_utils.RenderingStates.PAUSED;
 this.resume = () => {
 this.renderingState = _ui_utils.RenderingStates.RUNNING;
 cont();
};
 return;
}
 cont();
};
}
const finishPaintTask = async (error = null) => {
 if (paintTask === this.paintTask) {
 this.paintTask = null;
}
 if (error instanceof _pdfjsLib.RenderingCancelledException) {
 this._renderError = null;
 return;
}
 this._renderError = error;
 this.renderingState = _ui_utils.RenderingStates.FINISHED;
 if (this.loadingIconDiv) {
 this.loadingIconDiv.remove();
 delete this.loadingIconDiv;
}
 this._resetZoomLayer(true);
 this.eventBus.dispatch("pagerendered", {
 source: this,
 pageNumber: this.id,
 cssTransform: false,
 timestamp: performance.now(),
 error: this._renderError,
});
 if (error) {
 throw error;
}
};
const paintTask =
 this.renderer === _ui_utils.RendererType.SVG
 ? this.paintOnSvg(canvasWrapper)
 : this.paintOnCanvas(canvasWrapper);
 paintTask.onRenderContinue = renderContinueCallback;
 this.paintTask = paintTask;
const resultPromise = paintTask.promise.then(
 () => {
 return finishPaintTask(null).then(() => {
 if (textLayer) {
const readableStream = pdfPage.streamTextContent({
 includeMarkedContent: true,
});
 textLayer.setTextContentStream(readableStream);
 textLayer.render();
}
});
},
 function (reason) {
 return finishPaintTask(reason);
}
);
 if (this.xfaLayerFactory) {
 this.xfaLayer ||= this.xfaLayerFactory.createXfaLayerBuilder({
 pageDiv: div,
 pdfPage,
});
 this._renderXfaLayer();
}
 if (this.structTreeLayerFactory && this.textLayer && this.canvas) {
 this._onTextLayerRendered = (event) => {
 if (event.pageNumber !== this.id) {
 return;
}
 this.eventBus._off(
 "textlayerrendered",
 this._onTextLayerRendered
);
 this._onTextLayerRendered = null;
 if (!this.canvas) {
 return;
}
 this.pdfPage.getStructTree().then((tree) => {
 if (!tree) {
 return;
}
 if (!this.canvas) {
 return;
}
 const treeDom = this.structTreeLayer.render(tree);
 treeDom.classList.add("structTree");
 this.canvas.append(treeDom);
});
};
 this.eventBus._on("textlayerrendered", this._onTextLayerRendered);
 this.structTreeLayer =
 this.structTreeLayerFactory.createStructTreeLayerBuilder({
 pdfPage,
});
}
 div.setAttribute("data-loaded", true);
 this.eventBus.dispatch("pagerender", {
 source: this,
 pageNumber: this.id,
});
 return resultPromise;
}
 paintOnCanvas(canvasWrapper) {
const renderCapability = (0, _pdfjsLib.createPromiseCapability)();
const result = {
 promise: renderCapability.promise,
 onRenderContinue(cont) {
 cont();
},
 cancel() {
 renderTask.cancel();
},
 get separateAnnots() {
 return renderTask.separateAnnots;
},
};
const viewport = this.viewport;
const canvas = document.createElement("canvas");
 canvas.hidden = true;
 let isCanvasHidden = true;
const showCanvas = function () {
 if (isCanvasHidden) {
 canvas.hidden = false;
 isCanvasHidden = false;
}
};
 canvasWrapper.append(canvas);
 this.canvas = canvas;
const ctx = canvas.getContext("2d", {
 alpha: false,
});
const outputScale = (this.outputScale = new _ui_utils.OutputScale());
 if (this.useOnlyCssZoom) {
 const actualSizeViewport = viewport.clone({
 scale: _pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS,
});
 outputScale.sx *= actualSizeViewport.width / viewport.width;
 outputScale.sy *= actualSizeViewport.height / viewport.height;
}
 if (this.maxCanvasPixels > 0) {
 const pixelsInViewport = viewport.width * viewport.height;
 const maxScale = Math.sqrt(this.maxCanvasPixels / pixelsInViewport);
 if (outputScale.sx > maxScale || outputScale.sy > maxScale) {
 outputScale.sx = maxScale;
 outputScale.sy = maxScale;
 this.hasRestrictedScaling = true;
} else {
 this.hasRestrictedScaling = false;
}
}
const sfx = (0, _ui_utils.approximateFraction)(outputScale.sx);
const sfy = (0, _ui_utils.approximateFraction)(outputScale.sy);
 canvas.width = (0, _ui_utils.roundToDivide)(
 viewport.width * outputScale.sx,
 sfx[0]
);
 canvas.height = (0, _ui_utils.roundToDivide)(
 viewport.height * outputScale.sy,
 sfy[0]
);
 canvas.style.width =
 (0, _ui_utils.roundToDivide)(viewport.width, sfx[1]) + "px";
 canvas.style.height =
 (0, _ui_utils.roundToDivide)(viewport.height, sfy[1]) + "px";
 this.paintedViewportMap.set(canvas, viewport);
const transform = outputScale.scaled
 ? [outputScale.sx, 0, 0, outputScale.sy, 0, 0]
 : null;
const renderContext = {
 canvasContext: ctx,
 transform,
 viewport: this.viewport,
 annotationMode: this.#annotationMode,
 optionalContentConfigPromise: this._optionalContentConfigPromise,
 annotationCanvasMap: this._annotationCanvasMap,
 pageColors: this.pageColors,
};
const renderTask = this.pdfPage.render(renderContext);
 renderTask.onContinue = function (cont) {
 showCanvas();
 if (result.onRenderContinue) {
 result.onRenderContinue(cont);
} else {
 cont();
}
};
 renderTask.promise.then(
 function () {
 showCanvas();
 renderCapability.resolve();
},
 function (error) {
 showCanvas();
 renderCapability.reject(error);
}
);
 return result;
}
 paintOnSvg(wrapper) {
 let cancelled = false;
const ensureNotCancelled = () => {
 if (cancelled) {
 throw new _pdfjsLib.RenderingCancelledException(
 `Rendering cancelled, page ${this.id}`,
 "svg"
);
}
};
const pdfPage = this.pdfPage;
const actualSizeViewport = this.viewport.clone({
 scale: _pdfjsLib.PixelsPerInch.PDF_TO_CSS_UNITS,
});
const promise = pdfPage.then((opList) => {
 ensureNotCancelled();
 const svgGfx = new _pdfjsLib.SVGGraphics(
 pdfPage.commonObjs,
 pdfPage.objs
);
 return svgGfx.getSVG(opList, actualSizeViewport).then((svg) => {
 ensureNotCancelled();
 this.svg = svg;
 svg.style.width = wrapper.style.width;
 svg.style.height = wrapper.style.height;
 this.renderingState = _ui_utils.RenderingStates.FINISHED;
 wrapper.append(svg);
});
});
 return {
 promise,
 onRenderContinue(cont) {
 cont();
},
 cancel() {
 cancelled = true;
},
 get separateAnnots() {
 return false;
},
};
}
 setPageLabel(label) {
 this.pageLabel = typeof label === "string" ? label : null;
 if (this.pageLabel !== null) {
 this.div.setAttribute("data-page-label", this.pageLabel);
} else {
 this.div.removeAttribute("data-page-label");
}
}
}
 exports.PDFPageView = PDFPageView;
},
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
 exports.TextAccessibilityManager = void 0;
var _ui_utils = __webpack_require__(1);
class TextAccessibilityManager {
 #enabled = false;
 #textChildren = null;
 #textNodes = new Map();
 #waitingElements = new Map();
 setTextMapping(textDivs) {
 this.#textChildren = textDivs;
}
static #compareElementPositions(e1, e2) {
const rect1 = e1.getBoundingClientRect();
const rect2 = e2.getBoundingClientRect();
 if (rect1.width === 0 && rect1.height === 0) {
 return +1;
}
 if (rect2.width === 0 && rect2.height === 0) {
 return -1;
}
const top1 = rect1.y;
const bot1 = rect1.y + rect1.height;
const mid1 = rect1.y + rect1.height / 2;
const top2 = rect2.y;
const bot2 = rect2.y + rect2.height;
const mid2 = rect2.y + rect2.height / 2;
 if (mid1 <= top2 && mid2 >= bot1) {
 return -1;
}
 if (mid2 <= top1 && mid1 >= bot2) {
 return +1;
}
const centerX1 = rect1.x + rect1.width / 2;
const centerX2 = rect2.x + rect2.width / 2;
 return centerX1 - centerX2;
}
 enable() {
 if (this.#enabled) {
 throw new Error("TextAccessibilityManager is already enabled.");
}
 if (!this.#textChildren) {
 throw new Error("Text divs and strings have not been set.");
}
 this.#enabled = true;
 this.#textChildren = this.#textChildren.slice();
 this.#textChildren.sort(
 TextAccessibilityManager.#compareElementPositions
);
 if (this.#textNodes.size > 0) {
 const textChildren = this.#textChildren;
 for (const [id, nodeIndex] of this.#textNodes) {
const element = document.getElementById(id);
 if (!element) {
 this.#textNodes.delete(id);
 continue;
}
 this.#addIdToAriaOwns(id, textChildren[nodeIndex]);
}
}
 for (const [element, isRemovable] of this.#waitingElements) {
 this.addPointerInTextLayer(element, isRemovable);
}
 this.#waitingElements.clear();
}
 disable() {
 if (!this.#enabled) {
 return;
}
 this.#waitingElements.clear();
 this.#textChildren = null;
 this.#enabled = false;
}
 removePointerInTextLayer(element) {
 if (!this.#enabled) {
 this.#waitingElements.delete(element);
 return;
}
const children = this.#textChildren;
 if (!children || children.length === 0) {
 return;
}
const { id } = element;
const nodeIndex = this.#textNodes.get(id);
 if (nodeIndex === undefined) {
 return;
}
const node = children[nodeIndex];
 this.#textNodes.delete(id);
 let owns = node.getAttribute("aria-owns");
 if (owns?.includes(id)) {
 owns = owns
 .split(" ")
 .filter((x) => x !== id)
 .join(" ");
 if (owns) {
 node.setAttribute("aria-owns", owns);
} else {
 node.removeAttribute("aria-owns");
}
}
}
 #addIdToAriaOwns(id, node) {
const owns = node.getAttribute("aria-owns");
 if (!owns?.includes(id)) {
 node.setAttribute("aria-owns", owns ? `${owns} ${id}` : id);
}
 node.removeAttribute("role");
}
 addPointerInTextLayer(element, isRemovable) {
const { id } = element;
 if (!id) {
 return;
}
 if (!this.#enabled) {
 this.#waitingElements.set(element, isRemovable);
 return;
}
 if (isRemovable) {
 this.removePointerInTextLayer(element);
}
const children = this.#textChildren;
 if (!children || children.length === 0) {
 return;
}
const index = (0, _ui_utils.binarySearchFirstItem)(
 children,
 (node) =>
 TextAccessibilityManager.#compareElementPositions(element, node) <
 0
);
const nodeIndex = Math.max(0, index - 1);
 this.#addIdToAriaOwns(id, children[nodeIndex]);
 this.#textNodes.set(id, nodeIndex);
}
 moveElementInDOM(container, element, contentElement, isRemovable) {
 this.addPointerInTextLayer(contentElement, isRemovable);
 if (!container.hasChildNodes()) {
 container.append(element);
 return;
}
const children = Array.from(container.childNodes).filter(
 (node) => node !== element
);
 if (children.length === 0) {
 return;
}
const elementToCompare = contentElement || element;
const index = (0, _ui_utils.binarySearchFirstItem)(
 children,
 (node) =>
 TextAccessibilityManager.#compareElementPositions(
 elementToCompare,
 node
 ) < 0);
 if (index === 0) {
 children[0].before(element);
} else {
 children[index - 1].after(element);
}}}
 exports.TextAccessibilityManager = TextAccessibilityManager;
},
 (__unused_webpack_module, exports) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
 exports.StructTreeLayerBuilder = void 0;
const PDF_ROLE_TO_HTML_ROLE = {
 Document: null,
 DocumentFragment: null,
 Part: "group",
 Sect: "group",
 Div: "group",
 Aside: "note",
 NonStruct: "none",
 P: null,
 H: "heading",
 Title: null,
 FENote: "note",
 Sub: "group",
 Lbl: null,
 Span: null,
 Em: null,
 Strong: null,
 Link: "link",
 Annot: "note",
 Form: "form",
 Ruby: null,
 RB: null,
 RT: null,
 RP: null,
 Warichu: null,
 WT: null,
 WP: null,
 L: "list",
 LI: "listitem",
 LBody: null,
 Table: "table",
 TR: "row",
 TH: "columnheader",
 TD: "cell",
 THead: "columnheader",
 TBody: null,
 TFoot: null,
 Caption: null,
 Figure: "figure",
 Formula: null,
 Artifact: null,
};
const HEADING_PATTERN = /^H(\d+)$/;
class StructTreeLayerBuilder {
 constructor({ pdfPage }) {
 this.pdfPage = pdfPage;
}
 render(structTree) {
 return this._walk(structTree);
}
 _setAttributes(structElement, htmlElement) {
 if (structElement.alt !== undefined) {
 htmlElement.setAttribute("aria-label", structElement.alt);}
 if (structElement.id !== undefined) {
 htmlElement.setAttribute("aria-owns", structElement.id);}
 if (structElement.lang !== undefined) {
 htmlElement.setAttribute("lang", structElement.lang); }}
 _walk(node) {
 if (!node) {
 return null;
}
const element = document.createElement("span");
 if ("role" in node) {
 const { role } = node;
 const match = role.match(HEADING_PATTERN);
 if (match) {
 element.setAttribute("role", "heading");
 element.setAttribute("aria-level", match[1]);
} else if (PDF_ROLE_TO_HTML_ROLE[role]) {
 element.setAttribute("role", PDF_ROLE_TO_HTML_ROLE[role]);}}
 this._setAttributes(node, element);
 if (node.children) {
 if (node.children.length === 1 && "id" in node.children[0]) {
 this._setAttributes(node.children[0], element);
} else {
 for (const kid of node.children) {
 element.append(this._walk(kid));}}}
 return element;}}
 exports.StructTreeLayerBuilder = StructTreeLayerBuilder;
},
 (__unused_webpack_module, exports) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
 exports.TextHighlighter = void 0;
class TextHighlighter {
 constructor({ findController, eventBus, pageIndex }) {
 this.findController = findController;
 this.matches = [];
 this.eventBus = eventBus;
 this.pageIdx = pageIndex;
 this._onUpdateTextLayerMatches = null;
 this.textDivs = null;
 this.textContentItemsStr = null;
 this.enabled = false;
}
 setTextMapping(divs, texts) {
 this.textDivs = divs;
 this.textContentItemsStr = texts;
}
 enable() {
 if (!this.textDivs || !this.textContentItemsStr) {
 throw new Error("Text divs and strings have not been set.");
}
 if (this.enabled) {
 throw new Error("TextHighlighter is already enabled.");
}
 this.enabled = true;
 if (!this._onUpdateTextLayerMatches) {
 this._onUpdateTextLayerMatches = (evt) => {
 if (evt.pageIndex === this.pageIdx || evt.pageIndex === -1) {
 this._updateMatches();
}
};
 this.eventBus._on(
 "updatetextlayermatches",
 this._onUpdateTextLayerMatches
);
}
 this._updateMatches();
}
 disable() {
 if (!this.enabled) {
 return;
}
 this.enabled = false;
 if (this._onUpdateTextLayerMatches) {
 this.eventBus._off(
 "updatetextlayermatches",
 this._onUpdateTextLayerMatches
);
 this._onUpdateTextLayerMatches = null;
}
}
 _convertMatches(matches, matchesLength) {
 if (!matches) {
 return [];
}
const { textContentItemsStr } = this;
 let i = 0,
 iIndex = 0;
const end = textContentItemsStr.length - 1;
const result = [];
 for (let m = 0, mm = matches.length; m < mm; m++) {
 let matchIdx = matches[m];
 while (
 i !== end &&
 matchIdx >= iIndex + textContentItemsStr[i].length
 ) {
 iIndex += textContentItemsStr[i].length;
 i++;
}
 if (i === textContentItemsStr.length) {
 console.error("Could not find a matching mapping");
}
 const match = {
 begin: {
 divIdx: i,
 offset: matchIdx - iIndex,
},
};
 matchIdx += matchesLength[m];
 while (
 i !== end &&
 matchIdx > iIndex + textContentItemsStr[i].length
 ) {
 iIndex += textContentItemsStr[i].length;
 i++;
}
 match.end = {
 divIdx: i,
 offset: matchIdx - iIndex,
};
 result.push(match);
}
 return result;
}
 _renderMatches(matches) {
 if (matches.length === 0) {
 return;
}
const { findController, pageIdx } = this;
const { textContentItemsStr, textDivs } = this;
const isSelectedPage = pageIdx === findController.selected.pageIdx;
const selectedMatchIdx = findController.selected.matchIdx;
 let prevEnd = null;
const infinity = {
 divIdx: -1,
 offset: undefined,
};
 function beginText(begin, className) {
 const divIdx = begin.divIdx;
 textDivs[divIdx].textContent = "";
 return appendTextToDiv(divIdx, 0, begin.offset, className);
}
 function appendTextToDiv(divIdx, fromOffset, toOffset, className) {
 let div = textDivs[divIdx];
 if (div.nodeType === Node.TEXT_NODE) {
const span = document.createElement("span");
 div.before(span);
 span.append(div);
 textDivs[divIdx] = span;
 div = span;
}
 const content = textContentItemsStr[divIdx].substring(
 fromOffset,
 toOffset
);
 const node = document.createTextNode(content);
 if (className) {
const span = document.createElement("span");
 span.className = `${className} appended`;
 span.append(node);
 div.append(span);
 return className.includes("selected") ? span.offsetLeft : 0;
}
 div.append(node);
 return 0;
}
 let i0 = selectedMatchIdx,
 i1 = i0 + 1;
 
 for (let i = i0; i < i1; i++) {
 const match = matches[i];
 const begin = match.begin;
 const end = match.end;
 const isSelected = isSelectedPage && i === selectedMatchIdx;
 const highlightSuffix = isSelected ? " selected" : "";
 let selectedLeft = 0;
 if (!prevEnd || begin.divIdx !== prevEnd.divIdx) {
 if (prevEnd !== null) {
 appendTextToDiv(
 prevEnd.divIdx,
 prevEnd.offset,
 infinity.offset
);
}
 beginText(begin);
} else {
 appendTextToDiv(prevEnd.divIdx, prevEnd.offset, begin.offset);
}
 if (begin.divIdx === end.divIdx) {
 selectedLeft = appendTextToDiv(
 begin.divIdx,
 begin.offset,
 end.offset,
 "highlight" + highlightSuffix
);
} else {
 selectedLeft = appendTextToDiv(
 begin.divIdx,
 begin.offset,
 infinity.offset,
 "highlight begin" + highlightSuffix
);
 for (let n0 = begin.divIdx + 1, n1 = end.divIdx; n0 < n1; n0++) {
 textDivs[n0].className = "highlight middle" + highlightSuffix;
}
 beginText(end, "highlight end" + highlightSuffix);
}
 prevEnd = end;
 if (isSelected) {
 findController.scrollMatchIntoView({
 element: textDivs[begin.divIdx],
 selectedLeft,
 pageIndex: pageIdx,
 matchIndex: selectedMatchIdx,
});
}
}
 if (prevEnd) {
 appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
}
}
 _updateMatches() {
 if (!this.enabled) {
 return;
}
const { findController, matches, pageIdx } = this;
const { textContentItemsStr, textDivs } = this;
 let clearedUntilDivIdx = -1;
 for (const match of matches) {
 const begin = Math.max(clearedUntilDivIdx, match.begin.divIdx);
 for (let n = begin, end = match.end.divIdx; n <= end; n++) {
const div = textDivs[n];
 div.textContent = textContentItemsStr[n];
 div.className = "";
}
 clearedUntilDivIdx = match.end.divIdx + 1;
}
 if (!findController?.highlightMatches) {
 return;
}
const pageMatches = findController.pageMatches[pageIdx] || null;
const pageMatchesLength =
 findController.pageMatchesLength[pageIdx] || null;
 this.matches = this._convertMatches(pageMatches, pageMatchesLength);
 this._renderMatches(this.matches);
}
}
 exports.TextHighlighter = TextHighlighter;
},
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
 exports.TextLayerBuilder = void 0;
var _pdfjsLib = __webpack_require__(5);
class TextLayerBuilder {
 constructor({
 textLayerDiv,
 eventBus,
 pageIndex,
 viewport,
 highlighter = null,
 accessibilityManager = null,
}) {
 this.textLayerDiv = textLayerDiv;
 this.eventBus = eventBus;
 this.textContent = null;
 this.textContentItemsStr = [];
 this.textContentStream = null;
 this.renderingDone = false;
 this.pageNumber = pageIndex + 1;
 this.viewport = viewport;
 this.textDivs = [];
 this.textLayerRenderTask = null;
 this.highlighter = highlighter;
 this.accessibilityManager = accessibilityManager;
 this.#bindMouse();
}
 #finishRendering() {
 this.renderingDone = true;
const endOfContent = document.createElement("div");
 endOfContent.className = "endOfContent";
 this.textLayerDiv.append(endOfContent);
 this.eventBus.dispatch("textlayerrendered", {
 source: this,
 pageNumber: this.pageNumber,
 numTextDivs: this.textDivs.length,});}
 render(timeout = 0) {
 if (
 !(this.textContent || this.textContentStream) ||
 this.renderingDone
 ) { return;}
 this.cancel();
 this.textDivs.length = 0;
 this.highlighter?.setTextMapping(
 this.textDivs,
 this.textContentItemsStr);
 this.accessibilityManager?.setTextMapping(this.textDivs);
const textLayerFrag = document.createDocumentFragment();
 this.textLayerRenderTask = (0, _pdfjsLib.renderTextLayer)({
 textContent: this.textContent,
 textContentStream: this.textContentStream,
 container: textLayerFrag,
 viewport: this.viewport,
 textDivs: this.textDivs,
 textContentItemsStr: this.textContentItemsStr,
 timeout,});
 this.textLayerRenderTask.promise.then(
 () => {
 this.textLayerDiv.append(textLayerFrag);
 this.#finishRendering();
 this.highlighter?.enable();
 this.accessibilityManager?.enable();},
 function (reason) { }
);}
 cancel() {
 if (this.textLayerRenderTask) {
 this.textLayerRenderTask.cancel();
 this.textLayerRenderTask = null;}
 this.highlighter?.disable();
 this.accessibilityManager?.disable();}
 setTextContentStream(readableStream) {
 this.cancel();
 this.textContentStream = readableStream;}
 setTextContent(textContent) {
 this.cancel();
 this.textContent = textContent;}
 #bindMouse() {
const div = this.textLayerDiv;
 div.addEventListener("mousedown", (evt) => {
 const end = div.querySelector(".endOfContent");
 if (!end) { return;}
 let adjustTop = evt.target !== div;
 adjustTop &&=
 getComputedStyle(end).getPropertyValue("-moz-user-select") !==
 "none";
 if (adjustTop) {
const divBounds = div.getBoundingClientRect();
const r = Math.max(0, (evt.pageY - divBounds.top) / divBounds.height);
 end.style.top = (r * 100).toFixed(2) + "%";}
 end.classList.add("active");});
 div.addEventListener("mouseup", () => {
 const end = div.querySelector(".endOfContent");
 if (!end) { return; }
 end.style.top = "";
 end.classList.remove("active");});}}
 exports.TextLayerBuilder = TextLayerBuilder; },
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,});
 exports.XfaLayerBuilder = void 0;
var _pdfjsLib = __webpack_require__(5);
class XfaLayerBuilder {
 constructor({ pageDiv, pdfPage, linkService, xfaHtml = null }) {
 this.pageDiv = pageDiv;
 this.pdfPage = pdfPage;
 this.linkService = linkService;
 this.xfaHtml = xfaHtml;
 this.div = null;
 this._cancelled = false;}
 render(viewport, intent = "display") {
 return this.pdfPage
 .getXfa()
 .then((xfaHtml) => {
 if (this._cancelled || !xfaHtml) {
 return {
 textDivs: [],};}
const parameters = {
 viewport: viewport.clone({
 dontFlip: true,}),
 div: this.div,
 xfaHtml,
 linkService: this.linkService,
 intent,};
 if (this.div) { return _pdfjsLib.XfaLayer.update(parameters); }
 this.div = document.createElement("div");
 this.pageDiv.append(this.div);
 parameters.div = this.div;
 return _pdfjsLib.XfaLayer.render(parameters);})
 .catch((error) => {
 console.error(error);});}
 cancel() {
 this._cancelled = true; }
 hide() {
 if (!this.div) {
 return;}
 this.div.hidden = true;}}
 exports.XfaLayerBuilder = XfaLayerBuilder;
},
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
}); },
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
 exports.Toolbar = void 0;
var _ui_utils = __webpack_require__(1);
const PAGE_NUMBER_LOADING_INDICATOR = "visiblePageIsLoading";
class Toolbar {
 constructor(options, eventBus) {
 this.toolbar = options.container;
 this.eventBus = eventBus;
 this.buttons = [{
 element: options.previous,
 eventName: "previouspage",},
 {
 element: options.next,
 eventName: "nextpage", },
 {
 element: options.zoomIn,
 eventName: "zoomin",},
 {
 element: options.zoomOut,
 eventName: "zoomout",
},];
 this.items = {
 numPages: options.numPages,
 pageNumber: options.pageNumber,
 scaleSelect: options.scaleSelect,
 customScaleOption: options.customScaleOption,
 previous: options.previous,
 next: options.next,
 zoomIn: options.zoomIn,
 zoomOut: options.zoomOut,};
 this.#bindListeners(options);
 this.reset();}
 setPageNumber(pageNumber, pageLabel) {
 this.pageNumber = pageNumber;
 this.pageLabel = pageLabel;
 this.#updateUIState(false);}
 setPagesCount(pagesCount, hasPageLabels) {
 this.pagesCount = pagesCount;
 this.hasPageLabels = hasPageLabels;
 this.#updateUIState(true);}
 setPageScale(pageScaleValue, pageScale) {
 this.pageScaleValue = (pageScaleValue || pageScale).toString();
 this.pageScale = pageScale;
 this.#updateUIState(false);}
 reset() {
 this.pageNumber = 0;
 this.pageLabel = null;
 this.hasPageLabels = false;
 this.pagesCount = 0;
 this.pageScaleValue = _ui_utils.DEFAULT_SCALE_VALUE;
 this.pageScale = _ui_utils.DEFAULT_SCALE;
 this.#updateUIState(true);
 this.updateLoadingIndicatorState();
 this.eventBus.dispatch("toolbarreset", {
 source: this,
});}
 #bindListeners(options) {
const { pageNumber, scaleSelect } = this.items;
const self = this;
 for (const { element, eventName, eventDetails } of this.buttons) {
 element.addEventListener("click", (evt) => {
 if (eventName !== null) {
 const details = {
 source: this,
};
 if (eventDetails) {
 for (const property in eventDetails) {
 details[property] = eventDetails[property];
}}
 this.eventBus.dispatch(eventName, details);
}});}
 pageNumber.addEventListener("click", function () {
 this.select();
});
 pageNumber.addEventListener("change", function () {
 self.eventBus.dispatch("pagenumberchanged", {
 source: self,
 value: this.value,
});
});
 scaleSelect.addEventListener("change", function () {
 if (this.value === "custom") {
 return;
}
 self.eventBus.dispatch("scalechanged", {
 source: self,
 value: this.value,
});
});
 scaleSelect.addEventListener("click", function (evt) {
 const target = evt.target;
 if (
 this.value === self.pageScaleValue &&
 target.tagName.toUpperCase() === "OPTION"
 ) {
 this.blur();
}
});
 scaleSelect.oncontextmenu = _ui_utils.noContextMenuHandler;
}
 #updateUIState(resetNumPages = false) {
const MIN_SCALE = 0.1;
const MAX_SCALE = 10;
const { pageNumber, pagesCount, pageScaleValue, pageScale, items } =
 this;
 if (resetNumPages) {
 if (this.hasPageLabels) {
 items.pageNumber.type = "text";
} else {
 items.pageNumber.type = "number";
 items.numPages.textContent = `of ${pagesCount}`;
}
 items.pageNumber.max = pagesCount;
}
 if (this.hasPageLabels) {
 items.pageNumber.value = this.pageLabel;
} else {
 items.pageNumber.value = pageNumber;
 items.numPages.textContent = `of ${pagesCount}`;
}
 items.previous.disabled = pageNumber <= 1;
 items.next.disabled = pageNumber >= pagesCount;
 items.zoomOut.disabled = pageScale <= MIN_SCALE;
 items.zoomIn.disabled = pageScale >= MAX_SCALE;
 let predefinedValueFound = false;
 for (const option of items.scaleSelect.options) {
 if (option.value !== pageScaleValue) {
 option.selected = false;
 continue;
}
 option.selected = true;
 predefinedValueFound = true;
}
 if (!predefinedValueFound) {
 items.customScaleOption.textContent = `${Math.round(
 pageScale * 100
 )}%`;
 items.customScaleOption.selected = true; }}
 updateLoadingIndicatorState(loading = false) {
const { pageNumber } = this.items;
 pageNumber.classList.toggle(PAGE_NUMBER_LOADING_INDICATOR, loading);}
async #adjustScaleWidth() {
const { items } = this;
const predefinedValuesPromise = Promise.all([
 "Automatic Zoom",
 "Actual Size",
 "Fit Page",
 "Fit Width", ]);
 await _ui_utils.animationStarted;
const style = getComputedStyle(items.scaleSelect);
const scaleSelectWidth = parseFloat(
 style.getPropertyValue("--scale-select-width") );
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d", {
 alpha: false, });
 ctx.font = `${style.fontSize} ${style.fontFamily}`;
 let maxWidth = 0;
 for (const predefinedValue of await predefinedValuesPromise) {
 const { width } = ctx.measureText(predefinedValue);
 if (width > maxWidth) {
 maxWidth = width; }}
 maxWidth += 0.3 * scaleSelectWidth;
 if (maxWidth > scaleSelectWidth) {
 _ui_utils.docStyle.setProperty(
 "--scale-select-width",
 `${maxWidth}px` );}
 canvas.width = 0;
 canvas.height = 0; }} 
exports.Toolbar = Toolbar;},
 (__unused_webpack_module, exports) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,});
 exports.ViewHistory = void 0;
const DEFAULT_VIEW_HISTORY_CACHE_SIZE = 20;
class ViewHistory {
 constructor(fingerprint, cacheSize = DEFAULT_VIEW_HISTORY_CACHE_SIZE) {
 this.fingerprint = fingerprint;
 this.cacheSize = cacheSize;
 this._initializedPromise = this._readFromStorage().then(
 (databaseStr) => {
const database = JSON.parse(databaseStr || "{}");
 let index = -1;
 if (!Array.isArray(database.files)) {
 database.files = [];} else {
 while (database.files.length >= this.cacheSize) {
 database.files.shift();}
 for (let i = 0, ii = database.files.length; i < ii; i++) {
const branch = database.files[i];
 if (branch.fingerprint === this.fingerprint) {
 index = i;
 break;}}}
 if (index === -1) {
 index =
 database.files.push({
 fingerprint: this.fingerprint,
}) - 1;}
 this.file = database.files[index];
 this.database = database;
});}
async _writeToStorage() {
const databaseStr = JSON.stringify(this.database);
 localStorage.setItem("pdfjs.history", databaseStr);
}
async _readFromStorage() {
 return localStorage.getItem("pdfjs.history");
}
async set(name, val) {
 await this._initializedPromise;
 this.file[name] = val;
 return this._writeToStorage();
}
async setMultiple(properties) {
 await this._initializedPromise;
 for (const name in properties) {
 this.file[name] = properties[name];
}
 return this._writeToStorage();
}
async get(name, defaultValue) {
 await this._initializedPromise;
const val = this.file[name];
 return val !== undefined ? val : defaultValue;
}
async getMultiple(properties) {
 await this._initializedPromise;
const values = Object.create(null);
 for (const name in properties) {
 const val = this.file[name];
 values[name] = val !== undefined ? val : properties[name];
}
return values;}}
 exports.ViewHistory = ViewHistory;},
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true, });
 exports.GenericCom = void 0;
var _app = __webpack_require__(4);
var _preferences = __webpack_require__(42);
var _generic_scripting = __webpack_require__(46);
const GenericCom = {};
 exports.GenericCom = GenericCom;
class GenericPreferences extends _preferences.BasePreferences {
async _writeToStorage(prefObj) {
 localStorage.setItem("pdfjs.preferences", JSON.stringify(prefObj));}
async _readFromStorage(prefObj) {
 return JSON.parse(localStorage.getItem("pdfjs.preferences"));}}
class GenericExternalServices extends _app.DefaultExternalServices {
static createPreferences() {
 return new GenericPreferences();}
static createScripting({ sandboxBundleSrc }) {
 return new _generic_scripting.GenericScripting(sandboxBundleSrc);}}
 _app.PDFViewerApplication.externalServices = GenericExternalServices;
}, 
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
 exports.BasePreferences = void 0;
class BasePreferences {
 #defaults = Object.freeze({
 defaultZoomValue: "",
 disablePageLabels: false,
 enablePermissions: false,
 enableScripting: true,
 externalLinkTarget: 0,
 historyUpdateUrl: false,
 ignoreDestinationZoom: false,
 forcePageColors: false,
 pageColorsBackground: "Canvas",
 pageColorsForeground: "CanvasText",
 pdfBugEnabled: false,
 scrollModeOnLoad: -1,
 spreadModeOnLoad: -1,
 textLayerMode: 1,
 useOnlyCssZoom: false,
 viewerCssTheme: 2,
 viewOnLoad: 0,
 disableAutoFetch: false,
 disableFontFace: false,
 disableRange: false,
 disableStream: false,
 enableXfa: true,
 renderer: "canvas",
});
 #prefs = Object.create(null);
 #initializedPromise = null;
 constructor() {
 if (this.constructor === BasePreferences) {
 throw new Error("Cannot initialize BasePreferences.");
}
 this.#initializedPromise = this._readFromStorage(this.#defaults).then(
 (prefs) => {
 for (const name in this.#defaults) {
 const prefValue = prefs?.[name];
 if (typeof prefValue === typeof this.#defaults[name]) {
 this.#prefs[name] = prefValue;
}}});}
async _writeToStorage(prefObj) {
 throw new Error("Not implemented: _writeToStorage");
}
async _readFromStorage(prefObj) {
 throw new Error("Not implemented: _readFromStorage");
}
async reset() {
 await this.#initializedPromise;
const prefs = this.#prefs;
 this.#prefs = Object.create(null);
 return this._writeToStorage(this.#defaults).catch((reason) => {
 this.#prefs = prefs;
 throw reason;
});
}
async set(name, value) {
 await this.#initializedPromise;
const defaultValue = this.#defaults[name],
 prefs = this.#prefs;
 if (defaultValue === undefined) {
 throw new Error(`Set preference: "${name}" is undefined.`);
} else if (value === undefined) { throw new Error("Set preference: no value is specified.");}
const valueType = typeof value,
 defaultType = typeof defaultValue;
 if (valueType !== defaultType) {
 if (valueType === "number" && defaultType === "string") {
 value = value.toString();
} else {
 throw new Error(
 `Set preference: "${value}" is a ${valueType}, expected a ${defaultType}.`
);}} else {
 if (valueType === "number" && !Number.isInteger(value)) {
 throw new Error(`Set preference: "${value}" must be an integer.`);
}}
 this.#prefs[name] = value;
 return this._writeToStorage(this.#prefs).catch((reason) => {
 this.#prefs = prefs;
 throw reason;
});
}
async get(name) {
 await this.#initializedPromise;
const defaultValue = this.#defaults[name];
 if (defaultValue === undefined) {
 throw new Error(`Get preference: "${name}" is undefined.`);
}
 return this.#prefs[name] ?? defaultValue;
}
async getAll() {
 await this.#initializedPromise;
const obj = Object.create(null);
 for (const name in this.#defaults) {
 obj[name] = this.#prefs[name] ?? this.#defaults[name];
}
 return obj;
}
}
 exports.BasePreferences = BasePreferences;
},
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
var _pdfjsLib = __webpack_require__(5);
},
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
 __webpack_require__(45);
},
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
 exports.GenericScripting = void 0;
 exports.docPropertiesLookup = docPropertiesLookup;
var _pdfjsLib = __webpack_require__(5);
 async function docPropertiesLookup(pdfDocument) {
 const url = "",
 baseUrl = url.split("#")[0];
 let { info, metadata, contentDispositionFilename, contentLength } =
 await pdfDocument.getMetadata();
 if (!contentLength) {
const { length } = await pdfDocument.getDownloadInfo();
 contentLength = length;
}
 return {
 ...info,
 baseURL: baseUrl,
 filesize: contentLength,
 filename:
 contentDispositionFilename ||
 (0, _pdfjsLib.getPdfFilenameFromUrl)(url),
 metadata: metadata?.getRaw(),
 authors: metadata?.get("dc:creator"),
 numPages: pdfDocument.numPages,
 URL: url,
};
}
class GenericScripting {
 constructor(sandboxBundleSrc) {
 this._ready = (0, _pdfjsLib.loadScript)(sandboxBundleSrc, true).then(
 () => {
 return window.pdfjsSandbox.QuickJSSandbox();
}
);
}
async createSandbox(data) {
const sandbox = await this._ready;
 sandbox.create(data);
}
async dispatchEventInSandbox(event) {
const sandbox = await this._ready;
 setTimeout(() => sandbox.dispatchEvent(event), 0);
}
async destroySandbox() {
const sandbox = await this._ready;
 sandbox.nukeSandbox();
}
}
 exports.GenericScripting = GenericScripting;
},
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
});
},
 (__unused_webpack_module, exports, __webpack_require__) => {
 Object.defineProperty(exports, "__esModule", {
 value: true,
}); 
}, 
 ];
 var __webpack_module_cache__ = {};
 function __webpack_require__(moduleId) { 
var cachedModule = __webpack_module_cache__[moduleId];
 if (cachedModule !== undefined) {
 return cachedModule.exports;
}
var module = (__webpack_module_cache__[moduleId] = {
 exports: {},
});
 __webpack_modules__[moduleId](
 module,
 module.exports,
 __webpack_require__
);
 return module.exports; 
}
 var __webpack_exports__ = {};
 (() => {
 var exports = __webpack_exports__;

 Object.defineProperty(exports, "__esModule", {
 value: true,
});
 Object.defineProperty(exports, "PDFViewerApplication", {
 enumerable: true,
 get: function () {
 return _app.PDFViewerApplication;
},
});
 exports.PDFViewerApplicationConstants = void 0;
 Object.defineProperty(exports, "PDFViewerApplicationOptions", {
 enumerable: true,
 get: function () {
 return _app_options.AppOptions;
},
});
 var _ui_utils = __webpack_require__(1);
 var _app_options = __webpack_require__(2);
 var _pdf_link_service = __webpack_require__(3);
 var _app = __webpack_require__(4);
const AppConstants = {
 LinkTarget: _pdf_link_service.LinkTarget,
 RenderingStates: _ui_utils.RenderingStates,
 ScrollMode: _ui_utils.ScrollMode,
 SpreadMode: _ui_utils.SpreadMode,
};
 exports.PDFViewerApplicationConstants = AppConstants;
 window.PDFViewerApplication = _app.PDFViewerApplication;
 window.PDFViewerApplicationConstants = AppConstants;
 window.PDFViewerApplicationOptions = _app_options.AppOptions;
 {
 __webpack_require__(41);
}
 {
 __webpack_require__(47);
}
 function getViewerConfiguration() {
 return {
 appContainer: document.body,
 mainContainer: document.getElementById("viewerContainer"),
 viewerContainer: document.getElementById("viewer"),
 toolbar: {
 container: document.getElementById("toolbarViewer"),
 numPages: document.getElementById("numPages"),
 pageNumber: document.getElementById("pageNumber"),
 scaleSelect: document.getElementById("scaleSelect"),
 customScaleOption: document.getElementById("customScaleOption"),
 previous: document.getElementById("previous"),
 next: document.getElementById("next"),
 zoomIn: document.getElementById("zoomIn"),
 zoomOut: document.getElementById("zoomOut"),
},
 debuggerScriptPath: "./debugger.js",
};
}
 function webViewerLoad() {
const config = getViewerConfiguration();
const event = document.createEvent("CustomEvent");
 event.initCustomEvent("webviewerloaded", true, true, {
 source: window,
});
 try {
 parent.document.dispatchEvent(event);
} catch (ex) {
 console.error(`webviewerloaded: ${ex}`);
 document.dispatchEvent(event);
}
 _app.PDFViewerApplication.run(config);
}
 document.blockUnblockOnload?.(true);
 if (
 document.readyState === "interactive" ||
 document.readyState === "complete"
 ) {
 webViewerLoad();
} else {
 document.addEventListener("DOMContentLoaded", webViewerLoad, true);
}
})();
});